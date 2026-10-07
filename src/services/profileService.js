import { supabase } from '../lib/supabase';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const COOLDOWN_DAYS = 30;

/**
 * Cuentas de desarrollador y pruebas de Killian con bypass de cooldown
 */
export const ADMIN_TEST_EMAILS = [
  'r3habhdyt@gmail.com',
  'killian.carfox@gmail.com',
  'killiantorrell@gmail.com'
];

/**
 * Comprueba si un correo pertenece a una cuenta de pruebas o admin
 */
export function isDeveloperOrAdminEmail(email) {
  if (!email) return false;
  return ADMIN_TEST_EMAILS.includes(email.toLowerCase().trim());
}

/**
 * Validates username format
 */
export function validateUsernameFormat(username) {
  if (!username) return { valid: false, error: 'profileUsernameInvalid' };
  const clean = username.trim();
  if (!USERNAME_REGEX.test(clean)) {
    return { valid: false, error: 'profileUsernameInvalid' };
  }
  return { valid: true, cleanUsername: clean };
}

/**
 * Calculates if username change is allowed (30-day cooldown).
 * Bypass if user is one of Killian's developer/test accounts.
 */
export function checkUsernameCooldown(usernameChangedAt, userEmail = null) {
  // Bypass total para las cuentas de pruebas de Killian
  if (isDeveloperOrAdminEmail(userEmail)) {
    return { allowed: true, daysRemaining: 0, nextAvailableDate: null, isAdmin: true };
  }

  if (!usernameChangedAt) {
    return { allowed: true, daysRemaining: 0, nextAvailableDate: null, isAdmin: false };
  }

  const lastChanged = new Date(usernameChangedAt).getTime();
  const now = Date.now();
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  const cooldownEnd = lastChanged + cooldownMs;

  if (now < cooldownEnd) {
    const daysRemaining = Math.ceil((cooldownEnd - now) / (1000 * 60 * 60 * 24));
    return {
      allowed: false,
      daysRemaining,
      nextAvailableDate: new Date(cooldownEnd),
      isAdmin: false
    };
  }

  return { allowed: true, daysRemaining: 0, nextAvailableDate: null, isAdmin: false };
}

/**
 * Checks if username is taken in Supabase profiles
 */
export async function checkUsernameAvailability(username, currentUserId) {
  const validation = validateUsernameFormat(username);
  if (!validation.valid) {
    return { available: false, valid: false, error: validation.error };
  }

  if (!supabase) return { available: true, valid: true };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', validation.cleanUsername)
      .neq('id', currentUserId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.warn('Error checking username in profiles:', error);
      return { available: true, valid: true };
    }

    return {
      available: !data,
      valid: true,
      cleanUsername: validation.cleanUsername
    };
  } catch (err) {
    console.error('Check username error:', err);
    return { available: true, valid: true };
  }
}

/**
 * Fetches user profile from profiles table, falls back to auth user metadata
 */
export async function getUserProfile(user) {
  if (!user) return null;

  const defaultProfile = {
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username || user.email?.split('@')[0] || 'pirata',
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
    pirate_title: user.user_metadata?.pirate_title || 'Novato del East Blue',
    bio: user.user_metadata?.bio || '',
    newsletter_opt_in: user.user_metadata?.newsletter_opt_in ?? false,
    username_changed_at: user.user_metadata?.username_changed_at || null,
  };

  if (!supabase) return defaultProfile;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error || !data) {
      return defaultProfile;
    }

    return {
      ...defaultProfile,
      ...data,
      email: user.email,
    };
  } catch (err) {
    console.error('Error fetching profile:', err);
    return defaultProfile;
  }
}

/**
 * Resizes and crops an image file to a 300x300 canvas and returns an optimized WebP/JPEG dataURL
 */
export function processAvatarImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return reject(new Error('Formato no válido. Solo se admiten archivos PNG, JPG o WebP.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Error al decodificar la imagen'));
      img.onload = () => {
        const TARGET_SIZE = 300;
        const canvas = document.createElement('canvas');
        canvas.width = TARGET_SIZE;
        canvas.height = TARGET_SIZE;
        const ctx = canvas.getContext('2d');

        // Center crop calculation
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, TARGET_SIZE, TARGET_SIZE);

        // Try WebP first (smaller file size), fallback to JPEG
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL('image/webp', 0.85);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        }

        resolve({
          dataUrl,
          width: TARGET_SIZE,
          height: TARGET_SIZE,
          sizeKb: Math.round((dataUrl.length * 3) / 4 / 1024)
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Saves profile changes to Supabase profiles table and user metadata
 */
export async function saveUserProfile(user, currentProfile, updates) {
  if (!user) throw new Error('Usuario no autenticado');

  let newUsernameChangedAt = currentProfile?.username_changed_at || null;

  // Check username cooldown if username changed
  if (updates.username && updates.username !== currentProfile?.username) {
    const cooldown = checkUsernameCooldown(currentProfile?.username_changed_at, user.email);
    if (!cooldown.allowed) {
      throw new Error(`Solo puedes cambiar tu nombre cada 30 días. Próximo cambio disponible: ${cooldown.nextAvailableDate?.toLocaleDateString()}`);
    }

    const availability = await checkUsernameAvailability(updates.username, user.id);
    if (!availability.available) {
      throw new Error('Ese nombre de usuario ya está registrado por otro coleccionista.');
    }

    newUsernameChangedAt = new Date().toISOString();
  }

  const profilePayload = {
    id: user.id,
    username: updates.username?.trim() || currentProfile.username,
    full_name: updates.full_name?.trim() ?? currentProfile.full_name,
    avatar_url: updates.avatar_url ?? currentProfile.avatar_url,
    pirate_title: updates.pirate_title ?? currentProfile.pirate_title,
    bio: updates.bio?.trim() ?? currentProfile.bio,
    newsletter_opt_in: updates.newsletter_opt_in ?? currentProfile.newsletter_opt_in,
    username_changed_at: newUsernameChangedAt,
    updated_at: new Date().toISOString()
  };

  // 1. Update in profiles table if Supabase is active
  if (supabase) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(profilePayload);

      if (error) {
        console.warn('Upsert to profiles table notice:', error.message);
      }
    } catch (e) {
      console.warn('Profiles table upsert exception:', e);
    }

    // 2. Update user metadata in Supabase Auth
    try {
      await supabase.auth.updateUser({
        data: {
          username: profilePayload.username,
          full_name: profilePayload.full_name,
          avatar_url: profilePayload.avatar_url,
          pirate_title: profilePayload.pirate_title,
          bio: profilePayload.bio,
          newsletter_opt_in: profilePayload.newsletter_opt_in,
          username_changed_at: profilePayload.username_changed_at,
        }
      });
    } catch (authErr) {
      console.error('Error updating auth metadata:', authErr);
    }
  }

  return profilePayload;
}

/**
 * Updates user password
 */
export async function changeUserPassword(newPassword) {
  if (!supabase) throw new Error('Supabase no está configurado');
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
}

import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { signIn, signUp, signInWithOAuth, isConfigured } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'apple' | null

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'register' && password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        onClose();
      } else {
        const data = await signUp(email, password);
        if (data?.user?.identities?.length === 0) {
          setErrorMsg('Ya existe una cuenta con este correo.');
        } else {
          setSuccessMsg('¡Cuenta creada con éxito! Si tienes confirmación por correo activada en Supabase, revisa tu bandeja.');
          setTimeout(() => {
            if (data?.session) {
              onClose();
            }
          }, 1800);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuth = async (provider) => {
    setErrorMsg('');
    setOauthLoading(provider);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      setErrorMsg(
        err.message ||
        'Para usar Google, debes activar el proveedor en el panel de Supabase (Authentication -> Providers).'
      );
      setOauthLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[420px] text-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-xl shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center p-2">
              <img
                src="/one-piece-logo-white.webp"
                alt="Grand Line Vault Logo"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Sign in to Grand Line Vault' : 'Create your Account'}
          </h2>
        </div>

        {/* Form Card (GitHub inspired dark aesthetic) */}
        <div className="bg-[#121318] border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl">
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-2">
                Username or email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nakama@grandline.com"
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-neutral-700/80 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-neutral-200">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Para restablecer tu contraseña, contacta con soporte o utiliza el enlace de recuperación de Supabase.')}
                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-neutral-700/80 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Confirm Password (Register mode only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-neutral-700/80 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Connecting...</span>
              ) : mode === 'login' ? (
                'Sign in'
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#121318] px-3 text-neutral-400 font-medium">or</span>
            </div>
          </div>

          {/* Social OAuth Button (Google) */}
          <div className="space-y-2.5">
            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={oauthLoading !== null}
              className="w-full py-2.5 px-4 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-neutral-100 font-semibold text-sm flex items-center justify-center gap-3 border border-neutral-700/60 transition cursor-pointer disabled:opacity-50"
            >
              {/* Google colored G icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{oauthLoading === 'google' ? 'Redirecting to Google...' : 'Continue with Google'}</span>
            </button>
          </div>
        </div>

        {/* Footer switch: Login <-> Register */}
        <div className="mt-4 p-4 rounded-2xl bg-[#121318] border border-neutral-800 text-center text-xs">
          {mode === 'login' ? (
            <p className="text-neutral-400">
              New to Grand Line Vault?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition cursor-pointer"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-neutral-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

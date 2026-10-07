import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { signIn, signUp, isConfigured } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
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
          setSuccessMsg('¡Cuenta creada con éxito! Si tienes confirmación de email activada en Supabase, revisa tu bandeja de entrada.');
          setTimeout(() => {
            if (data?.session) {
              onClose();
            }
          }, 2000);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error al autenticar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-neutral-200 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Supabase Cloud Auth
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {mode === 'login' ? 'Bienvenido a Bordo' : 'Crear tu Cuenta'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Guarda tu colección de One Piece TCG en la nube y sincronízala entre tu PC y móvil.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'login'
                ? 'bg-neutral-800 text-amber-400 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'register'
                ? 'bg-neutral-800 text-amber-400 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@ejemplo.com"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Conectando con Supabase...</span>
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Entrar a mi Bóveda</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Crear Cuenta Gratis</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500">
          Tus datos se almacenan cifrados con seguridad PostgreSQL RLS en Supabase.
        </div>
      </div>
    </div>
  );
}

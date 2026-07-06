"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message === 'Invalid login credentials' 
        ? 'Credenciais inválidas. Verifique seu e-mail e senha.' 
        : authError.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold text-xl tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-4">
            M
          </div>
          <h2 className="text-2xl font-medium text-white tracking-tight">Portal do Cliente</h2>
          <p className="text-xs text-slate-400 font-light mt-2">// Acesse com as credenciais enviadas por e-mail</p>
        </div>

        {/* Card Box */}
        <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">E-mail Corporativo</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-[#0B0F19]/60 border border-white/5 focus:border-blue-500/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition duration-200"
                />
                <Mail size={14} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Senha de Acesso</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0B0F19]/60 border border-white/5 focus:border-blue-500/30 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition duration-200"
                />
                <Lock size={14} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 focus:outline-none cursor-pointer p-0.5 transition"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 rounded-xl text-xs font-semibold tracking-wider transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-blue-500/20 border-t-blue-300 rounded-full animate-spin"></div>
              ) : (
                'ENTRAR NO PORTAL'
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6">
          <p className="text-[10px] text-slate-500 font-mono">
            MAGE © {new Date().getFullYear()} • Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

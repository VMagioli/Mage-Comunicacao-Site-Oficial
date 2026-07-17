"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { ShieldAlert, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { completarPrimeiroAcessoAction } from './actions';

export default function PrimeiroAcessoPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('A nova senha deve possuir no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      // 1. Update user password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: password
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // 2. Update precisa_mudar_senha flag to false in client database profile via Server Action
      const result = await completarPrimeiroAcessoAction();

      if (!result.success) {
        setError(result.error || 'Erro ao salvar status no banco de dados, mas a senha foi atualizada. Contate o suporte.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.refresh();
        router.push('/portal');
      }, 2000);

    } catch (err: any) {
      setError('Ocorreu um erro inesperado durante a redefinição de senha.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 animate-pulse">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-medium text-white tracking-tight">Primeiro Acesso</h2>
          <p className="text-xs text-slate-400 font-light mt-2">// Por segurança, você deve redefinir sua senha temporária.</p>
        </div>

        <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300">
          {success ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 animate-bounce">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-medium text-white">Senha alterada com sucesso!</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Você será redirecionado para o dashboard em instantes...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2.5">
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Nova Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="No mínimo 8 caracteres"
                    required
                    className="w-full bg-[#0B0F19]/60 border border-white/5 focus:border-blue-500/30 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition duration-200"
                  />
                  <Lock size={14} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 focus:outline-none cursor-pointer p-0.5"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Confirmar Nova Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    required
                    className="w-full bg-[#0B0F19]/60 border border-white/5 focus:border-blue-500/30 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition duration-200"
                  />
                  <Lock size={14} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  'ATUALIZAR SENHA'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

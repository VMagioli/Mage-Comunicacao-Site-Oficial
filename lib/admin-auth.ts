const ADMIN_EMAILS = [
  'vitor@magecomunicacao.com.br',
  'lana@magecomunicacao.com.br',
  'magioli@magecomunicacao.com.br',
] as const;

export function verificarSeEhAdmin(email?: string | null): boolean {
  if (!email) return false;

  const emailNormalizado = email.trim().toLowerCase();

  return ADMIN_EMAILS.some(
    (emailAdmin) => emailAdmin === emailNormalizado
  );
}
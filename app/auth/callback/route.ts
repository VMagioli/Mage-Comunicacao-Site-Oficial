import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as any

  if (token_hash && type) {
    // A mágica do Next.js 15 acontece aqui: o 'await' antes do cookies()
    const cookieStore = await cookies()
    
    // Inicia o cliente do Supabase com o novo padrão getAll e setAll
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignorar erros se for chamado de um Server Component
            }
          },
        },
      }
    )

    // Troca o token seguro por uma sessão logada
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Sucesso! Manda o cliente para o painel
      return NextResponse.redirect(`${origin}/portal`)
    }
  }

  // Se der erro, volta para o login
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
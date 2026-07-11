import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as any

  if (token_hash && type) {
    const cookieStore = await cookies()
    
    // Inicia o cliente do Supabase no lado do Servidor
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
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

  // Se o token for inválido, expirado ou a URL estiver errada, volta para o login
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
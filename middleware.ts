import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create the Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isMockSession = request.cookies.get('mage_mock_session')?.value === 'true';

  const url = request.nextUrl.clone();
  const isPortalRoute = url.pathname.startsWith('/portal');
  const isLoginRoute = url.pathname.startsWith('/login');

  if (isPortalRoute) {
    if (!user && !isMockSession) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (user) {
      // Usar a service role key no middleware para evitar erros de RLS e permissões de tabelas
      const supabaseAdmin = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
          },
        }
      );

      const { data: profile, error: profileError } = await supabaseAdmin
        .from('clientes')
        .select('precisa_mudar_senha')
        .eq('id', user.id)
        .single();

      console.log("🕵️ MIDDLEWARE DEBUG - Profile:", profile, "Error:", profileError?.message);

      const isFirstAccessRoute = url.pathname === '/portal/primeiro-acesso';

      if (profile?.precisa_mudar_senha === true) {
        if (!isFirstAccessRoute) {
          url.pathname = '/portal/primeiro-acesso';
          return NextResponse.redirect(url);
        }
      } else if (profile?.precisa_mudar_senha === false) {
        if (isFirstAccessRoute) {
          url.pathname = '/portal';
          return NextResponse.redirect(url);
        }
      }
    } else {
      if (url.pathname === '/portal/primeiro-acesso') {
        url.pathname = '/portal';
        return NextResponse.redirect(url);
      }
    }
  }

  if (isLoginRoute && (user || isMockSession)) {
    const nextPath = url.searchParams.get('next') || '/portal';
    url.pathname = nextPath;
    url.search = ''; // Limpar parâmetros de busca para evitar loops
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/portal/:path*', '/login'],
};

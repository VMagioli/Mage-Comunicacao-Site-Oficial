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

  const { data: { session } } = await supabase.auth.getSession();
  const isMockSession = request.cookies.get('mage_mock_session')?.value === 'true';

  const url = request.nextUrl.clone();
  const isPortalRoute = url.pathname.startsWith('/portal');
  const isLoginRoute = url.pathname.startsWith('/login');

  if (isPortalRoute) {
    if (!session && !isMockSession) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (session) {
      // Check if the user needs to change their password
      const { data: profile } = await supabase
        .from('clientes')
        .select('precisa_mudar_senha')
        .eq('id', session.user.id)
        .single();

      const isFirstAccessRoute = url.pathname === '/portal/primeiro-acesso';

      if (profile?.precisa_mudar_senha) {
        if (!isFirstAccessRoute) {
          url.pathname = '/portal/primeiro-acesso';
          return NextResponse.redirect(url);
        }
      } else {
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

  if (isLoginRoute && (session || isMockSession)) {
    url.pathname = '/portal';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/portal/:path*', '/login'],
};

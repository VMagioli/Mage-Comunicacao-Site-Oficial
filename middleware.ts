import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { verificarSeEhAdmin } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = request.nextUrl.clone();

  // Portal do cliente mantido apenas em código para desenvolvimento futuro — bloqueado nas rotas ativas
  if (url.pathname.startsWith('/portal')) {
    url.pathname = '/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (url.pathname.startsWith('/login') && user && verificarSeEhAdmin(user.email)) {
    const nextPath = url.searchParams.get('next') || '/admin';
    url.pathname = nextPath.startsWith('/admin') ? nextPath : '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/portal/:path*', '/login'],
};

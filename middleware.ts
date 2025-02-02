import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;

      if(!token) return false;
      if (path.startsWith("/admin")) {
        return token?.role === "Manager";
      }
      if (path.startsWith("/api/admin")) {
        return token?.role === "Manager";
      }
      if (path.startsWith("/menu")) {
        return token?.role === "Koki";
      }


      return token != null;
  }}
})

// Define paths for which the middleware will run
export const config = {
  matcher: [
    '/api/admin/(.*)',
    '/admin/(.*)',
    '/admin',
    '/menu/(.*)',
    '/menu',
    '/pesanan',
    '/pesanan/(.*)',
    '/bahan_baku',
    '/bahan_baku/(.*)',
    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token) return false;
      const role = (token.role as string || '').toUpperCase();
      return role === 'ADMIN' || role === 'EDITOR';
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};

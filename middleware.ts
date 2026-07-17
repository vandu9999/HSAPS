import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Require any authenticated user for admin access
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};

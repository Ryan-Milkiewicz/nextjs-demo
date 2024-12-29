import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log(isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        console.log("redirecting unauthenticated user");
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log('');
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
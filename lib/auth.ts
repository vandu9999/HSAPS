import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập email và mật khẩu');
        }

        if (!process.env.DATABASE_URL) {
          if (credentials.email === 'admin@hsaps.org.vn' && credentials.password === 'admin123') {
            return {
              id: 'admin-id',
              email: 'admin@hsaps.org.vn',
              name: 'HSAPS Admin',
              role: 'ADMIN',
            };
          }
          throw new Error('Email hoặc mật khẩu không chính xác (Chế độ mô phỏng)');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('Email hoặc mật khẩu không chính xác');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error('Email hoặc mật khẩu không chính xác');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          throw new Error('Không thể kết nối cơ sở dữ liệu xác thực');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_client_secret',
    }),
    // Custom Zalo OAuth Provider configuration
    {
      id: 'zalo',
      name: 'Zalo',
      type: 'oauth',
      authorization: {
        url: 'https://oauth.zaloapp.com/v3/auth',
        params: { scope: 'gems' }
      },
      token: 'https://oauth.zaloapp.com/v3/access_token',
      userinfo: 'https://graph.zalo.me/v2.0/me',
      clientId: process.env.ZALO_CLIENT_ID || 'mock_zalo_client_id',
      clientSecret: process.env.ZALO_CLIENT_SECRET || 'mock_zalo_client_secret',
      profile(profile: any) {
        return {
          id: profile.id || profile.error_code,
          name: profile.name || 'Người dùng Zalo',
          email: profile.email || `${profile.id || 'user'}@zalo.me`,
          image: profile.picture?.data?.url || '',
        };
      },
    } as any
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'GUEST';
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'hsaps-super-secret-key-3000',
};

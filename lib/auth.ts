import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Hỗ trợ cả tên biến cũ (PUBLISHABLE_KEY) và chuẩn Supabase (ANON_KEY)
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Service role key dùng cho server-side (an toàn hơn, bỏ qua RLS)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  (supabaseServiceKey || supabaseAnonKey)
);

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

        // 1. Xác thực qua Supabase Auth (ưu tiên service role key cho server-side)
        if (isSupabaseConfigured) {
          try {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            // Dùng service role key nếu có (server-side, bỏ qua RLS)
            // Nếu không có, dùng anon key (cần Email Auth bật trong Supabase dashboard)
            const supabaseKey = (supabaseServiceKey || supabaseAnonKey)!;

            const supabase = createClient(supabaseUrl, supabaseKey, {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
              }
            });

            // Đăng nhập bằng email/password qua Supabase Auth
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email: credentials.email,
              password: credentials.password,
            });

            if (signInError) {
              console.error('❌ Supabase signInWithPassword error:', signInError.message);
              // Trả về thông báo thân thiện thay vì lộ lỗi nội bộ
              throw new Error('Email hoặc mật khẩu không chính xác');
            }

            const authUserId = signInData.user?.id;
            if (!authUserId) {
              throw new Error('Không nhận được mã định danh từ Supabase Auth');
            }

            // Lấy role và thông tin profile từ bảng User trong public schema
            let role = 'GUEST';
            let name = signInData.user.user_metadata?.name || credentials.email.split('@')[0];

            if (process.env.DATABASE_URL) {
              try {
                const userProfile = await prisma.user.findUnique({
                  where: { id: authUserId },
                });

                if (userProfile) {
                  role = userProfile.role;
                  name = userProfile.name || name;
                }
              } catch (dbError) {
                console.error('⚠️ Không thể lấy profile từ DB, dùng dữ liệu Supabase:', dbError);
              }
            }

            if (credentials.email.toLowerCase() === 'admin@hsaps.org.vn') {
              role = 'admin';
            }

            return {
              id: authUserId,
              email: signInData.user.email,
              name: name,
              role: role,
            };
          } catch (error: any) {
            console.error('❌ Supabase Auth authorize error:', error);
            throw new Error(error.message || 'Email hoặc mật khẩu không chính xác');
          }
        }

        // 2. Fallback: Nếu Supabase chưa cấu hình và không có DATABASE_URL
        if (!process.env.DATABASE_URL) {
          throw new Error('Hệ thống xác thực chưa được cấu hình. Vui lòng liên hệ quản trị viên.');
        }

        // 3. Local DB password verification using bcrypt (fallback)
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

          if (user.email.toLowerCase() === 'admin@hsaps.org.vn') {
            user.role = 'admin';
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          console.error('NextAuth authorize error:', error);
          throw new Error(error.message || 'Không thể kết nối cơ sở dữ liệu xác thực');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_client_secret',
    }),
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
    maxAge: 30 * 24 * 60 * 60,
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

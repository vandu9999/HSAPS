'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

export async function registerUser(data: {
  // Account details
  name: string;
  email: string;
  phone: string;
  role: string; // 'hoi-vien' | 'doi-tac' | 'khach'
  password: string;

  // Member Doctor details (optional)
  title?: string;
  cchn?: string;
  clinic?: string;
  clinicAddress?: string;
  specialties?: string[];
  experience?: string;
  signature?: string; // Base64 signature
  paymentReceipt?: string; // Uploaded receipt URL
}) {
  if (!data.email || !data.password || !data.name) {
    return { success: false, error: 'Thiếu thông tin đăng ký bắt buộc' };
  }

  const isSupabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  // 1. If Supabase Auth is configured, register via Supabase Auth
  if (isSupabaseConfigured) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      });

      // Register the user credentials in Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
          }
        }
      });

      if (signUpError) {
        return { success: false, error: `Lỗi Supabase Auth: ${signUpError.message}` };
      }

      const authUserId = signUpData.user?.id;
      if (!authUserId) {
        return { success: false, error: 'Không nhận được mã định danh từ Supabase Auth' };
      }

      // If Database is set, also create the profiles in public schema linked to Supabase Auth UUID
      if (process.env.DATABASE_URL) {
        // Create User record in public schema using the Supabase Auth UUID
        const userRole = data.role === 'hoi-vien' ? 'editor' : 'guest';
        await prisma.user.create({
          data: {
            id: authUserId, // Match Supabase Auth UUID
            email: data.email,
            name: data.name,
            password: 'SUPABASE_MANAGED_PASSWORD', // Managed securely by Supabase Auth
            role: userRole,
          },
        });

        // If role is doctor (Hội viên), create Doctor record
        if (data.role === 'hoi-vien') {
          const bioList = [
            `Hội viên đăng ký mới năm ${new Date().getFullYear()}.`,
          ];
          if (data.signature) {
            bioList.push(`[SIGNATURE]:${data.signature}`);
          }
          if (data.paymentReceipt) {
            bioList.push(`[RECEIPT]:${data.paymentReceipt}`);
          }

          await prisma.doctor.create({
            data: {
              id: authUserId, // Match Supabase Auth UUID for relational integrity
              name: data.name,
              title: data.title || 'BS',
              avatar: data.paymentReceipt || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
              cchn: data.cchn || '',
              clinic: data.clinic || '',
              address: data.clinicAddress || '',
              specialty: data.specialties || [],
              education: ['Hồ sơ đăng ký tự động trực tuyến'],
              experience: data.experience || 'Chưa cập nhật',
              email: data.email,
              phone: data.phone,
              isOfficial: false,
              joinedYear: new Date().getFullYear(),
              biography: bioList,
            },
          });
        }
      }

      return { success: true, userId: authUserId };
    } catch (error: any) {
      console.error('❌ Failed to register user with Supabase Auth:', error);
      return { success: false, error: error.message || 'Lỗi hệ thống khi đăng ký' };
    }
  }

  // 2. Fallback: Local database credentials simulation
  if (!process.env.DATABASE_URL) {
    console.log('ℹ️ DATABASE_URL not set. Simulating registration:');
    console.log(`- User: ${data.name} (${data.email}), Role: ${data.role}`);
    return { success: true };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: 'Địa chỉ email này đã được sử dụng' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userRole = data.role === 'hoi-vien' ? 'editor' : 'guest';
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: userRole,
      },
    });

    if (data.role === 'hoi-vien') {
      const bioList = [
        `Hội viên đăng ký mới năm ${new Date().getFullYear()}.`,
      ];
      if (data.signature) {
        bioList.push(`[SIGNATURE]:${data.signature}`);
      }
      if (data.paymentReceipt) {
        bioList.push(`[RECEIPT]:${data.paymentReceipt}`);
      }

      await prisma.doctor.create({
        data: {
          name: data.name,
          title: data.title || 'BS',
          avatar: data.paymentReceipt || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
          cchn: data.cchn || '',
          clinic: data.clinic || '',
          address: data.clinicAddress || '',
          specialty: data.specialties || [],
          education: ['Hồ sơ đăng ký tự động trực tuyến'],
          experience: data.experience || 'Chưa cập nhật',
          email: data.email,
          phone: data.phone,
          isOfficial: false,
          joinedYear: new Date().getFullYear(),
          biography: bioList,
        },
      });
    }

    return { success: true, userId: user.id };
  } catch (error: any) {
    console.error('❌ Failed to register user locally:', error);
    return { success: false, error: error.message || 'Lỗi hệ thống khi đăng ký' };
  }
}

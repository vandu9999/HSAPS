'use server';

import { prisma } from '@/lib/prisma';
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

  // If Database is not configured, simulate successful registration
  if (!process.env.DATABASE_URL) {
    console.log('ℹ️ DATABASE_URL not set. Simulating registration:');
    console.log(`- User: ${data.name} (${data.email}), Role: ${data.role}`);
    if (data.role === 'hoi-vien') {
      console.log(`- Doctor Profile CCHN: ${data.cchn}, Signature length: ${data.signature?.length || 0}`);
    }
    return { success: true };
  }

  try {
    // 1. Check if email already exists in User table
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: 'Địa chỉ email này đã được sử dụng' };
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Create User record
    const userRole = data.role === 'hoi-vien' ? 'editor' : 'guest';
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: userRole,
      },
    });

    // 4. If role is 'Hội viên' (Doctor), create Doctor record
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
          isOfficial: false, // Must be approved by Admin
          joinedYear: new Date().getFullYear(),
          biography: bioList,
        },
      });
    }

    return { success: true, userId: user.id };
  } catch (error: any) {
    console.error('❌ Failed to register user:', error);
    return { success: false, error: error.message || 'Lỗi hệ thống khi đăng ký' };
  }
}

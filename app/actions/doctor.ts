'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DOCTORS_DATA } from '@/lib/data';

export async function getDoctors() {
  if (!process.env.DATABASE_URL) {
    return DOCTORS_DATA;
  }
  try {
    return await prisma.doctor.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch doctors from DB, falling back to static DOCTORS_DATA:', error);
    return DOCTORS_DATA;
  }
}

export async function getDoctorById(id: string) {
  if (!process.env.DATABASE_URL) {
    return DOCTORS_DATA.find(d => d.id === id) || null;
  }
  try {
    return await prisma.doctor.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch doctor by id ${id}, falling back to static DOCTORS_DATA:`, error);
    return DOCTORS_DATA.find(d => d.id === id) || null;
  }
}

export async function saveDoctor(data: {
  id?: string;
  name: string;
  title: string;
  role?: string;
  avatar: string;
  cchn: string;
  clinic: string;
  address: string;
  specialty: string[];
  education: string[];
  experience: string;
  email: string;
  phone: string;
  isOfficial: boolean;
  joinedYear: number;
  biography?: string[];
}) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving doctor.');
    return { success: true, doctor: data as any };
  }
  try {
    const docData = {
      name: data.name,
      title: data.title,
      role: data.role || null,
      avatar: data.avatar,
      cchn: data.cchn,
      clinic: data.clinic,
      address: data.address,
      specialty: data.specialty,
      education: data.education,
      experience: data.experience,
      email: data.email,
      phone: data.phone,
      isOfficial: data.isOfficial,
      joinedYear: Number(data.joinedYear),
      biography: data.biography || [],
    };

    if (data.id && data.id.trim() !== '') {
      const updated = await prisma.doctor.update({
        where: { id: data.id },
        data: docData,
      });
      revalidatePath('/admin/hoi-vien');
      revalidatePath(`/hoi-vien/${data.id}`);
      return { success: true, doctor: updated };
    } else {
      const created = await prisma.doctor.create({
        data: docData,
      });
      revalidatePath('/admin/hoi-vien');
      return { success: true, doctor: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save doctor:', error);
    return { success: false, error: error.message || 'Lỗi lưu thông tin hội viên' };
  }
}

export async function deleteDoctor(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting doctor.');
    return { success: true };
  }
  try {
    await prisma.doctor.delete({
      where: { id },
    });
    revalidatePath('/admin/hoi-vien');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete doctor:', error);
    return { success: false, error: error.message || 'Lỗi xóa hội viên' };
  }
}

export async function getDoctorByEmail(email: string) {
  if (!process.env.DATABASE_URL) {
    return DOCTORS_DATA.find(d => d.email.toLowerCase() === email.toLowerCase()) || null;
  }
  try {
    return await prisma.doctor.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch doctor by email ${email}:`, error);
    return DOCTORS_DATA.find(d => d.email.toLowerCase() === email.toLowerCase()) || null;
  }
}

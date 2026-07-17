'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { SCIENTIFIC_EVENTS_DATA } from '@/lib/data';

export async function getEvents() {
  if (!process.env.DATABASE_URL) {
    return SCIENTIFIC_EVENTS_DATA;
  }
  try {
    return await prisma.event.findMany({
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch events from DB, falling back to static SCIENTIFIC_EVENTS_DATA:', error);
    return SCIENTIFIC_EVENTS_DATA;
  }
}

export async function getEventById(id: string) {
  if (!process.env.DATABASE_URL) {
    return SCIENTIFIC_EVENTS_DATA.find(e => e.id === id) || null;
  }
  try {
    return await prisma.event.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch event by id ${id}, falling back to static SCIENTIFIC_EVENTS_DATA:`, error);
    return SCIENTIFIC_EVENTS_DATA.find(e => e.id === id) || null;
  }
}

export async function saveEvent(data: {
  id?: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  description: string;
  registrationFee: string;
  status: string;
  cmeHours: string;
  capacityText: string;
  progress?: number;
  speakers?: string[];
}) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving event.');
    return { success: true, event: data as any };
  }
  try {
    const eventData = {
      title: data.title,
      type: data.type,
      date: data.date,
      time: data.time,
      location: data.location,
      imageUrl: data.imageUrl,
      description: data.description,
      registrationFee: data.registrationFee,
      status: data.status,
      cmeHours: data.cmeHours,
      capacityText: data.capacityText,
      progress: Number(data.progress || 0),
      speakers: data.speakers || [],
    };

    if (data.id && data.id.trim() !== '') {
      const updated = await prisma.event.update({
        where: { id: data.id },
        data: eventData,
      });
      revalidatePath('/admin/su-kien');
      revalidatePath(`/su-kien/${data.id}`);
      return { success: true, event: updated };
    } else {
      const created = await prisma.event.create({
        data: eventData,
      });
      revalidatePath('/admin/su-kien');
      return { success: true, event: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save event:', error);
    return { success: false, error: error.message || 'Lỗi lưu thông tin sự kiện' };
  }
}

export async function deleteEvent(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting event.');
    return { success: true };
  }
  try {
    await prisma.event.delete({
      where: { id },
    });
    revalidatePath('/admin/su-kien');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete event:', error);
    return { success: false, error: error.message || 'Lỗi xóa sự kiện' };
  }
}

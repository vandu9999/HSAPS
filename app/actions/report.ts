'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { SCIENTIFIC_REPORTS_DATA } from '@/lib/data';

export async function getReports() {
  if (!process.env.DATABASE_URL) {
    return SCIENTIFIC_REPORTS_DATA;
  }
  try {
    return await prisma.report.findMany({
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch reports from DB, falling back to static SCIENTIFIC_REPORTS_DATA:', error);
    return SCIENTIFIC_REPORTS_DATA;
  }
}

export async function getReportById(id: string) {
  if (!process.env.DATABASE_URL) {
    return SCIENTIFIC_REPORTS_DATA.find(r => r.id === id) || null;
  }
  try {
    return await prisma.report.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch report by id ${id}, falling back to static SCIENTIFIC_REPORTS_DATA:`, error);
    return SCIENTIFIC_REPORTS_DATA.find(r => r.id === id) || null;
  }
}

export async function saveReport(data: {
  id?: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  date: string;
  journal: string;
  imageUrl: string;
  tags: string[];
  doi: string;
  views?: number;
}) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving report.');
    return { success: true, report: data as any };
  }
  try {
    const reportData = {
      title: data.title,
      authors: data.authors,
      abstract: data.abstract,
      category: data.category,
      date: data.date,
      journal: data.journal,
      imageUrl: data.imageUrl,
      tags: data.tags || [],
      doi: data.doi,
      views: data.views || 0,
    };

    if (data.id && data.id.trim() !== '') {
      const updated = await prisma.report.update({
        where: { id: data.id },
        data: reportData,
      });
      revalidatePath('/admin/bao-cao');
      revalidatePath(`/bao-cao-khoa-hoc/${data.id}`);
      return { success: true, report: updated };
    } else {
      const created = await prisma.report.create({
        data: reportData,
      });
      revalidatePath('/admin/bao-cao');
      return { success: true, report: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save report:', error);
    return { success: false, error: error.message || 'Lỗi lưu thông tin báo cáo' };
  }
}

export async function deleteReport(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting report.');
    return { success: true };
  }
  try {
    await prisma.report.delete({
      where: { id },
    });
    revalidatePath('/admin/bao-cao');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete report:', error);
    return { success: false, error: error.message || 'Lỗi xóa báo cáo' };
  }
}

export async function incrementReportViews(id: string) {
  if (!process.env.DATABASE_URL) {
    return { success: true };
  }
  try {
    await prisma.report.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to increment views for report ${id}:`, error);
    return { success: false };
  }
}

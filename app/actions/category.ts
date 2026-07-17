'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_CATEGORIES = [
  { id: 'cat1', type: 'su-kien', name: 'Đại hội thường niên', color: '#ec297b', description: 'Đại hội thường niên' },
  { id: 'cat2', type: 'su-kien', name: 'Đào tạo liên tục (CME)', color: '#10b981', description: 'Đào tạo liên tục (CME)' },
  { id: 'cat3', type: 'su-kien', name: 'Workshop Thực hành', color: '#f59e0b', description: 'Workshop Thực hành' },
  { id: 'cat4', type: 'tin-tuc', name: 'Khuyến cáo', color: '#ef4444', description: 'Khuyến cáo' },
  { id: 'cat5', type: 'tin-tuc', name: 'Hoạt động Hội', color: '#ec297b', description: 'Hoạt động Hội' },
  { id: 'cat6', type: 'tin-tuc', name: 'Thông báo', color: '#f59e0b', description: 'Thông báo' },
  { id: 'cat7', type: 'bao-cao', name: 'Phẫu thuật Tạo hình', color: '#3b82f6', description: 'Phẫu thuật Tạo hình' },
  { id: 'cat8', type: 'bao-cao', name: 'Thẩm mỹ nội khoa', color: '#ec297b', description: 'Thẩm mỹ nội khoa' },
  { id: 'cat9', type: 'bao-cao', name: 'Tái tạo & Vi phẫu', color: '#10b981', description: 'Tái tạo & Vi phẫu' },
];

export async function getCategories(type?: string) {
  if (!process.env.DATABASE_URL) {
    return type ? DEFAULT_CATEGORIES.filter(c => c.type === type) : DEFAULT_CATEGORIES;
  }
  try {
    const where = type ? { type } : {};
    return await prisma.category.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch categories from DB:', error);
    return type ? DEFAULT_CATEGORIES.filter(c => c.type === type) : DEFAULT_CATEGORIES;
  }
}

export async function saveCategory(data: { id?: string; type: string; name: string; color: string; description?: string }) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving category.');
    return { success: true };
  }
  try {
    if (data.id && !data.id.startsWith('cat')) {
      const updated = await prisma.category.update({
        where: { id: data.id },
        data: {
          type: data.type,
          name: data.name,
          color: data.color,
          description: data.description,
        },
      });
      revalidatePath('/admin/danh-muc');
      return { success: true, category: updated };
    } else {
      const created = await prisma.category.create({
        data: {
          type: data.type,
          name: data.name,
          color: data.color,
          description: data.description,
        },
      });
      revalidatePath('/admin/danh-muc');
      return { success: true, category: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save category:', error);
    return { success: false, error: error.message || 'Lỗi lưu danh mục' };
  }
}

export async function deleteCategory(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting category.');
    return { success: true };
  }
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath('/admin/danh-muc');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete category:', error);
    return { success: false, error: error.message || 'Lỗi xóa danh mục' };
  }
}

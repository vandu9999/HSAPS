'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_NEWS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    category: 'Báo cáo',
    categoryColor: 'primary',
    date: '10 Tháng 11, 2024',
    title: 'Thông báo về việc nộp bài báo khoa học quý IV/2024',
    excerpt: 'Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.',
    published: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    category: 'Hợp tác quốc tế',
    categoryColor: 'secondary',
    date: '05 Tháng 11, 2024',
    title: 'Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)',
    excerpt: 'Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.',
    published: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    category: 'Khuyến cáo',
    categoryColor: 'primary',
    date: '01 Tháng 11, 2024',
    title: 'Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)',
    excerpt: 'Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.',
    published: true,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    category: 'Hoạt động Hội',
    categoryColor: 'secondary',
    date: '28 Tháng 10, 2024',
    title: 'Đoàn đại biểu đại diện HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á',
    excerpt: 'Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.',
    published: true,
  },
];

export async function getNews() {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_NEWS;
  }
  try {
    return await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch news from DB, falling back to static news list:', error);
    return DEFAULT_NEWS;
  }
}

export async function getNewsById(id: string) {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_NEWS.find((n: any) => n.id === id) || null;
  }
  try {
    return await prisma.news.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch news by id ${id}, falling back to static news list:`, error);
    return DEFAULT_NEWS.find((n: any) => n.id === id) || null;
  }
}

export async function saveNews(data: {
  id?: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  excerpt: string;
  published: boolean;
}) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving news.');
    return { success: true, news: data as any };
  }
  try {
    const newsData = {
      imageUrl: data.imageUrl,
      category: data.category,
      categoryColor: data.categoryColor,
      date: data.date,
      title: data.title,
      excerpt: data.excerpt,
      published: data.published,
    };

    if (data.id && data.id.trim() !== '') {
      const updated = await prisma.news.update({
        where: { id: data.id },
        data: newsData,
      });
      revalidatePath('/admin/tin-tuc');
      revalidatePath('/tin-tuc');
      return { success: true, news: updated };
    } else {
      const created = await prisma.news.create({
        data: newsData,
      });
      revalidatePath('/admin/tin-tuc');
      revalidatePath('/tin-tuc');
      return { success: true, news: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save news:', error);
    return { success: false, error: error.message || 'Lỗi lưu thông tin tin tức' };
  }
}

export async function deleteNews(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting news.');
    return { success: true };
  }
  try {
    await prisma.news.delete({
      where: { id },
    });
    revalidatePath('/admin/tin-tuc');
    revalidatePath('/tin-tuc');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete news:', error);
    return { success: false, error: error.message || 'Lỗi xóa tin tức' };
  }
}

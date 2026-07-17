'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PARTNERS_DATA } from '@/lib/data';

export async function getPartners() {
  if (!process.env.DATABASE_URL) {
    return PARTNERS_DATA;
  }
  try {
    return await prisma.partner.findMany({
      include: { products: true },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch partners from DB, falling back to static PARTNERS_DATA:', error);
    return PARTNERS_DATA;
  }
}

export async function getPartnerById(id: string) {
  if (!process.env.DATABASE_URL) {
    return PARTNERS_DATA.find(p => p.id === id) || null;
  }
  try {
    return await prisma.partner.findUnique({
      where: { id },
      include: { products: true },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch partner by id ${id}, falling back to static PARTNERS_DATA:`, error);
    return PARTNERS_DATA.find(p => p.id === id) || null;
  }
}

interface ProductInput {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
}

export async function savePartner(data: {
  id?: string;
  name: string;
  category: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  introduction: string;
  logoType?: string;
  products: ProductInput[];
}) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping saving partner.');
    return { success: true, partner: data as any };
  }
  try {
    const partnerData = {
      name: data.name,
      category: data.category,
      description: data.description,
      website: data.website,
      phone: data.phone,
      email: data.email,
      address: data.address,
      introduction: data.introduction,
      logoType: data.logoType || null,
    };

    if (data.id && data.id.trim() !== '' && !PARTNERS_DATA.some(p => p.id === data.id)) {
      // 1. Update partner profile
      const updated = await prisma.partner.update({
        where: { id: data.id },
        data: partnerData,
      });

      // 2. Overwrite products: delete old and create new is the simplest way to sync
      await prisma.product.deleteMany({
        where: { partnerId: data.id },
      });

      if (data.products.length > 0) {
        await prisma.product.createMany({
          data: data.products.map(p => ({
            name: p.name,
            description: p.description,
            imageUrl: p.imageUrl,
            partnerId: updated.id,
          })),
        });
      }

      revalidatePath('/admin/doi-tac');
      revalidatePath(`/doi-tac/${data.id}`);
      return { success: true, partner: updated };
    } else {
      // Create partner and its nested products
      const created = await prisma.partner.create({
        data: {
          ...partnerData,
          products: {
            create: data.products.map(p => ({
              name: p.name,
              description: p.description,
              imageUrl: p.imageUrl,
            })),
          },
        },
      });

      revalidatePath('/admin/doi-tac');
      return { success: true, partner: created };
    }
  } catch (error: any) {
    console.error('❌ Failed to save partner:', error);
    return { success: false, error: error.message || 'Lỗi lưu thông tin đối tác' };
  }
}

export async function deletePartner(id: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Skipping deleting partner.');
    return { success: true };
  }
  try {
    await prisma.partner.delete({
      where: { id },
    });
    revalidatePath('/admin/doi-tac');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to delete partner:', error);
    return { success: false, error: error.message || 'Lỗi xóa đối tác' };
  }
}

export async function getPartnerByEmail(email: string) {
  if (!process.env.DATABASE_URL) {
    return PARTNERS_DATA.find(p => p.email?.toLowerCase() === email.toLowerCase()) || null;
  }
  try {
    return await prisma.partner.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
      include: { products: true },
    });
  } catch (error) {
    console.error(`❌ Failed to fetch partner by email ${email}:`, error);
    return PARTNERS_DATA.find(p => p.email?.toLowerCase() === email.toLowerCase()) || null;
  }
}

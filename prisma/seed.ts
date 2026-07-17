import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DOCTORS_DATA } from '../lib/data';
import { SCIENTIFIC_EVENTS_DATA } from '../lib/data';
import { NEWS_DATA } from '../lib/data';
import { SCIENTIFIC_REPORTS_DATA } from '../lib/data';
import { PARTNERS_DATA } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin User
  const adminEmail = 'admin@hsaps.org.vn';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123@hsaps', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Quản trị viên HSAPS',
        role: 'admin',
      },
    });
    console.log('✅ Created default admin user: admin@hsaps.org.vn / admin123@hsaps');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // 2. Seed Doctors
  console.log('🩺 Seeding doctors...');
  for (const doc of DOCTORS_DATA) {
    await prisma.doctor.upsert({
      where: { id: doc.id },
      update: {},
      create: {
        id: doc.id,
        name: doc.name,
        title: doc.title,
        role: doc.role,
        avatar: doc.avatar,
        cchn: doc.cchn,
        clinic: doc.clinic,
        address: doc.address,
        specialty: doc.specialty,
        education: doc.education,
        experience: doc.experience,
        email: doc.email,
        phone: doc.phone,
        isOfficial: doc.isOfficial,
        joinedYear: doc.joinedYear,
        biography: doc.biography || [],
      },
    });
  }

  // 3. Seed Events
  console.log('📅 Seeding events...');
  for (const evt of SCIENTIFIC_EVENTS_DATA) {
    await prisma.event.upsert({
      where: { id: evt.id },
      update: {},
      create: {
        id: evt.id,
        title: evt.title,
        type: evt.type,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        imageUrl: evt.imageUrl,
        description: evt.description,
        registrationFee: evt.registrationFee,
        status: evt.status,
        cmeHours: evt.cmeHours,
        capacityText: evt.capacityText,
        progress: evt.progress || 0,
        speakers: evt.speakers || [],
      },
    });
  }

  // 4. Seed News
  console.log('📰 Seeding news...');
  for (const news of NEWS_DATA) {
    await prisma.news.upsert({
      where: { id: news.id },
      update: {},
      create: {
        id: news.id,
        imageUrl: news.imageUrl,
        category: news.category,
        categoryColor: news.categoryColor,
        date: news.date,
        title: news.title,
        excerpt: news.excerpt,
        published: news.published,
      },
    });
  }

  // 5. Seed Reports
  console.log('🔬 Seeding reports...');
  for (const rep of SCIENTIFIC_REPORTS_DATA) {
    await prisma.report.upsert({
      where: { id: rep.id },
      update: {},
      create: {
        id: rep.id,
        title: rep.title,
        authors: rep.authors,
        abstract: rep.abstract,
        category: rep.category,
        date: rep.date,
        journal: rep.journal,
        imageUrl: rep.imageUrl || '',
        tags: rep.tags || [],
        doi: rep.doi || '',
        views: rep.views || 0,
      },
    });
  }

  // 6. Seed Partners & Products
  console.log('🤝 Seeding partners & products...');
  for (const partner of PARTNERS_DATA) {
    await prisma.partner.upsert({
      where: { id: partner.id },
      update: {},
      create: {
        id: partner.id,
        name: partner.name,
        category: partner.category,
        description: partner.description,
        website: partner.website,
        phone: partner.phone,
        email: partner.email,
        address: partner.address,
        introduction: partner.introduction,
        logoType: partner.logoType,
        products: {
          create: partner.products.map(p => ({
            name: p.name,
            description: p.description,
            imageUrl: p.imageUrl,
          })),
        },
      },
    });
  }

  // 7. Seed Categories
  console.log('📂 Seeding categories...');
  const defaultCategories = [
    { type: 'su-kien', name: 'Đại hội thường niên', color: '#ec297b' },
    { type: 'su-kien', name: 'Đào tạo liên tục (CME)', color: '#10b981' },
    { type: 'su-kien', name: 'Workshop Thực hành', color: '#f59e0b' },
    { type: 'tin-tuc', name: 'Khuyến cáo', color: '#ef4444' },
    { type: 'tin-tuc', name: 'Hoạt động Hội', color: '#ec297b' },
    { type: 'tin-tuc', name: 'Thông báo', color: '#f59e0b' },
    { type: 'bao-cao', name: 'Phẫu thuật Tạo hình', color: '#3b82f6' },
    { type: 'bao-cao', name: 'Thẩm mỹ nội khoa', color: '#ec297b' },
    { type: 'bao-cao', name: 'Tái tạo & Vi phẫu', color: '#10b981' },
  ];

  for (const cat of defaultCategories) {
    const existing = await prisma.category.findFirst({
      where: { type: cat.type, name: cat.name },
    });
    if (!existing) {
      await prisma.category.create({
        data: {
          type: cat.type,
          name: cat.name,
          color: cat.color,
          description: `Danh mục tự động cho ${cat.name}`,
        },
      });
    }
  }

  console.log('🌱 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

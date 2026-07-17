import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hsaps.org.vn';

  // Danh sách các trang tĩnh chính
  const routes = [
    '',
    '/gioi-thieu',
    '/hoi-vien',
    '/bao-cao-khoa-hoc',
    '/lien-he',
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}

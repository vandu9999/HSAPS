import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login', '/register-profile'],
      },
      {
        // Cho phép tối đa các AI crawler để chuẩn GEO / LLMO (AI search optimization)
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Google-Extended',
          'PerplexityBot',
          'facebookexternalhit',
        ] as any,
        allow: '/',
        disallow: ['/admin/', '/api/'],
      }
    ],
    sitemap: 'https://hsaps.org.vn/sitemap.xml',
  };
}

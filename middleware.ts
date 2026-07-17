import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;
      
      const role = (token.role as string || '').toUpperCase();
      const path = req.nextUrl.pathname.replace(/\/$/, '') || '/';
      
      // 1. Dashboard chính (/admin) cho phép tất cả các tài khoản đã đăng nhập
      if (path === '/admin') {
        return true;
      }
      
      // 2. ADMIN có toàn quyền truy cập các trang quản trị
      if (role === 'ADMIN') {
        return true;
      }
      
      // 3. EDITOR (Bác sĩ/Hội viên) có quyền truy cập các trang admin (tin tức, sự kiện, báo cáo, hội viên...)
      if (role === 'EDITOR') {
        return true;
      }
      
      // 4. PARTNER chỉ được phép truy cập trang đối tác (/admin/doi-tac/...)
      if (role === 'PARTNER') {
        return path.startsWith('/admin/doi-tac');
      }
      
      // 5. GUEST chỉ có quyền xem trang dashboard chính /admin, các trang con khác đều bị chặn
      return false;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};

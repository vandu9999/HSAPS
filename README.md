# HSAPS PORTAL - Hệ thống Quản lý Hội viên & Khoa học

Hệ thống Portal quản trị hành chính và lưu trữ nghiên cứu khoa học chuyên nghiệp dành cho **Hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM (HSAPS)**. Được xây dựng trên nền tảng Next.js (App Router), TypeScript, Prisma ORM và hệ sinh thái Supabase (Database & Storage).

---

## ✨ Các Tính Năng Cốt Lõi

### 1. Quản lý Tài khoản & Phân quyền Chi tiết (RBAC)
- **Hệ thống phân quyền 3 lớp bảo mật** cấu hình qua [middleware.ts](middleware.ts):
  - **Ban Quản Trị (ADMIN)**: Toàn quyền truy cập, chỉnh sửa toàn bộ danh mục Trang chủ, Tin tức, Sự kiện, Hội viên Bác sĩ, Đối tác tài trợ, Báo cáo KH, Phân loại danh mục và Cài đặt.
  - **Bác sĩ Hội viên (EDITOR)**: Giao diện Sidebar tự động tinh giản. Chỉ được phép viết bài viết, xem sự kiện, đăng tải báo cáo khoa học của chính mình và truy cập mục **"Hồ sơ của tôi"** để cập nhật thông tin cá nhân.
  - **Khách mời (GUEST)**: Bị chặn toàn bộ quyền truy cập vào khu vực `/admin/*`.
- **Đăng nhập & Đăng ký đa phương thức**:
  - Xác thực tài khoản Admin/Hội viên qua **NextAuth.js**.
  - Tích hợp đăng nhập mạng xã hội **Google & Zalo Account**.
  - **Gợi ý Đăng nhập nhanh (Google One Tap Style)**: Tự động nhận diện tài khoản và gợi ý đăng nhập một chạm cực kỳ chuyên nghiệp.

### 2. Quy trình Đăng ký Đa bước Chuyên nghiệp
- **Bước 1**: Nhập tài khoản và chọn vai trò y khoa (Hội viên / Đối tác / Khách mời).
- **Bước 2**: Khai báo hồ sơ y khoa chuyên sâu và **Ký tên online** trực tiếp bằng bảng vẽ HTML5 Canvas (nhận nét vẽ mượt mà từ chuột hoặc màn hình cảm ứng điện thoại).
- **Bước 3**: Xem thông tin chuyển khoản hội phí Vietcombank tự động tạo cú pháp theo tên bác sĩ và tải lên hình ảnh **Hóa đơn giao dịch** (xác thực qua API).

### 3. Tích hợp Hệ sinh thái Cloud Supabase
- **Cơ sở dữ liệu**: Đồng bộ dữ liệu quan hệ hoàn hảo qua **Prisma ORM** và **PostgreSQL** của Supabase.
- **Bộ lưu trữ (Storage)**: Hình ảnh tải lên từ CMS và hóa đơn đóng phí thành viên được truyền trực tiếp lên bucket công khai `images` của **Supabase Storage** với các quy tắc bảo mật RLS chặt chẽ.
- **Email tự động**: Chuyển tiếp biểu mẫu Form liên hệ y khoa về hòm thư điện tử ban thư ký qua cổng **Resend API**.

---

## 📂 Cấu Trúc Thư Mục Chính

```text
├── app/
│   ├── actions/          # Server Actions kết nối CSDL (doctor, event, news, category...)
│   ├── admin/            # CMS quản lý nội dung phân quyền (Sidebar, Editor, Dashboard)
│   ├── api/
│   │   ├── auth/         # NextAuth endpoint
│   │   ├── upload/       # API xử lý upload ảnh lên Supabase Storage
│   │   └── lien-he/      # API dispatch email liên hệ qua Resend
│   ├── login/            # Trang đăng nhập & Đăng ký đa bước (Canvas ký tên, QR Thanh toán)
│   └── page.tsx          # Giao diện Trang chủ công khai HSAPS
├── components/           # Component dùng chung (Header, Footer, ConditionalLayout, Providers)
├── lib/                  # Centralized utilities (prisma, mail, auth, mock data)
├── prisma/
│   ├── schema.prisma     # Định nghĩa cấu trúc bảng CSDL PostgreSQL
│   └── seed.ts           # Script nạp dữ liệu mẫu ban đầu
└── .env                  # Tệp cấu hình các biến môi trường bảo mật
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu cầu hệ thống
- **Node.js** phiên bản 18 trở lên.
- Một dự án **Supabase** đang hoạt động (Đăng ký miễn phí tại [supabase.com](https://supabase.com)).

### 2. Cài đặt Dependencies
Mở terminal tại thư mục dự án và chạy:
```bash
npm install
```

### 3. Thiết lập Biến môi trường
Tạo tệp `.env` tại thư mục gốc của dự án và điền thông số kết nối của bạn:
```env
# URL kết nối cơ sở dữ liệu Supabase (Sử dụng Connection Pooler của Supabase)
DATABASE_URL="postgresql://postgres.[Mã_dự_án]:[Mật_khẩu_db]@aws-0-[Vùng].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# NextAuth Security
NEXTAUTH_SECRET="hsaps-super-secret-key-3000"
NEXTAUTH_URL="http://localhost:3000"

# Cấu hình khóa Supabase cho Client-side để upload ảnh lên Storage
NEXT_PUBLIC_SUPABASE_URL="https://[Mã_dự_án].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."

# (Tùy chọn) Gửi thư tự động qua Resend
# RESEND_API_KEY="re_..."
```

### 4. Đồng bộ Cấu trúc Bảng & Khởi tạo Dữ liệu
Chạy các câu lệnh sau để đẩy schema lên Supabase và nạp dữ liệu bác sĩ, bài viết y khoa mặc định:
```bash
# Đẩy schema lên CSDL Supabase
npx prisma db push

# Nạp dữ liệu Seeding ban đầu
npx prisma db seed
```

### 5. Chạy dự án ở chế độ Phát triển
Khởi chạy Server cục bộ:
```bash
npm run dev
```
Truy cập ứng dụng tại đường dẫn: `http://localhost:3000`

---

## 🔐 Tài Khoản Quản Trị Mặc Định (Sau khi chạy Seed)
- **Tài khoản**: `admin@hsaps.org.vn`
- **Mật khẩu**: `admin123@hsaps`

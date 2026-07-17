import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background-light dark:bg-background-dark px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <span className="text-4xl font-extrabold text-primary">404</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-text-main dark:text-white">Trang không tìm thấy</h1>
        <p className="mt-2 text-text-secondary dark:text-gray-400">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}

import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, department, subject, message } = body;

    if (!name || !email || !phone || !department || !subject || !message) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ các thông tin bắt buộc' }, { status: 400 });
    }

    const result = await sendContactEmail({
      name,
      email,
      phone,
      department,
      subject,
      message,
    });

    return NextResponse.json({ success: true, emailId: result.id });
  } catch (error: any) {
    console.error('❌ Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi không xác định khi gửi liên hệ' },
      { status: 500 }
    );
  }
}

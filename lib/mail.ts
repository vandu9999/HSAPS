import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

interface ContactEmailParams {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  phone,
  department,
  subject,
  message,
}: ContactEmailParams) {
  // If API key is not configured, simulate sending and print log in console
  if (!process.env.RESEND_API_KEY) {
    console.log('✉️ Resend API Key not configured. Simulating email send:');
    console.log(`- From: HSAPS Contact Form <no-reply@hsaps.org.vn>`);
    console.log(`- To: banthuky@hsaps.org.vn`);
    console.log(`- Subject: [HSAPS] Thư liên hệ mới: ${subject}`);
    console.log(`- Body:
      Bộ phận nhận: ${department}
      Họ tên: ${name}
      Email: ${email}
      SĐT: ${phone}
      Nội dung: ${message}
    `);
    return { success: true, id: 'mock-email-id-' + Date.now() };
  }

  try {
    const data = await resend.emails.send({
      from: 'HSAPS Contact Form <no-reply@hsaps.org.vn>',
      to: 'banthuky@hsaps.org.vn',
      subject: `[HSAPS] Thư liên hệ mới - ${department}: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f3e7eb; rounded-2xl; border-radius: 12px;">
          <h2 style="color: #ec297b; border-bottom: 2px solid #ec297b; padding-bottom: 8px;">Thư liên hệ mới từ cổng thông tin HSAPS</h2>
          
          <p><strong>Bộ phận tiếp nhận:</strong> ${department}</p>
          <p><strong>Họ và tên:</strong> ${name}</p>
          <p><strong>Email liên hệ:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Số điện thoại:</strong> ${phone}</p>
          <p><strong>Tiêu đề:</strong> ${subject}</p>
          
          <div style="background-color: #fdf8fa; padding: 15px; border-radius: 8px; border-left: 4px solid #ec297b; margin-top: 15px;">
            <p style="margin: 0; font-weight: bold; color: #5c3a45;">Nội dung tin nhắn:</p>
            <p style="margin-top: 8px; line-height: 1.6; color: #2d1a24; white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #f3e7eb; margin: 20px 0;" />
          <p style="font-size: 11px; color: #974e68; text-align: center;">Thư này được gửi tự động từ hệ thống HSAPS.</p>
        </div>
      `,
    });

    return { success: true, id: data.data?.id };
  } catch (error: any) {
    console.error('❌ Failed to send email via Resend:', error);
    throw new Error('Không thể gửi email: ' + (error.message || 'Lỗi không xác định'));
  }
}

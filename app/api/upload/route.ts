import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@supabase/supabase-js';

// Configure Supabase client if credentials are provided in env
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// Configure Cloudinary only if credentials are provided in env
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file tải lên' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. If Supabase is configured, upload to Supabase Storage
    if (isSupabaseConfigured) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Generate a unique safe filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const fileName = `${timestamp}_${randomStr}_${safeName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, buffer, {
          contentType: file.type,
          cacheControl: '31536000',
          upsert: false,
        });

      if (error) {
        throw new Error(`Supabase Storage Upload Error: ${error.message}`);
      }

      // Retrieve public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      return NextResponse.json({ url: publicUrlData.publicUrl });
    }

    // 2. If Cloudinary is configured, upload to Cloudinary
    if (isCloudinaryConfigured) {
      const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'hsaps_uploads',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as any);
          }
        ).end(buffer);
      });

      const uploadResult = await uploadPromise;
      return NextResponse.json({ url: uploadResult.secure_url });
    }

    // 3. Fallback: convert file directly to Base64 data URL
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    
    // In dev mode, print a helpful notice
    console.log('ℹ️ Upload API: Supabase and Cloudinary not configured. Falling back to local Base64 URL.');

    return NextResponse.json({ url: dataUrl });
  } catch (error: any) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Lỗi tải lên hình ảnh: ' + (error.message || 'Lỗi không xác định') },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js parser to handle standard FormData
  },
};

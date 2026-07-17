'use server';

export async function isDbConnected() {
  return !!process.env.DATABASE_URL;
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'venueops_session';

function getSecret() {
  return process.env.AUTH_SECRET ?? 'dev-only-change-me';
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export async function createSession(userId: string) {
  const payload = `${userId}:${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

function verifyToken(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const [userId] = payload.split(':');
  return userId || null;
}

export const getSessionUser = cache(async () => {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  const userId = verifyToken(token);
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId }, include: { venue: true } });
});

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect('/signin');
  return user;
}

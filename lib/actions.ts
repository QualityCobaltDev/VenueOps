'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { hash, compare } from 'bcryptjs';
import { ChecklistType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { clearSession, createSession, requireUser } from '@/lib/auth';
import {
  checklistItemSchema,
  checklistSchema,
  dailyLogSchema,
  incidentSchema,
  passwordChangeSchema,
  profileSchema,
  signInSchema,
  signUpSchema,
  venueSchema,
} from '@/lib/validations';

function getString(formData: FormData, key: string) {
  return (formData.get(key) as string | null)?.trim() ?? '';
}

function getBool(formData: FormData, key: string) {
  return formData.get(key) === 'on' || formData.get(key) === 'true';
}

export async function signUpAction(_prevState: { error: string }, formData: FormData) {
  const parsed = signUpSchema.safeParse({
    fullName: getString(formData, 'fullName'),
    email: getString(formData, 'email').toLowerCase(),
    password: getString(formData, 'password'),
    venueName: getString(formData, 'venueName'),
  });

  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: 'Email is already registered.' };

  const venue = await prisma.venue.create({ data: { name: parsed.data.venueName } });
  const user = await prisma.user.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      passwordHash: await hash(parsed.data.password, 12),
      venueId: venue.id,
    },
  });

  await createSession(user.id);
  redirect('/app');
}

export async function signInAction(_prevState: { error: string }, formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: getString(formData, 'email').toLowerCase(),
    password: getString(formData, 'password'),
  });
  if (!parsed.success) return { error: 'Invalid credentials.' };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return { error: 'Invalid credentials.' };

  const ok = await compare(parsed.data.password, user.passwordHash);
  if (!ok) return { error: 'Invalid credentials.' };

  await createSession(user.id);
  redirect('/app');
}

export async function signOutAction() {
  await clearSession();
  redirect('/signin');
}

export async function createChecklistAction(formData: FormData) {
  const user = await requireUser();
  const parsed = checklistSchema.safeParse({
    title: getString(formData, 'title'),
    type: getString(formData, 'type') as ChecklistType,
    description: getString(formData, 'description') || undefined,
  });
  if (!parsed.success) return { error: 'Invalid checklist.' };
  await prisma.checklist.create({ data: { ...parsed.data, venueId: user.venueId } });
  revalidatePath('/app/checklists');
}

export async function createChecklistItemAction(formData: FormData) {
  const user = await requireUser();
  const checklistId = getString(formData, 'checklistId');
  const checklist = await prisma.checklist.findFirst({ where: { id: checklistId, venueId: user.venueId } });
  if (!checklist) return { error: 'Checklist not found.' };

  const parsed = checklistItemSchema.safeParse({ label: getString(formData, 'label'), isRequired: getBool(formData, 'isRequired') });
  if (!parsed.success) return { error: 'Invalid item.' };

  const max = await prisma.checklistItem.aggregate({ where: { checklistId }, _max: { sortOrder: true } });
  await prisma.checklistItem.create({
    data: {
      checklistId,
      label: parsed.data.label,
      isRequired: parsed.data.isRequired ?? true,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath(`/app/checklists/${checklistId}`);
}

export async function toggleChecklistItemAction(formData: FormData) {
  const user = await requireUser();
  const itemId = getString(formData, 'itemId');
  const item = await prisma.checklistItem.findFirst({
    where: { id: itemId, checklist: { venueId: user.venueId } },
    include: { checklist: true },
  });
  if (!item) return { error: 'Item not found.' };

  await prisma.checklistItem.update({
    where: { id: itemId },
    data: item.completedAt
      ? { completedAt: null, completedByUserId: null }
      : { completedAt: new Date(), completedByUserId: user.id },
  });

  revalidatePath(`/app/checklists/${item.checklistId}`);
  revalidatePath('/app/checklists');
}

export async function archiveChecklistAction(formData: FormData) {
  const user = await requireUser();
  const checklistId = getString(formData, 'checklistId');
  await prisma.checklist.updateMany({ where: { id: checklistId, venueId: user.venueId }, data: { isArchived: true } });
  revalidatePath('/app/checklists');
  redirect('/app/checklists');
}

export async function createIncidentAction(formData: FormData) {
  const user = await requireUser();
  const parsed = incidentSchema.safeParse({
    title: getString(formData, 'title'),
    occurredAt: getString(formData, 'occurredAt'),
    category: getString(formData, 'category'),
    severity: getString(formData, 'severity'),
    location: getString(formData, 'location') || undefined,
    peopleInvolved: getString(formData, 'peopleInvolved') || undefined,
    description: getString(formData, 'description'),
    actionTaken: getString(formData, 'actionTaken') || undefined,
    followUpRequired: getBool(formData, 'followUpRequired'),
    followUpNotes: getString(formData, 'followUpNotes') || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid report.' };

  await prisma.incidentReport.create({
    data: {
      ...parsed.data,
      occurredAt: new Date(parsed.data.occurredAt),
      venueId: user.venueId,
      createdByUserId: user.id,
    },
  });
  revalidatePath('/app/incidents');
  redirect('/app/incidents');
}

export async function updateIncidentAction(id: string, formData: FormData) {
  const user = await requireUser();
  const existing = await prisma.incidentReport.findFirst({ where: { id, venueId: user.venueId } });
  if (!existing) return { error: 'Not found' };
  const parsed = incidentSchema.safeParse({
    title: getString(formData, 'title'),
    occurredAt: getString(formData, 'occurredAt'),
    category: getString(formData, 'category'),
    severity: getString(formData, 'severity'),
    location: getString(formData, 'location') || undefined,
    peopleInvolved: getString(formData, 'peopleInvolved') || undefined,
    description: getString(formData, 'description'),
    actionTaken: getString(formData, 'actionTaken') || undefined,
    followUpRequired: getBool(formData, 'followUpRequired'),
    followUpNotes: getString(formData, 'followUpNotes') || undefined,
  });
  if (!parsed.success) return { error: 'Invalid report.' };
  await prisma.incidentReport.update({ where: { id }, data: { ...parsed.data, occurredAt: new Date(parsed.data.occurredAt) } });
  revalidatePath(`/app/incidents/${id}`);
  revalidatePath('/app/incidents');
}

export async function createDailyLogAction(formData: FormData) {
  const user = await requireUser();
  const parsed = dailyLogSchema.safeParse({
    title: getString(formData, 'title'),
    body: getString(formData, 'body'),
    shiftType: getString(formData, 'shiftType'),
    priority: getString(formData, 'priority'),
    operationalIssues: getString(formData, 'operationalIssues') || undefined,
    staffingNotes: getString(formData, 'staffingNotes') || undefined,
    revenueNotes: getString(formData, 'revenueNotes') || undefined,
    followUpNeeded: getBool(formData, 'followUpNeeded'),
  });
  if (!parsed.success) return { error: 'Invalid log.' };
  await prisma.dailyLog.create({ data: { ...parsed.data, venueId: user.venueId, createdByUserId: user.id } });
  revalidatePath('/app/logs');
  redirect('/app/logs');
}

export async function updateDailyLogAction(id: string, formData: FormData) {
  const user = await requireUser();
  const existing = await prisma.dailyLog.findFirst({ where: { id, venueId: user.venueId } });
  if (!existing) return { error: 'Not found' };

  const parsed = dailyLogSchema.safeParse({
    title: getString(formData, 'title'),
    body: getString(formData, 'body'),
    shiftType: getString(formData, 'shiftType'),
    priority: getString(formData, 'priority'),
    operationalIssues: getString(formData, 'operationalIssues') || undefined,
    staffingNotes: getString(formData, 'staffingNotes') || undefined,
    revenueNotes: getString(formData, 'revenueNotes') || undefined,
    followUpNeeded: getBool(formData, 'followUpNeeded'),
  });
  if (!parsed.success) return { error: 'Invalid log.' };

  await prisma.dailyLog.update({ where: { id }, data: parsed.data });
  revalidatePath(`/app/logs/${id}`);
  revalidatePath('/app/logs');
}

export async function archiveDailyLogAction(formData: FormData) {
  const user = await requireUser();
  const id = getString(formData, 'id');
  await prisma.dailyLog.updateMany({ where: { id, venueId: user.venueId }, data: { isArchived: true } });
  revalidatePath('/app/logs');
  redirect('/app/logs');
}

export async function updateProfileAction(formData: FormData) {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({ fullName: getString(formData, 'fullName'), email: getString(formData, 'email').toLowerCase() });
  if (!parsed.success) return { error: 'Invalid profile' };
  const conflict = await prisma.user.findFirst({ where: { email: parsed.data.email, NOT: { id: user.id } } });
  if (conflict) return { error: 'Email already in use.' };
  await prisma.user.update({ where: { id: user.id }, data: parsed.data });
  revalidatePath('/app/settings');
}

export async function updateVenueAction(formData: FormData) {
  const user = await requireUser();
  const parsed = venueSchema.safeParse({ name: getString(formData, 'name') });
  if (!parsed.success) return { error: 'Invalid venue' };
  await prisma.venue.update({ where: { id: user.venueId }, data: { name: parsed.data.name } });
  revalidatePath('/app/settings');
}

export async function changePasswordAction(formData: FormData) {
  const user = await requireUser();
  const parsed = passwordChangeSchema.safeParse({
    currentPassword: getString(formData, 'currentPassword'),
    newPassword: getString(formData, 'newPassword'),
    confirmPassword: getString(formData, 'confirmPassword'),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid password data' };
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser || !(await compare(parsed.data.currentPassword, dbUser.passwordHash))) {
    return { error: 'Current password is incorrect.' };
  }
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hash(parsed.data.newPassword, 12) } });
  revalidatePath('/app/settings');
}

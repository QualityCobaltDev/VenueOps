import { z } from 'zod';
import { ChecklistType, IncidentCategory, Priority, Severity, ShiftType, TemplateCategory } from '@prisma/client';

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  venueName: z.string().min(2),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const checklistSchema = z.object({
  title: z.string().min(2),
  type: z.nativeEnum(ChecklistType),
  description: z.string().optional(),
});

export const checklistItemSchema = z.object({
  label: z.string().min(1),
  isRequired: z.boolean().optional(),
});

export const incidentSchema = z.object({
  title: z.string().min(2),
  occurredAt: z.string().min(1),
  category: z.nativeEnum(IncidentCategory),
  severity: z.nativeEnum(Severity),
  location: z.string().optional(),
  peopleInvolved: z.string().optional(),
  description: z.string().min(10),
  actionTaken: z.string().optional(),
  followUpRequired: z.boolean().default(false),
  followUpNotes: z.string().optional(),
});

export const dailyLogSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(10),
  shiftType: z.nativeEnum(ShiftType),
  priority: z.nativeEnum(Priority),
  operationalIssues: z.string().optional(),
  staffingNotes: z.string().optional(),
  revenueNotes: z.string().optional(),
  followUpNeeded: z.boolean().default(false),
});

export const profileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
});

export const venueSchema = z.object({
  name: z.string().min(2),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirmation must match.',
    path: ['confirmPassword'],
  });

export const templateCategorySchema = z.nativeEnum(TemplateCategory);

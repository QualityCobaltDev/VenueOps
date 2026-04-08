import Link from 'next/link';
import type { Route } from 'next';
import { ChecklistType } from '@prisma/client';
import { createChecklistAction } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { Card, Label, PageHeader, Select, TextInput } from '@/components/ui';

export default async function ChecklistsPage() {
  const user = await requireUser();
  const checklists = await prisma.checklist.findMany({
    where: { venueId: user.venueId, isArchived: false },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <PageHeader title="Checklists" description="Build repeatable opening, closing, and cleaning routines." />
      <Card>
        <h2 className="mb-3 font-medium">Create checklist</h2>
        <form
          action={async (formData) => {
            'use server';
            await createChecklistAction(formData);
          }}
          className="grid gap-3 md:grid-cols-3"
        >
          <TextInput name="title" placeholder="Checklist title" required />
          <Select name="type" defaultValue={ChecklistType.OPENING}>
            {Object.values(ChecklistType).map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
          <TextInput name="description" placeholder="Description (optional)" />
          <button className="rounded-md bg-accent px-4 py-2 text-sm font-medium md:col-span-3 md:w-fit">Create</button>
        </form>
      </Card>

      <div className="mt-6 space-y-3">
        {checklists.length === 0 ? <Card><p className="text-muted">No checklists yet. Create your first checklist above.</p></Card> : null}
        {checklists.map((list) => {
          const completed = list.items.filter((i) => i.completedAt).length;
          const progress = list.items.length ? Math.round((completed / list.items.length) * 100) : 0;
          return (
            <Link key={list.id} href={`/app/checklists/${list.id}` as Route}>
              <Card className="hover:border-accent/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{list.title}</p>
                    <p className="text-xs text-muted">{list.type} · {completed}/{list.items.length} complete</p>
                  </div>
                  <p className="text-sm">{progress}%</p>
                </div>
                <div className="mt-3 h-2 rounded bg-white/10"><div className="h-2 rounded bg-accent" style={{ width: `${progress}%` }} /></div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

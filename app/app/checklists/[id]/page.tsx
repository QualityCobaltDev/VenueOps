import { notFound } from 'next/navigation';
import { archiveChecklistAction, createChecklistItemAction, toggleChecklistItemAction } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { Card, PageHeader, TextInput } from '@/components/ui';

export default async function ChecklistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const checklist = await prisma.checklist.findFirst({
    where: { id, venueId: user.venueId, isArchived: false },
    include: { items: { orderBy: { sortOrder: 'asc' }, include: { completedByUser: true } } },
  });
  if (!checklist) notFound();

  const completed = checklist.items.filter((i) => i.completedAt).length;
  const progress = checklist.items.length ? Math.round((completed / checklist.items.length) * 100) : 0;

  return (
    <div>
      <PageHeader title={checklist.title} description={`${checklist.type} checklist`} />
      <Card>
        <p className="text-sm text-muted">Progress</p>
        <div className="mt-2 h-2 rounded bg-white/10"><div className="h-2 rounded bg-accent" style={{ width: `${progress}%` }} /></div>
        <p className="mt-2 text-sm">{completed}/{checklist.items.length} complete</p>
      </Card>

      <Card className="mt-4">
        <form
          action={async (formData) => {
            'use server';
            await createChecklistItemAction(formData);
          }}
          className="flex flex-wrap gap-2"
        >
          <input type="hidden" name="checklistId" value={checklist.id} />
          <TextInput name="label" placeholder="New item" required className="max-w-sm" />
          <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" name="isRequired" defaultChecked /> Required</label>
          <button className="rounded-md bg-accent px-4 py-2 text-sm">Add Item</button>
        </form>
      </Card>

      <div className="mt-4 space-y-2">
        {checklist.items.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <p>{item.label}</p>
              <p className="text-xs text-muted">
                {item.completedAt ? `Completed ${new Date(item.completedAt).toLocaleString()} by ${item.completedByUser?.fullName ?? 'Unknown'}` : 'Pending'}
              </p>
            </div>
            <form
              action={async (formData) => {
                'use server';
                await toggleChecklistItemAction(formData);
              }}
            >
              <input type="hidden" name="itemId" value={item.id} />
              <button className="rounded-md border border-white/20 px-3 py-1 text-sm">{item.completedAt ? 'Undo' : 'Complete'}</button>
            </form>
          </Card>
        ))}
      </div>

      <form
        action={async (formData) => {
          'use server';
          await archiveChecklistAction(formData);
        }}
        className="mt-6"
      >
        <input type="hidden" name="checklistId" value={checklist.id} />
        <button className="rounded-md border border-red-500/50 px-3 py-2 text-sm text-red-300">Archive Checklist</button>
      </form>
    </div>
  );
}

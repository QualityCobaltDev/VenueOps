import { notFound } from 'next/navigation';
import { archiveDailyLogAction, updateDailyLogAction } from '@/lib/actions';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, PageHeader } from '@/components/ui';
import { DailyLogFields } from '@/components/log-form';

export default async function LogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const log = await prisma.dailyLog.findFirst({ where: { id, venueId: user.venueId, isArchived: false } });
  if (!log) notFound();

  async function handleUpdate(formData: FormData): Promise<void> {
    await updateDailyLogAction(id, formData);
  }

  return (
    <div>
      <PageHeader title="Daily Log Detail" />
      <Card>
        <form action={handleUpdate} className="space-y-4">
          <DailyLogFields log={log} />
          <button className="rounded-md bg-accent px-4 py-2 text-sm">Update log</button>
        </form>
      </Card>
      <form action={archiveDailyLogAction} className="mt-4">
        <input type="hidden" name="id" value={id} />
        <button className="rounded-md border border-red-500/50 px-3 py-2 text-sm text-red-300">Archive log</button>
      </form>
    </div>
  );
}

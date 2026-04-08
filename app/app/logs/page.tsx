import Link from 'next/link';
import type { Route } from 'next';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { Card, PageHeader } from '@/components/ui';

export default async function LogsPage() {
  const user = await requireUser();
  const logs = await prisma.dailyLog.findMany({ where: { venueId: user.venueId, isArchived: false }, orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <PageHeader title="Daily Logs" action={<Link href="/app/logs/new" className="rounded-md bg-accent px-4 py-2 text-sm">Add log</Link>} />
      <div className="space-y-3">
        {logs.map((log) => (
          <Link key={log.id} href={`/app/logs/${log.id}` as Route}>
            <Card className="hover:border-accent/50">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-medium">{log.title}</p>
                  <p className="text-xs text-muted">{new Date(log.createdAt).toLocaleString()} · {log.shiftType}</p>
                </div>
                <span className="rounded-full border border-white/20 px-2 py-1 text-xs">{log.priority}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

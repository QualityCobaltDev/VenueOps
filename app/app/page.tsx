import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { Card, PageHeader } from '@/components/ui';

export default async function DashboardPage() {
  const user = await requireUser();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);

  const [openChecklists, incidentsWeek, logsWeek] = await Promise.all([
    prisma.checklist.count({ where: { venueId: user.venueId, isArchived: false } }),
    prisma.incidentReport.count({ where: { venueId: user.venueId, createdAt: { gte: weekStart }, isArchived: false } }),
    prisma.dailyLog.count({ where: { venueId: user.venueId, createdAt: { gte: weekStart }, isArchived: false } }),
  ]);

  return (
    <div>
      <PageHeader title="Dashboard" description="Daily operational snapshot for your venue." />
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-muted">Open Checklists</p><p className="mt-2 text-3xl font-semibold">{openChecklists}</p></Card>
        <Card><p className="text-sm text-muted">Incidents this week</p><p className="mt-2 text-3xl font-semibold">{incidentsWeek}</p></Card>
        <Card><p className="text-sm text-muted">Daily logs this week</p><p className="mt-2 text-3xl font-semibold">{logsWeek}</p></Card>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Link href="/app/incidents/new" className="rounded-md border border-white/20 p-3 text-sm">New Incident Report</Link>
        <Link href="/app/logs/new" className="rounded-md border border-white/20 p-3 text-sm">Add Daily Log</Link>
        <Link href="/app/checklists" className="rounded-md border border-white/20 p-3 text-sm">Open Checklists</Link>
        <Link href="/app/templates" className="rounded-md border border-white/20 p-3 text-sm">View Templates</Link>
      </div>
    </div>
  );
}

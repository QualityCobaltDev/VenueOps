import Link from 'next/link';
import type { Route } from 'next';
import { IncidentCategory, Severity } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { Card, PageHeader, Select } from '@/components/ui';

export default async function IncidentsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const user = await requireUser();
  const category = params.category as IncidentCategory | undefined;
  const severity = params.severity as Severity | undefined;

  const incidents = await prisma.incidentReport.findMany({
    where: {
      venueId: user.venueId,
      isArchived: false,
      ...(category ? { category } : {}),
      ...(severity ? { severity } : {}),
    },
    orderBy: { occurredAt: 'desc' },
  });

  return (
    <div>
      <PageHeader title="Incident Reports" action={<Link href="/app/incidents/new" className="rounded-md bg-accent px-4 py-2 text-sm">New Incident</Link>} />
      <Card>
        <form className="grid gap-3 md:grid-cols-3">
          <Select name="category" defaultValue={category ?? ''}><option value="">All categories</option>{Object.values(IncidentCategory).map((v)=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}</Select>
          <Select name="severity" defaultValue={severity ?? ''}><option value="">All severities</option>{Object.values(Severity).map((v)=><option key={v} value={v}>{v}</option>)}</Select>
          <button className="rounded-md border border-white/20 px-3 py-2 text-sm">Apply Filters</button>
        </form>
      </Card>
      <div className="mt-4 space-y-3">
        {incidents.map((i) => (
          <Link key={i.id} href={`/app/incidents/${i.id}` as Route}>
            <Card className="hover:border-accent/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{i.title}</p>
                  <p className="text-xs text-muted">{new Date(i.occurredAt).toLocaleString()} · {i.category.replaceAll('_',' ')}</p>
                </div>
                <span className="rounded-full border border-white/20 px-2 py-1 text-xs">{i.severity}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

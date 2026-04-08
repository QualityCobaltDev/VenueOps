import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateIncidentAction } from '@/lib/actions';
import { Card, PageHeader } from '@/components/ui';
import { IncidentFormFields } from '@/components/incident-form';

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const incident = await prisma.incidentReport.findFirst({ where: { id, venueId: user.venueId, isArchived: false } });
  if (!incident) notFound();

  const submit = updateIncidentAction.bind(null, id);
  return (
    <div>
      <PageHeader title="Incident Details" description="Review and update report information." />
      <Card>
        <form action={submit} className="space-y-4">
          <IncidentFormFields incident={incident} />
          <button className="rounded-md bg-accent px-4 py-2 text-sm">Update report</button>
        </form>
      </Card>
    </div>
  );
}

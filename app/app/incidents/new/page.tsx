import { createIncidentAction } from '@/lib/actions';
import { Card, PageHeader } from '@/components/ui';
import { IncidentFormFields } from '@/components/incident-form';

export default function NewIncidentPage() {
  return (
    <div>
      <PageHeader title="New Incident Report" />
      <Card>
        <form
          action={async (formData) => {
            'use server';
            await createIncidentAction(formData);
          }}
          className="space-y-4"
        >
          <IncidentFormFields />
          <button className="rounded-md bg-accent px-4 py-2 text-sm">Save report</button>
        </form>
      </Card>
    </div>
  );
}

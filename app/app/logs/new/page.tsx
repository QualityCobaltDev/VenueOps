import { createDailyLogAction } from '@/lib/actions';
import { Card, PageHeader } from '@/components/ui';
import { DailyLogFields } from '@/components/log-form';

export default function NewLogPage() {
  return (
    <div>
      <PageHeader title="Add Daily Log" />
      <Card>
        <form action={createDailyLogAction} className="space-y-4">
          <DailyLogFields />
          <button className="rounded-md bg-accent px-4 py-2 text-sm">Save log</button>
        </form>
      </Card>
    </div>
  );
}

import { Priority, ShiftType } from '@prisma/client';
import { Label, Select, TextArea, TextInput } from '@/components/ui';

export function DailyLogFields({ log }: { log?: any }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="md:col-span-2"><Label>Title</Label><TextInput name="title" defaultValue={log?.title} required /></div>
      <div><Label>Shift type</Label><Select name="shiftType" defaultValue={log?.shiftType ?? ShiftType.EVENING}>{Object.values(ShiftType).map((v)=><option key={v} value={v}>{v}</option>)}</Select></div>
      <div><Label>Priority</Label><Select name="priority" defaultValue={log?.priority ?? Priority.NORMAL}>{Object.values(Priority).map((v)=><option key={v} value={v}>{v}</option>)}</Select></div>
      <div className="md:col-span-2"><Label>Body</Label><TextArea name="body" defaultValue={log?.body} required rows={5} /></div>
      <div><Label>Operational issues</Label><TextArea name="operationalIssues" defaultValue={log?.operationalIssues ?? ''} rows={3} /></div>
      <div><Label>Staffing notes</Label><TextArea name="staffingNotes" defaultValue={log?.staffingNotes ?? ''} rows={3} /></div>
      <div className="md:col-span-2"><Label>Revenue notes</Label><TextArea name="revenueNotes" defaultValue={log?.revenueNotes ?? ''} rows={3} /></div>
      <label className="md:col-span-2 flex items-center gap-2 text-sm"><input type="checkbox" name="followUpNeeded" defaultChecked={log?.followUpNeeded ?? false} /> Follow-up needed</label>
    </div>
  );
}

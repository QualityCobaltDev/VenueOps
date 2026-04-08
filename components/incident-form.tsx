import { IncidentCategory, Severity } from '@prisma/client';
import { Label, Select, TextArea, TextInput } from '@/components/ui';

export function IncidentFormFields({ incident }: { incident?: any }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="md:col-span-2"><Label>Incident title</Label><TextInput name="title" defaultValue={incident?.title} required /></div>
      <div><Label>Date & Time</Label><TextInput type="datetime-local" name="occurredAt" defaultValue={incident ? new Date(incident.occurredAt).toISOString().slice(0,16) : ''} required /></div>
      <div><Label>Location in venue</Label><TextInput name="location" defaultValue={incident?.location ?? ''} /></div>
      <div><Label>Category</Label><Select name="category" defaultValue={incident?.category ?? IncidentCategory.CUSTOMER_ISSUE}>{Object.values(IncidentCategory).map((v)=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}</Select></div>
      <div><Label>Severity</Label><Select name="severity" defaultValue={incident?.severity ?? Severity.LOW}>{Object.values(Severity).map((v)=><option key={v} value={v}>{v}</option>)}</Select></div>
      <div className="md:col-span-2"><Label>People involved</Label><TextInput name="peopleInvolved" defaultValue={incident?.peopleInvolved ?? ''} /></div>
      <div className="md:col-span-2"><Label>Description</Label><TextArea name="description" defaultValue={incident?.description} required rows={4} /></div>
      <div className="md:col-span-2"><Label>Action taken</Label><TextArea name="actionTaken" defaultValue={incident?.actionTaken ?? ''} rows={3} /></div>
      <div className="md:col-span-2 flex items-center gap-2"><input type="checkbox" name="followUpRequired" defaultChecked={incident?.followUpRequired ?? false} /> <span className="text-sm">Follow-up required</span></div>
      <div className="md:col-span-2"><Label>Follow-up notes</Label><TextArea name="followUpNotes" defaultValue={incident?.followUpNotes ?? ''} rows={3} /></div>
    </div>
  );
}

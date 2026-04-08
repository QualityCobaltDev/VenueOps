import Link from 'next/link';
import { Card } from '@/components/ui';

const painPoints = [
  'Opening tasks are missed',
  'Closing checks are forgotten',
  'Incidents are logged inconsistently',
  'Managers rely on paper notes and WhatsApp',
  'No accountability between shifts',
  'Handover quality drops when things get busy',
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-panel to-bg p-8">
        <h1 className="text-4xl font-semibold">Stop Losing Money to Poor Venue Operations</h1>
        <p className="mt-4 max-w-2xl text-muted">Venue Ops helps bars, restaurants, and nightlife teams manage daily checklists, incident reports, and manager logs in one place.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/signup" className="rounded-md bg-accent px-4 py-2 text-sm font-medium">Start Free Trial</Link>
          <Link href="/signin" className="rounded-md border border-white/20 px-4 py-2 text-sm">Sign In</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        {painPoints.map((item) => (
          <Card key={item}><p>{item}</p></Card>
        ))}
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-4">
        {['Daily Checklists', 'Incident Reports', 'Manager Logs', 'Ready-to-Use Templates'].map((f) => (
          <Card key={f}><p className="font-medium">{f}</p></Card>
        ))}
      </section>

      <section className="mt-12">
        <Card className="max-w-md">
          <p className="text-sm text-muted">Early Access Plan</p>
          <p className="mt-2 text-3xl font-semibold">$99/mo</p>
          <p className="mt-2 text-sm text-muted">One venue. Unlimited core operations usage.</p>
          <Link href="/signup" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium">Start 7-Day Trial</Link>
        </Card>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-muted">© {new Date().getFullYear()} Venue Ops</footer>
    </main>
  );
}

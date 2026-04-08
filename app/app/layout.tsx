import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { signOutAction } from '@/lib/actions';

const nav = [
  { href: '/app', label: 'Dashboard' },
  { href: '/app/checklists', label: 'Checklists' },
  { href: '/app/incidents', label: 'Incident Reports' },
  { href: '/app/logs', label: 'Daily Logs' },
  { href: '/app/templates', label: 'Templates' },
  { href: '/app/settings', label: 'Settings' },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-white/10 bg-panel p-4 md:block">
        <p className="text-lg font-semibold">Venue Ops</p>
        <p className="mt-1 text-xs text-muted">{user.venue.name}</p>
        <nav className="mt-6 space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm text-white hover:bg-white/10">{item.label}</Link>
          ))}
        </nav>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm md:hidden">Venue Ops</p>
          <p className="text-sm text-muted">{user.fullName}</p>
          <form action={signOutAction}><button className="rounded-md border border-white/20 px-3 py-1 text-sm">Logout</button></form>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}

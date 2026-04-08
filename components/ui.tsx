import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-xl border border-white/10 bg-panel p-4', className)}>{children}</div>;
}

export function Button({ className, children, type = 'button' }: { className?: string; children: React.ReactNode; type?: 'button' | 'submit' }) {
  return <button type={type} className={cn('rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90', className)}>{children}</button>;
}

export function SecondaryButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn('inline-flex rounded-md border border-white/20 px-3 py-2 text-sm text-white', className)}>{children}</span>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full rounded-md border border-white/20 bg-bg px-3 py-2 text-sm text-white outline-none focus:border-accent', props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('w-full rounded-md border border-white/20 bg-bg px-3 py-2 text-sm text-white outline-none focus:border-accent', props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn('w-full rounded-md border border-white/20 bg-bg px-3 py-2 text-sm text-white outline-none focus:border-accent', props.className)} />;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-sm text-white">{children}</label>;
}

export function LinkButton({ href, children }: { href: Route; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">{children}</Link>;
}

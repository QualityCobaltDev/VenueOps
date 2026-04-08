import Link from 'next/link';
import { Card } from '@/components/ui';
import { SignInForm } from '@/components/auth-forms';

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <Card className="w-full">
        <h1 className="mb-1 text-xl font-semibold">Sign in to Venue Ops</h1>
        <p className="mb-4 text-sm text-muted">Access your operations dashboard.</p>
        <SignInForm />
        <p className="mt-4 text-sm text-muted">No account? <Link href="/signup" className="text-accent">Create one</Link></p>
      </Card>
    </main>
  );
}

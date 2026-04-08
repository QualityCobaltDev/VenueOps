import Link from 'next/link';
import { Card } from '@/components/ui';
import { SignUpForm } from '@/components/auth-forms';

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <Card className="w-full">
        <h1 className="mb-1 text-xl font-semibold">Create your Venue Ops account</h1>
        <p className="mb-4 text-sm text-muted">Start your 7-day trial.</p>
        <SignUpForm />
        <p className="mt-4 text-sm text-muted">Already have an account? <Link href="/signin" className="text-accent">Sign in</Link></p>
      </Card>
    </main>
  );
}

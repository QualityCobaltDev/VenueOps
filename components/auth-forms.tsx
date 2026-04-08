'use client';

import { useActionState } from 'react';
import { signInAction, signUpAction } from '@/lib/actions';
import { Button, Label, TextInput } from '@/components/ui';

const initial = { error: '' };

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initial);
  return (
    <form action={formAction} className="space-y-4">
      <div><Label>Email</Label><TextInput name="email" type="email" required /></div>
      <div><Label>Password</Label><TextInput name="password" type="password" required /></div>
      {state?.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      <Button type="submit" className="w-full">{pending ? 'Signing in...' : 'Sign In'}</Button>
    </form>
  );
}

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initial);
  return (
    <form action={formAction} className="space-y-4">
      <div><Label>Full name</Label><TextInput name="fullName" required /></div>
      <div><Label>Email</Label><TextInput name="email" type="email" required /></div>
      <div><Label>Password</Label><TextInput name="password" type="password" required /></div>
      <div><Label>Venue name</Label><TextInput name="venueName" required /></div>
      {state?.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      <Button type="submit" className="w-full">{pending ? 'Creating account...' : 'Start Free Trial'}</Button>
    </form>
  );
}

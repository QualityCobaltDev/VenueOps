import { changePasswordAction, updateProfileAction, updateVenueAction } from '@/lib/actions';
import { requireUser } from '@/lib/auth';
import { Card, Label, PageHeader, TextInput } from '@/components/ui';

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your profile, venue details, and account security." />

      <Card>
        <h2 className="mb-3 font-medium">Profile</h2>
        <form
          action={async (formData) => {
            'use server';
            await updateProfileAction(formData);
          }}
          className="grid gap-3 md:max-w-xl"
        >
          <div><Label>Full name</Label><TextInput name="fullName" defaultValue={user.fullName} required /></div>
          <div><Label>Email</Label><TextInput type="email" name="email" defaultValue={user.email} required /></div>
          <button className="rounded-md bg-accent px-4 py-2 text-sm md:w-fit">Save profile</button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 font-medium">Venue details</h2>
        <form
          action={async (formData) => {
            'use server';
            await updateVenueAction(formData);
          }}
          className="grid gap-3 md:max-w-xl"
        >
          <div><Label>Venue name</Label><TextInput name="name" defaultValue={user.venue.name} required /></div>
          <button className="rounded-md bg-accent px-4 py-2 text-sm md:w-fit">Save venue</button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 font-medium">Password</h2>
        <form
          action={async (formData) => {
            'use server';
            await changePasswordAction(formData);
          }}
          className="grid gap-3 md:max-w-xl"
        >
          <div><Label>Current password</Label><TextInput type="password" name="currentPassword" required /></div>
          <div><Label>New password</Label><TextInput type="password" name="newPassword" required /></div>
          <div><Label>Confirm new password</Label><TextInput type="password" name="confirmPassword" required /></div>
          <button className="rounded-md bg-accent px-4 py-2 text-sm md:w-fit">Change password</button>
        </form>
      </Card>
    </div>
  );
}

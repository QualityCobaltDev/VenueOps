import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venue Ops',
  description: 'Operational management SaaS for hospitality venues.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

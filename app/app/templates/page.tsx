import Link from 'next/link';
import { TemplateCategory } from '@prisma/client';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, PageHeader, Select } from '@/components/ui';

export default async function TemplatesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const user = await requireUser();
  const category = params.category as TemplateCategory | undefined;

  const templates = await prisma.templateResource.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
      OR: [{ venueId: null }, { venueId: user.venueId }],
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <PageHeader title="Templates Library" description="Operational resources ready for immediate use." />
      <Card>
        <form className="flex gap-2">
          <Select name="category" defaultValue={category ?? ''}>
            <option value="">All categories</option>
            {Object.values(TemplateCategory).map((v)=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}
          </Select>
          <button className="rounded-md border border-white/20 px-3 py-2 text-sm">Filter</button>
        </form>
      </Card>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id}>
            <p className="font-medium">{template.title}</p>
            <p className="mt-1 text-sm text-muted">{template.description}</p>
            <p className="mt-2 text-xs text-muted">{template.category.replaceAll('_',' ')}</p>
            <Link href={template.fileUrl} className="mt-3 inline-flex rounded-md border border-white/20 px-3 py-2 text-sm" target="_blank">Download</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

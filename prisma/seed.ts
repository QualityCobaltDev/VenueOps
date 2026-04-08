import { PrismaClient, ChecklistType, TemplateCategory } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@venueops.app';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const venue = await prisma.venue.create({ data: { name: 'Demo Night Lounge' } });
  const passwordHash = await hash('DemoPass123!', 12);

  await prisma.user.create({
    data: {
      fullName: 'Demo Manager',
      email,
      passwordHash,
      venueId: venue.id,
    },
  });

  await prisma.checklist.create({
    data: {
      venueId: venue.id,
      title: 'Opening Floor Checklist',
      type: ChecklistType.OPENING,
      description: 'Core opening checks before doors open.',
      items: {
        create: [
          { label: 'Till count verified', sortOrder: 1, isRequired: true },
          { label: 'POS terminals tested', sortOrder: 2, isRequired: true },
          { label: 'Entryway safety sweep complete', sortOrder: 3, isRequired: true },
        ],
      },
    },
  });

  await prisma.templateResource.createMany({
    data: [
      {
        title: 'Incident Follow-Up SOP',
        description: 'Standard process for post-incident escalation and documentation.',
        category: TemplateCategory.SOPS,
        fileUrl: '/templates/incident-follow-up-sop.pdf',
        isPublished: true,
      },
      {
        title: 'Weekly Stock Variance Tracker',
        description: 'Track opening/closing variances to reduce shrinkage.',
        category: TemplateCategory.STOCK_CONTROL,
        fileUrl: '/templates/stock-variance-tracker.csv',
        isPublished: true,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

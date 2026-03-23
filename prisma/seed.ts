import { PrismaClient, FundStatus, InvestorType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // 1. Create a Fund
  const growthFund = await prisma.fund.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440000' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Titanbay Growth Fund I',
      vintage_year: 2024,
      target_size_usd: 250000000.00,
      status: FundStatus.Fundraising,
      created_at: new Date('2024-01-15T10:30:00Z'),
    },
  });

  // 2. Create an Investor
  const goldmanSachs = await prisma.investor.upsert({
    where: { email: 'investments@gsam.com' },
    update: {},
    create: {
      id: '770e8400-e29b-41d4-a716-446655440002',
      name: 'Goldman Sachs Asset Management',
      investor_type: InvestorType.Institution,
      email: 'investments@gsam.com',
      created_at: new Date('2024-02-10T09:15:00Z'),
    },
  });

  // 3. Create an Investment (Linking the two)
  await prisma.investment.upsert({
    where: { id: '990e8400-e29b-41d4-a716-446655440004' },
    update: {},
    create: {
      id: '990e8400-e29b-41d4-a716-446655440004',
      fund_id: growthFund.id,
      investor_id: goldmanSachs.id,
      amount_usd: 50000000.00,
      investment_date: new Date('2024-03-15'),
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

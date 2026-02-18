/**
 * Quick health check: can we connect to the database (Supabase)?
 * Run from backend: node scripts/check-database.js
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking database connection...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env');
    process.exit(1);
  }

  // Hide password in logs - show only host and user
  const url = new URL(process.env.DATABASE_URL);
  const safeUrl = `${url.protocol}//${url.username}@${url.hostname}:${url.port}${url.pathname}${url.search}`;
  console.log('Using:', safeUrl);
  console.log('');

  try {
    // 1. Raw SQL connection test
    await prisma.$queryRaw`SELECT 1 as ok`;
    console.log('✅ Connection: OK (database responded)');

    // 2. Check if our tables exist (Prisma will error if schema not applied)
    const userCount = await prisma.user.count();
    console.log('✅ Schema: OK (users table exists)');
    console.log(`   Users in DB: ${userCount}`);

    const companyCount = await prisma.company.count();
    const internCount = await prisma.intern.count();
    const jobCount = await prisma.job.count();
    console.log(`   Companies: ${companyCount}, Interns: ${internCount}, Jobs: ${jobCount}`);

    console.log('\n✅ Supabase database is working.');
  } catch (error) {
    console.error('\n❌ Database check failed:\n');
    console.error(error.message);
    if (error.meta) console.error('Meta:', error.meta);
    if (error.code) console.error('Code:', error.code);
    process.exit(1);
  }
}

main()
  .finally(() => prisma.$disconnect());

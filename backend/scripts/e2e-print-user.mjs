import prisma from '../src/utils/db.js';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/e2e-print-user.mjs <email>');
  process.exit(1);
}

const user = await prisma.user.findUnique({
  where: { email },
  select: { verificationToken: true, isEmailVerified: true },
});

console.log(JSON.stringify(user));
await prisma.$disconnect();

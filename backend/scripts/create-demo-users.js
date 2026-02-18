import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const PASSWORD = 'password123';

async function main() {
  console.log('Creating demo users...');

  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  // Create company user
  const existingCompany = await prisma.user.findUnique({
    where: { email: 'company@easyintern.demo' },
  });
  if (existingCompany) {
    console.log('Company user already exists: company@easyintern.demo');
  } else {
    await prisma.user.create({
      data: {
        email: 'company@easyintern.demo',
        password: hashedPassword,
        userType: 'COMPANY',
        company: {
          create: {
            name: 'Demo Company',
            description: 'A demo company for testing EasyIntern.',
            industry: 'Technology',
            location: 'Accra, Ghana',
          },
        },
      },
    });
    console.log('Created company user: company@easyintern.demo');
  }

  // Create intern user
  const existingIntern = await prisma.user.findUnique({
    where: { email: 'intern@easyintern.demo' },
  });
  if (existingIntern) {
    console.log('Intern user already exists: intern@easyintern.demo');
  } else {
    await prisma.user.create({
      data: {
        email: 'intern@easyintern.demo',
        password: hashedPassword,
        userType: 'INTERN',
        intern: {
          create: {
            firstName: 'Demo',
            lastName: 'Intern',
            bio: 'Demo intern profile for testing EasyIntern.',
            skills: ['JavaScript', 'React', 'Node.js'],
            education: 'BSc Computer Science',
            location: 'Accra, Ghana',
          },
        },
      },
    });
    console.log('Created intern user: intern@easyintern.demo');
  }

  console.log('\nDone! You can log in with:');
  console.log('  Company: company@easyintern.demo / password123');
  console.log('  Intern:  intern@easyintern.demo / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

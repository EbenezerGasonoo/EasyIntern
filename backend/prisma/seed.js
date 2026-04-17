import bcrypt from 'bcryptjs';
import prisma from '../src/utils/db.js';

const DEMO_PASSWORD = 'DemoEasy2026!';

const COMPANY_COUNT = 50;
const INTERN_COUNT = 50;

const demoResponsibilities = (title) => [
  `Support delivery and team goals for ${title} as assigned.`,
  'Attend weekly team syncs and document learnings.',
  'Collaborate with mentors and follow internal processes.',
];

const demoBenefits = () => [
  'Mentorship and structured onboarding',
  'Feedback on deliverables',
  'Certificate of completion (where applicable)',
];

const INDUSTRIES = [
  { key: 'Technology', roles: ['Software Engineering Intern', 'QA / Test Intern', 'DevOps Intern'] },
  { key: 'Banking & Finance', roles: ['Finance & Reporting Intern', 'Risk Analyst Intern'] },
  { key: 'Healthcare', roles: ['Healthcare Operations Intern', 'Community Health Intern'] },
  { key: 'Food & Beverage', roles: ['Supply Chain Intern', 'Quality Assurance Intern'] },
  { key: 'Education', roles: ['STEM Outreach Intern', 'Learning Content Intern'] },
  { key: 'Media & Marketing', roles: ['Content Marketing Intern', 'Social Media Intern'] },
  { key: 'Energy', roles: ['Field Operations Intern', 'Sustainability Intern'] },
  { key: 'Retail', roles: ['Merchandising Intern', 'Customer Experience Intern'] },
];

const LOCATIONS = [
  'Accra, Greater Accra',
  'Kumasi, Ashanti Region',
  'Tema, Greater Accra',
  'Cape Coast, Central Region',
  'Takoradi, Western Region',
];

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '200+'];

const FIRST_NAMES = [
  'Ama', 'Kofi', 'Akosua', 'Yaw', 'Efua', 'Kwame', 'Abena', 'Kwabena', 'Adwoa', 'Kojo',
  'Afi', 'Fiifi', 'Maame', 'Nana', 'Esi', 'Kwesi', 'Aba', 'Kweku', 'Afua', 'Paa',
  'Ato', 'Yaa', 'Nii', 'Akua', 'Aba', 'Esi', 'Kojo', 'Ama', 'Yaw', 'Akosua',
  'Efua', 'Kwesi', 'Adwoa', 'Kofi', 'Ama', 'Kwame', 'Abena', 'Fiifi', 'Maame', 'Nana',
  'Afi', 'Kweku', 'Akua', 'Yaw', 'Esi', 'Kojo', 'Akosua', 'Efua', 'Kwabena', 'Adwoa',
];

const LAST_NAMES = [
  'Serwaa', 'Asante', 'Owusu', 'Boateng', 'Mensah', 'Antwi', 'Darko', 'Agyeman', 'Osei', 'Appiah',
  'Quaye', 'Ntiamoah', 'Adjei', 'Ofori', 'Tetteh', 'Sarpong', 'Amponsah', 'Bonsu', 'Frimpong', 'Annan',
  'Yeboah', 'Koomson', 'Acheampong', 'Danquah', 'Adu', 'Boadi', 'Kwarteng', 'Agyei', 'Sarpong', 'Osei',
  'Mensah', 'Owusu', 'Boateng', 'Antwi', 'Darko', 'Quaye', 'Adjei', 'Tetteh', 'Frimpong', 'Yeboah',
  'Koomson', 'Danquah', 'Adu', 'Boadi', 'Agyei', 'Ntiamoah', 'Ofori', 'Amponsah', 'Bonsu', 'Annan',
];

const SKILL_POOLS = [
  ['JavaScript', 'React', 'Git', 'Node.js'],
  ['Python', 'SQL', 'Excel', 'Data Analysis'],
  ['Marketing', 'Social Media', 'Content Creation', 'Copywriting'],
  ['Excel', 'Financial Analysis', 'Accounting'],
  ['Operations', 'Microsoft Office', 'Customer Service'],
  ['STEM', 'Teaching', 'Communication'],
  ['Figma', 'UX Research', 'Prototyping'],
  ['Supply Chain', 'Logistics', 'Inventory'],
];

function pad2(n) {
  return String(n).padStart(2, '0');
}

function buildJobForCompany(index1Based) {
  const i = index1Based - 1;
  const ind = INDUSTRIES[i % INDUSTRIES.length];
  const title = ind.roles[i % ind.roles.length];
  const location = LOCATIONS[i % LOCATIONS.length];
  const remote = i % 3 === 0;
  const stipends = ['GHS 900/month', 'GHS 1,200/month', 'GHS 1,500/month', 'GHS 1,800/month'];
  const durations = ['3 months', '4 months', '6 months'];

  return {
    title: `${title} (${pad2(index1Based)})`,
    description: `Hands-on internship with our ${ind.key} team. You will learn processes, tools, and contribute to real deliverables with mentor support.`,
    requirements: ['Strong communication', 'Reliability', 'Willingness to learn', 'Team collaboration'],
    responsibilities: demoResponsibilities(title),
    benefits: demoBenefits(),
    location,
    remote,
    duration: durations[i % durations.length],
    stipend: stipends[i % stipends.length],
    skills: SKILL_POOLS[i % SKILL_POOLS.length],
  };
}

function buildCompanies() {
  const list = [];
  const namePrefixes = [
    'Northstar', 'Greenfield', 'Summit', 'Harbor', 'Cedar', 'Bluewave', 'Atlas', 'Vertex', 'Lumen', 'Stride',
    'Keystone', 'Meridian', 'Pioneer', 'Horizon', 'Catalyst', 'Nimbus', 'Apex', 'Granite', 'Solstice', 'Echo',
    'Silverline', 'Redwood', 'Ironwood', 'Clearwater', 'Highland', 'Fairview', 'Oakridge', 'Sundial', 'Moonrise', 'Daybreak',
  ];
  const nameSuffixes = [
    'Labs', 'Partners', 'Holdings', 'Solutions', 'Group', 'Ventures', 'Works', 'Systems', 'Services', 'Industries',
  ];

  for (let n = 1; n <= COMPANY_COUNT; n += 1) {
    const i = n - 1;
    const email = `demo-company-${pad2(n)}@easyintern.app`;
    const name = `${namePrefixes[i % namePrefixes.length]} ${nameSuffixes[(i * 3) % nameSuffixes.length]} #${pad2(n)}`;
    const ind = INDUSTRIES[i % INDUSTRIES.length];
    const jobs = [buildJobForCompany(n)];
    if (n % 2 === 0) {
      const secondTitle = ind.roles[(i + 1) % ind.roles.length];
      jobs.push({
        title: `${secondTitle} (${pad2(n)}b)`,
        description: `Additional internship track for ${name} — shadow senior staff and own small projects end-to-end.`,
        requirements: ['Organized', 'Curious', 'Professional writing', 'Basic tooling'],
        responsibilities: demoResponsibilities(secondTitle),
        benefits: demoBenefits(),
        location: LOCATIONS[(i + 1) % LOCATIONS.length],
        remote: i % 2 === 1,
        duration: '4 months',
        stipend: 'GHS 1,300/month',
        skills: SKILL_POOLS[(i + 3) % SKILL_POOLS.length],
      });
    }

    list.push({
      email,
      name,
      description: `${name} operates in ${ind.key.toLowerCase()} with a focus on quality, learning culture, and intern development.`,
      website: 'https://easyintern.app',
      industry: ind.key,
      location: LOCATIONS[i % LOCATIONS.length],
      companySize: COMPANY_SIZES[i % COMPANY_SIZES.length],
      jobs,
    });
  }
  return list;
}

function buildInterns() {
  const list = [];
  for (let n = 1; n <= INTERN_COUNT; n += 1) {
    const i = n - 1;
    const email = `demo-intern-${pad2(n)}@easyintern.app`;
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 5 + 7) % LAST_NAMES.length];
    const ind = INDUSTRIES[i % INDUSTRIES.length];
    list.push({
      email,
      firstName,
      lastName,
      studentId: `EI-DEMO-${pad2(n)}`,
      bio: `${ind.key}-focused student eager to learn on the job. Strong work ethic, teamwork, and communication.`,
      skills: SKILL_POOLS[i % SKILL_POOLS.length],
      education: 'BSc — related field',
      location: LOCATIONS[i % LOCATIONS.length],
      preferredIndustry: ind.key,
    });
  }
  return list;
}

async function ensureUserCompany({
  email,
  name,
  description,
  industry,
  location,
  companySize,
  website,
  jobs,
}) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`⏭️  Skip company (exists): ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      userType: 'COMPANY',
      isEmailVerified: true,
      company: {
        create: {
          name,
          description,
          website,
          industry,
          location,
          companySize,
          contactEmail: email,
          internIntake: '10–40 per year',
          isVerified: true,
        },
      },
    },
  });

  const company = await prisma.company.findFirst({ where: { user: { email } } });

  for (const j of jobs) {
    await prisma.job.create({
      data: {
        companyId: company.id,
        title: j.title,
        description: j.description,
        requirements: j.requirements,
        responsibilities: j.responsibilities,
        benefits: j.benefits,
        location: j.location,
        remote: j.remote,
        duration: j.duration,
        stipend: j.stipend,
        skills: j.skills,
      },
    });
  }

  console.log(`✅ Demo company + jobs: ${name}`);
}

async function ensureIntern({
  email,
  firstName,
  lastName,
  studentId,
  bio,
  skills,
  education,
  location,
  preferredIndustry,
}) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`⏭️  Skip intern (exists): ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      userType: 'INTERN',
      isEmailVerified: true,
      intern: {
        create: {
          firstName,
          lastName,
          studentId,
          bio,
          skills,
          education,
          educationWebsite: null,
          experience: null,
          location,
          preferredIndustry,
          notifyIndustryJobs: true,
        },
      },
    },
  });

  console.log(`✅ Demo intern: ${firstName} ${lastName}`);
}

async function seedDemoApplications() {
  const jobs = await prisma.job.findMany({
    where: {
      company: {
        user: { email: { startsWith: 'demo-company-' } },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const internRecords = await prisma.intern.findMany({
    where: { user: { email: { startsWith: 'demo-intern-' } } },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });

  if (jobs.length === 0 || internRecords.length === 0) {
    console.log('⏭️  Skip applications (no demo jobs or interns)');
    return;
  }

  let created = 0;
  const maxApps = 80;

  outer: for (let i = 0; i < internRecords.length; i += 1) {
    for (let j = 0; j < jobs.length; j += 1) {
      if (created >= maxApps) break outer;
      const intern = internRecords[i];
      const job = jobs[(i + j) % jobs.length];
      const already = await prisma.application.findFirst({
        where: { jobId: job.id, internId: intern.id },
      });
      if (already) continue;

      await prisma.application.create({
        data: {
          jobId: job.id,
          internId: intern.id,
          status: created % 6 === 0 ? 'REVIEWED' : 'PENDING',
          coverLetter: 'Demo application generated for EasyIntern showcase.',
        },
      });
      created += 1;
    }
  }

  console.log(`✅ Demo applications created (new pairs): ${created}`);
}

async function main() {
  console.log(`🌱 Seeding demo data: ${COMPANY_COUNT} companies, ${INTERN_COUNT} interns (idempotent by email)...`);

  const companies = buildCompanies();
  const interns = buildInterns();

  for (const c of companies) {
    await ensureUserCompany(c);
  }

  for (const i of interns) {
    await ensureIntern(i);
  }

  await seedDemoApplications();

  console.log('\n🎉 Demo seed done.');
  console.log(`\n🔑 Login for demo accounts (password for all): ${DEMO_PASSWORD}`);
  console.log(`   Companies: demo-company-01 … demo-company-${pad2(COMPANY_COUNT)}@easyintern.app`);
  console.log(`   Interns: demo-intern-01 … demo-intern-${pad2(INTERN_COUNT)}@easyintern.app`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

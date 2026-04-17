import bcrypt from 'bcryptjs';
import prisma from '../src/utils/db.js';

const DEMO_PASSWORD = 'DemoEasy2026!';

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

async function main() {
  console.log('🌱 Seeding demo data (idempotent by email @easyintern.app)...');

  const companies = [
    {
      email: 'demo-company-tech@easyintern.app',
      name: 'TechBridge Ghana',
      description: 'Product and engineering studio building tools for SMEs across West Africa.',
      website: 'https://easyintern.app',
      industry: 'Technology',
      location: 'Accra, Greater Accra',
      companySize: '11–50',
      jobs: [
        {
          title: 'Frontend Engineering Intern',
          description: 'Ship UI components in React, work with design handoffs, and improve accessibility.',
          requirements: ['React basics', 'HTML/CSS', 'Git', 'Good communication'],
          responsibilities: demoResponsibilities('Frontend Engineering Intern'),
          benefits: demoBenefits(),
          location: 'Accra, Greater Accra',
          remote: true,
          duration: '6 months',
          stipend: 'GHS 1,500/month',
          skills: ['JavaScript', 'React', 'CSS', 'Git'],
        },
        {
          title: 'Product Design Intern',
          description: 'Support UX research, wireframes, and prototype testing with product stakeholders.',
          requirements: ['Figma basics', 'User empathy', 'Documentation'],
          responsibilities: demoResponsibilities('Product Design Intern'),
          benefits: demoBenefits(),
          location: 'Accra, Greater Accra',
          remote: false,
          duration: '4 months',
          stipend: 'GHS 1,200/month',
          skills: ['Figma', 'UX Research', 'Prototyping'],
        },
      ],
    },
    {
      email: 'demo-company-finance@easyintern.app',
      name: 'Summit Capital',
      description: 'Financial services advisory firm focused on SMEs and startups.',
      website: 'https://easyintern.app',
      industry: 'Banking & Finance',
      location: 'Accra, Greater Accra',
      companySize: '51–200',
      jobs: [
        {
          title: 'Finance & Reporting Intern',
          description: 'Assist with monthly reporting, variance analysis, and spreadsheet hygiene.',
          requirements: ['Excel', 'Attention to detail', 'Finance coursework'],
          responsibilities: demoResponsibilities('Finance & Reporting Intern'),
          benefits: demoBenefits(),
          location: 'Accra, Greater Accra',
          remote: false,
          duration: '6 months',
          stipend: 'GHS 1,600/month',
          skills: ['Excel', 'Financial Analysis', 'Accounting'],
        },
      ],
    },
    {
      email: 'demo-company-health@easyintern.app',
      name: 'WellCare Clinics',
      description: 'Community health network providing clinics and outreach programs.',
      website: 'https://easyintern.app',
      industry: 'Healthcare',
      location: 'Kumasi, Ashanti Region',
      companySize: '51–200',
      jobs: [
        {
          title: 'Healthcare Operations Intern',
          description: 'Support scheduling, patient flow, and inventory coordination for clinics.',
          requirements: ['Organization', 'Communication', 'Basic computer skills'],
          responsibilities: demoResponsibilities('Healthcare Operations Intern'),
          benefits: demoBenefits(),
          location: 'Kumasi, Ashanti Region',
          remote: false,
          duration: '3 months',
          stipend: 'GHS 1,000/month',
          skills: ['Operations', 'Microsoft Office', 'Customer Service'],
        },
      ],
    },
    {
      email: 'demo-company-fmcg@easyintern.app',
      name: 'FreshLine Foods',
      description: 'Food distribution and cold-chain logistics partner for retail brands.',
      website: 'https://easyintern.app',
      industry: 'Food & Beverage',
      location: 'Tema, Greater Accra',
      companySize: '11–50',
      jobs: [
        {
          title: 'Supply Chain Intern',
          description: 'Track inventory, routes, and vendor KPIs with the operations team.',
          requirements: ['Logistics interest', 'Excel', 'Problem solving'],
          responsibilities: demoResponsibilities('Supply Chain Intern'),
          benefits: demoBenefits(),
          location: 'Tema, Greater Accra',
          remote: false,
          duration: '4 months',
          stipend: 'GHS 1,100/month',
          skills: ['Supply Chain', 'Logistics', 'Excel'],
        },
      ],
    },
    {
      email: 'demo-company-edu@easyintern.app',
      name: 'BrightPath Academy',
      description: 'Education nonprofit supporting STEM programs and career readiness.',
      website: 'https://easyintern.app',
      industry: 'Education',
      location: 'Cape Coast, Central Region',
      companySize: '1–10',
      jobs: [
        {
          title: 'STEM Outreach Intern',
          description: 'Coordinate workshops, materials, and student engagement for STEM programs.',
          requirements: ['STEM background', 'Presentation skills', 'Reliability'],
          responsibilities: demoResponsibilities('STEM Outreach Intern'),
          benefits: demoBenefits(),
          location: 'Cape Coast, Central Region',
          remote: false,
          duration: '3 months',
          stipend: 'GHS 800/month',
          skills: ['STEM', 'Teaching', 'Communication'],
        },
      ],
    },
    {
      email: 'demo-company-media@easyintern.app',
      name: 'Pulse Media Studio',
      description: 'Content studio producing short-form video and digital campaigns.',
      website: 'https://easyintern.app',
      industry: 'Media & Marketing',
      location: 'Accra, Greater Accra',
      companySize: '11–50',
      jobs: [
        {
          title: 'Content Marketing Intern',
          description: 'Draft scripts, edit captions, and support campaign analytics.',
          requirements: ['Writing', 'Social media basics', 'Creativity'],
          responsibilities: demoResponsibilities('Content Marketing Intern'),
          benefits: demoBenefits(),
          location: 'Accra, Greater Accra',
          remote: true,
          duration: '4 months',
          stipend: 'GHS 1,400/month',
          skills: ['Marketing', 'Content Writing', 'Copywriting'],
        },
      ],
    },
  ];

  const interns = [
    {
      email: 'demo-intern-01@easyintern.app',
      firstName: 'Ama',
      lastName: 'Serwaa',
      studentId: 'EI-DEMO-0001',
      bio: 'Computer Science student focused on web and mobile. Loves clean UI and strong documentation.',
      skills: ['JavaScript', 'React', 'Node.js', 'Git'],
      education: 'BSc Computer Science',
      location: 'Kumasi, Ashanti Region',
      preferredIndustry: 'Technology',
    },
    {
      email: 'demo-intern-02@easyintern.app',
      firstName: 'Kofi',
      lastName: 'Asante',
      studentId: 'EI-DEMO-0002',
      bio: 'Finance and analytics enthusiast with strong Excel skills and attention to detail.',
      skills: ['Excel', 'Financial Analysis', 'Accounting'],
      education: 'BSc Finance',
      location: 'Accra, Greater Accra',
      preferredIndustry: 'Banking & Finance',
    },
    {
      email: 'demo-intern-03@easyintern.app',
      firstName: 'Akosua',
      lastName: 'Owusu',
      studentId: 'EI-DEMO-0003',
      bio: 'Marketing student with experience in social media and campaign storytelling.',
      skills: ['Marketing', 'Social Media', 'Content Creation'],
      education: 'BSc Marketing',
      location: 'Accra, Greater Accra',
      preferredIndustry: 'Media & Marketing',
    },
    {
      email: 'demo-intern-04@easyintern.app',
      firstName: 'Yaw',
      lastName: 'Boateng',
      studentId: 'EI-DEMO-0004',
      bio: 'Full-stack developer building APIs and small business tools.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      education: 'BSc Software Engineering',
      location: 'Accra, Greater Accra',
      preferredIndustry: 'Technology',
    },
    {
      email: 'demo-intern-05@easyintern.app',
      firstName: 'Efua',
      lastName: 'Mensah',
      studentId: 'EI-DEMO-0005',
      bio: 'Operations and logistics student interested in supply chain optimization.',
      skills: ['Operations', 'Microsoft Office', 'Customer Service'],
      education: 'BSc Business Administration',
      location: 'Tema, Greater Accra',
      preferredIndustry: 'Food & Beverage',
    },
    {
      email: 'demo-intern-06@easyintern.app',
      firstName: 'Kwame',
      lastName: 'Antwi',
      studentId: 'EI-DEMO-0006',
      bio: 'Passionate about STEM education and workshop facilitation.',
      skills: ['STEM', 'Teaching', 'Communication'],
      education: 'BSc Mathematics',
      location: 'Cape Coast, Central Region',
      preferredIndustry: 'Education',
    },
    {
      email: 'demo-intern-07@easyintern.app',
      firstName: 'Ama',
      lastName: 'Darko',
      studentId: 'EI-DEMO-0007',
      bio: 'Data-focused student with strong SQL and Python fundamentals.',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      education: 'BSc Statistics',
      location: 'Kumasi, Ashanti Region',
      preferredIndustry: 'Technology',
    },
    {
      email: 'demo-intern-08@easyintern.app',
      firstName: 'Nana',
      lastName: 'Agyeman',
      studentId: 'EI-DEMO-0008',
      bio: 'Healthcare administration student interested in clinic operations.',
      skills: ['Operations', 'Microsoft Office', 'Customer Service'],
      education: 'BSc Health Administration',
      location: 'Kumasi, Ashanti Region',
      preferredIndustry: 'Healthcare',
    },
  ];

  for (const c of companies) {
    await ensureUserCompany(c);
  }

  for (const i of interns) {
    await ensureIntern(i);
  }

  const jobs = await prisma.job.findMany();

  const internRecords = await prisma.intern.findMany({
    where: { user: { email: { startsWith: 'demo-intern-' } } },
    include: { user: true },
  });

  const pickJob = (title) => jobs.find((j) => j.title === title);

  const applicationPairs = [
    { internEmail: 'demo-intern-01@easyintern.app', jobTitle: 'Frontend Engineering Intern' },
    { internEmail: 'demo-intern-04@easyintern.app', jobTitle: 'Frontend Engineering Intern' },
    { internEmail: 'demo-intern-02@easyintern.app', jobTitle: 'Finance & Reporting Intern' },
    { internEmail: 'demo-intern-03@easyintern.app', jobTitle: 'Content Marketing Intern' },
    { internEmail: 'demo-intern-05@easyintern.app', jobTitle: 'Supply Chain Intern' },
    { internEmail: 'demo-intern-06@easyintern.app', jobTitle: 'STEM Outreach Intern' },
  ];

  for (const pair of applicationPairs) {
    const intern = internRecords.find((x) => x.user.email === pair.internEmail);
    const job = pickJob(pair.jobTitle);
    if (!intern || !job) {
      console.log(`⏭️  Skip application (missing intern/job): ${pair.internEmail} + ${pair.jobTitle}`);
      continue;
    }
    try {
      await prisma.application.create({
        data: {
          jobId: job.id,
          internId: intern.id,
          status: 'PENDING',
          coverLetter: 'Demo application generated for EasyIntern showcase.',
        },
      });
      console.log(`✅ Demo application: ${pair.internEmail} → ${pair.jobTitle}`);
    } catch {
      console.log(`⏭️  Skip application (duplicate): ${pair.internEmail} → ${pair.jobTitle}`);
    }
  }

  console.log('\n🎉 Demo seed done.');
  console.log(`\n🔑 Login for demo accounts (password for all): ${DEMO_PASSWORD}`);
  console.log('   Companies: demo-company-*@easyintern.app');
  console.log('   Interns: demo-intern-*@easyintern.app');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Ghanaian data...');

  // Create companies
  const companies = [
    {
      email: 'info@mtn.com.gh',
      password: await bcrypt.hash('password123', 10),
      name: 'MTN Ghana',
      description: 'Leading telecommunications company in Ghana, providing mobile and digital services.',
      website: 'https://www.mtn.com.gh',
      industry: 'Telecommunications',
      location: 'Accra, Greater Accra',
      jobs: [
        {
          title: 'Software Development Intern',
          description: 'Join our technology team to develop innovative mobile applications and digital solutions. Work with cutting-edge technologies and gain hands-on experience in software development.',
          requirements: [
            'Currently pursuing a degree in Computer Science or related field',
            'Knowledge of JavaScript, React, or mobile development',
            'Strong problem-solving skills',
            'Good communication skills'
          ],
          location: 'Accra, Greater Accra',
          remote: false,
          duration: '6 months',
          stipend: 'GHS 1,500/month',
          skills: ['JavaScript', 'React', 'Node.js', 'Mobile Development']
        },
        {
          title: 'Marketing Intern',
          description: 'Support our marketing team in creating campaigns, managing social media, and analyzing market trends. Perfect opportunity to learn digital marketing in a fast-paced environment.',
          requirements: [
            'Marketing, Communications, or Business degree',
            'Social media management experience',
            'Creative thinking and analytical skills',
            'Excellent written and verbal communication'
          ],
          location: 'Accra, Greater Accra',
          remote: false,
          duration: '3 months',
          stipend: 'GHS 1,200/month',
          skills: ['Marketing', 'Social Media', 'Content Creation', 'Analytics']
        }
      ]
    },
    {
      email: 'careers@vodafone.com.gh',
      password: await bcrypt.hash('password123', 10),
      name: 'Vodafone Ghana',
      description: 'Innovative telecommunications provider committed to connecting Ghanaians through technology.',
      website: 'https://www.vodafone.com.gh',
      industry: 'Telecommunications',
      location: 'Accra, Greater Accra',
      jobs: [
        {
          title: 'Data Analytics Intern',
          description: 'Work with our data team to analyze customer behavior, network performance, and business metrics. Learn to use advanced analytics tools and create actionable insights.',
          requirements: [
            'Statistics, Mathematics, or Data Science background',
            'Experience with Excel, SQL, or Python',
            'Analytical mindset',
            'Attention to detail'
          ],
          location: 'Accra, Greater Accra',
          remote: true,
          duration: '4 months',
          stipend: 'GHS 1,400/month',
          skills: ['Data Analysis', 'SQL', 'Python', 'Excel', 'Statistics']
        }
      ]
    },
    {
      email: 'hr@absa.com.gh',
      password: await bcrypt.hash('password123', 10),
      name: 'Absa Bank Ghana',
      description: 'Leading financial services provider offering banking, insurance, and investment solutions across Ghana.',
      website: 'https://www.absa.com.gh',
      industry: 'Banking & Finance',
      location: 'Accra, Greater Accra',
      jobs: [
        {
          title: 'Finance Intern',
          description: 'Gain exposure to banking operations, financial analysis, and customer service. Work alongside experienced bankers and learn about the financial services industry.',
          requirements: [
            'Finance, Accounting, or Economics degree',
            'Strong numerical skills',
            'Professional demeanor',
            'Interest in banking and finance'
          ],
          location: 'Accra, Greater Accra',
          remote: false,
          duration: '6 months',
          stipend: 'GHS 1,600/month',
          skills: ['Finance', 'Accounting', 'Excel', 'Financial Analysis']
        }
      ]
    },
    {
      email: 'info@fanmilk.com.gh',
      password: await bcrypt.hash('password123', 10),
      name: 'FanMilk Ghana',
      description: 'Leading dairy and frozen foods company, part of the Danone Group, serving delicious products across Ghana.',
      website: 'https://www.fanmilk.com.gh',
      industry: 'Food & Beverage',
      location: 'Tema, Greater Accra',
      jobs: [
        {
          title: 'Supply Chain Intern',
          description: 'Learn about logistics, inventory management, and distribution operations. Work with our supply chain team to ensure products reach customers efficiently.',
          requirements: [
            'Supply Chain, Logistics, or Business degree',
            'Organizational skills',
            'Problem-solving ability',
            'Willingness to learn'
          ],
          location: 'Tema, Greater Accra',
          remote: false,
          duration: '3 months',
          stipend: 'GHS 1,100/month',
          skills: ['Supply Chain', 'Logistics', 'Inventory Management', 'Operations']
        }
      ]
    },
    {
      email: 'careers@meltwater.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Meltwater Ghana',
      description: 'Global media intelligence company with a strong presence in Ghana, helping businesses understand their media presence.',
      website: 'https://www.meltwater.com',
      industry: 'Technology & Media',
      location: 'Accra, Greater Accra',
      jobs: [
        {
          title: 'Software Engineering Intern',
          description: 'Build scalable software solutions using modern technologies. Work on real projects that impact clients worldwide.',
          requirements: [
            'Computer Science or Software Engineering degree',
            'Proficiency in at least one programming language',
            'Understanding of web technologies',
            'Team player with good communication skills'
          ],
          location: 'Accra, Greater Accra',
          remote: true,
          duration: '6 months',
          stipend: 'GHS 2,000/month',
          skills: ['Python', 'JavaScript', 'React', 'API Development', 'Database']
        }
      ]
    },
    {
      email: 'info@unilever.com.gh',
      password: await bcrypt.hash('password123', 10),
      name: 'Unilever Ghana',
      description: 'Global consumer goods company manufacturing and distributing household and personal care products.',
      website: 'https://www.unilever.com.gh',
      industry: 'Consumer Goods',
      location: 'Tema, Greater Accra',
      jobs: [
        {
          title: 'Marketing & Brand Management Intern',
          description: 'Support brand teams in developing marketing strategies, executing campaigns, and analyzing consumer insights.',
          requirements: [
            'Marketing, Business, or Communications degree',
            'Creative thinking',
            'Strong communication skills',
            'Interest in consumer goods'
          ],
          location: 'Tema, Greater Accra',
          remote: false,
          duration: '4 months',
          stipend: 'GHS 1,500/month',
          skills: ['Marketing', 'Brand Management', 'Consumer Insights', 'Campaign Management']
        }
      ]
    }
  ];

  // Create interns
  const interns = [
    {
      email: 'kwame.mensah@knust.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Kwame',
      lastName: 'Mensah',
      bio: 'Passionate computer science student at KNUST with a strong interest in web development and mobile applications. Looking for opportunities to apply my skills in real-world projects.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Mobile Development'],
      education: 'BSc Computer Science - KNUST',
      experience: 'Built several web applications and mobile apps for university projects',
      location: 'Kumasi, Ashanti Region'
    },
    {
      email: 'akosua.owusu@ug.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Akosua',
      lastName: 'Owusu',
      bio: 'Marketing student at University of Ghana with experience in social media management and content creation. Creative and analytical, ready to contribute to marketing teams.',
      skills: ['Marketing', 'Social Media', 'Content Creation', 'Analytics', 'SEO'],
      education: 'BSc Marketing - University of Ghana',
      experience: 'Managed social media accounts for student organizations',
      location: 'Accra, Greater Accra'
    },
    {
      email: 'kofi.asante@ucc.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Kofi',
      lastName: 'Asante',
      bio: 'Finance and Accounting student passionate about financial analysis and investment. Strong analytical skills and attention to detail.',
      skills: ['Finance', 'Accounting', 'Excel', 'Financial Analysis', 'QuickBooks'],
      education: 'BSc Accounting - UCC',
      experience: 'Completed internships in accounting firms, familiar with financial reporting',
      location: 'Cape Coast, Central Region'
    },
    {
      email: 'ama.darko@knust.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Ama',
      lastName: 'Darko',
      bio: 'Data Science enthusiast studying at KNUST. Experienced in data analysis, machine learning, and statistical modeling. Love turning data into insights.',
      skills: ['Data Analysis', 'Python', 'SQL', 'Machine Learning', 'Statistics', 'Excel'],
      education: 'BSc Statistics - KNUST',
      experience: 'Completed data analysis projects for local businesses',
      location: 'Kumasi, Ashanti Region'
    },
    {
      email: 'yaw.boateng@ug.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Yaw',
      lastName: 'Boateng',
      bio: 'Software engineering student with expertise in full-stack development. Built several web applications and APIs. Passionate about clean code and best practices.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'API Development'],
      education: 'BSc Software Engineering - University of Ghana',
      experience: 'Freelance web developer, built e-commerce platforms',
      location: 'Accra, Greater Accra'
    },
    {
      email: 'efua.adjei@ucc.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Efua',
      lastName: 'Adjei',
      bio: 'Business Administration student with focus on supply chain and operations. Organized and detail-oriented, ready to contribute to operations teams.',
      skills: ['Supply Chain', 'Operations', 'Logistics', 'Excel', 'Project Management'],
      education: 'BSc Business Administration - UCC',
      experience: 'Volunteer coordinator for campus events, managed logistics',
      location: 'Cape Coast, Central Region'
    },
    {
      email: 'kwabena.amponsah@knust.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Kwabena',
      lastName: 'Amponsah',
      bio: 'Computer Science student specializing in mobile app development. Created Android and iOS apps for local businesses. Strong problem-solving skills.',
      skills: ['Mobile Development', 'React Native', 'Flutter', 'JavaScript', 'Firebase'],
      education: 'BSc Computer Science - KNUST',
      experience: 'Developed mobile apps for 3 local businesses',
      location: 'Kumasi, Ashanti Region'
    },
    {
      email: 'adwoa.agyeman@ug.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Adwoa',
      lastName: 'Agyeman',
      bio: 'Marketing and Communications student with strong writing and design skills. Experience in brand management and digital marketing campaigns.',
      skills: ['Marketing', 'Brand Management', 'Content Writing', 'Graphic Design', 'Social Media'],
      education: 'BA Communications - University of Ghana',
      experience: 'Created marketing materials for student organizations',
      location: 'Accra, Greater Accra'
    },
    {
      email: 'kojo.appiah@ucc.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Kojo',
      lastName: 'Appiah',
      bio: 'Information Technology student with expertise in database management and backend development. Strong foundation in software engineering principles.',
      skills: ['Database Management', 'SQL', 'Python', 'API Development', 'System Design'],
      education: 'BSc Information Technology - UCC',
      experience: 'Database administrator for university projects',
      location: 'Cape Coast, Central Region'
    },
    {
      email: 'abena.osei@knust.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Abena',
      lastName: 'Osei',
      bio: 'Economics student with strong analytical and research skills. Interested in financial analysis and economic research. Detail-oriented and methodical.',
      skills: ['Economics', 'Financial Analysis', 'Research', 'Excel', 'Data Analysis'],
      education: 'BSc Economics - KNUST',
      experience: 'Research assistant for economics department',
      location: 'Kumasi, Ashanti Region'
    },
    {
      email: 'fiifi.quaye@ug.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Fiifi',
      lastName: 'Quaye',
      bio: 'Computer Science student passionate about cybersecurity and network administration. Certified in network security fundamentals.',
      skills: ['Cybersecurity', 'Network Administration', 'Linux', 'Python', 'Security Analysis'],
      education: 'BSc Computer Science - University of Ghana',
      experience: 'Security intern at local IT company',
      location: 'Accra, Greater Accra'
    },
    {
      email: 'maame.ntiamoah@ucc.edu.gh',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Maame',
      lastName: 'Ntiamoah',
      bio: 'Business student specializing in human resources and organizational development. Strong interpersonal skills and passion for people management.',
      skills: ['Human Resources', 'Recruitment', 'Employee Relations', 'Communication', 'Organization'],
      education: 'BSc Human Resource Management - UCC',
      experience: 'HR assistant for campus organizations',
      location: 'Cape Coast, Central Region'
    }
  ];

  // Create companies and their jobs
  for (const companyData of companies) {
    const { jobs, ...companyInfo } = companyData;
    
    const user = await prisma.user.create({
      data: {
        email: companyInfo.email,
        password: companyInfo.password,
        userType: 'COMPANY',
        company: {
          create: {
            name: companyInfo.name,
            description: companyInfo.description,
            website: companyInfo.website,
            industry: companyInfo.industry,
            location: companyInfo.location,
          },
        },
      },
    });

    const company = await prisma.company.findUnique({
      where: { userId: user.id },
    });

    // Create jobs for this company
    for (const jobData of jobs) {
      await prisma.job.create({
        data: {
          companyId: company.id,
          ...jobData,
        },
      });
    }

    console.log(`✅ Created company: ${companyInfo.name}`);
  }

  // Create interns
  for (const internData of interns) {
    const user = await prisma.user.create({
      data: {
        email: internData.email,
        password: internData.password,
        userType: 'INTERN',
        intern: {
          create: {
            firstName: internData.firstName,
            lastName: internData.lastName,
            bio: internData.bio,
            skills: internData.skills,
            education: internData.education,
            experience: internData.experience,
            location: internData.location,
          },
        },
      },
    });

    console.log(`✅ Created intern: ${internData.firstName} ${internData.lastName}`);
  }

  // Create some applications
  const allInterns = await prisma.intern.findMany();
  const allJobs = await prisma.job.findMany();

  // Create a few sample applications
  if (allInterns.length > 0 && allJobs.length > 0) {
    const applications = [
      {
        intern: allInterns[0], // Kwame Mensah
        job: allJobs[0], // MTN Software Development
        coverLetter: 'I am very interested in this position as it aligns perfectly with my skills in JavaScript and React. I believe I can contribute to your team while learning from experienced developers.',
      },
      {
        intern: allInterns[1], // Akosua Owusu
        job: allJobs[1], // MTN Marketing
        coverLetter: 'As a marketing student with experience in social media management, I am excited about the opportunity to work with MTN\'s marketing team and contribute to innovative campaigns.',
      },
      {
        intern: allInterns[2], // Kofi Asante
        job: allJobs[2], // Absa Finance
        coverLetter: 'My background in accounting and finance makes me a strong candidate for this internship. I am eager to learn from experienced professionals in the banking industry.',
      },
      {
        intern: allInterns[3], // Ama Darko
        job: allJobs[2], // Vodafone Data Analytics
        coverLetter: 'I am passionate about data analysis and would love to apply my skills in Python and SQL to help Vodafone make data-driven decisions.',
      },
    ];

    for (const app of applications) {
      try {
        await prisma.application.create({
          data: {
            jobId: app.job.id,
            internId: app.intern.id,
            coverLetter: app.coverLetter,
            status: 'PENDING',
          },
        });
        console.log(`✅ Created application from ${app.intern.firstName} ${app.intern.lastName} to ${app.job.title}`);
      } catch (error) {
        // Skip if application already exists
        console.log(`⏭️  Skipped duplicate application`);
      }
    }
  }

  console.log('\n🎉 Seeding completed successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Companies: ${companies.length}`);
  console.log(`   - Interns: ${interns.length}`);
  console.log(`   - Jobs: ${allJobs.length}`);
  console.log(`\n🔑 Login credentials:`);
  console.log(`   Companies: Use company email and password "password123"`);
  console.log(`   Interns: Use intern email and password "password123"`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

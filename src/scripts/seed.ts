import { getPayload } from '@payloadcms/next'
import config from '@payload-config'

async function seed() {
  console.log('🌱 Starting database seed...')

  const payload = await getPayload({ config })

  try {
    // Create admin user
    console.log('👤 Creating admin user...')
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin123', // Change this in production!
        role: 'admin',
        name: 'Admin User',
      },
    })
    console.log('✅ Admin user created:', adminUser.email)

    // Create sample personas
    console.log('🎭 Creating sample personas...')

    const webDevPersona = await payload.create({
      collection: 'personas',
      data: {
        title: 'Web Developer',
        slug: 'web-developer',
        tagline: 'Building modern web applications',
        description: 'Specialized in full-stack web development with React, Node.js, and cloud technologies.',
        isActive: true,
        order: 1,
        theme: {
          primaryColor: '#3b82f6',
          secondaryColor: '#8b5cf6',
          accentColor: '#06b6d4',
        },
      },
    })
    console.log('✅ Created persona:', webDevPersona.title)

    const dataEngineerPersona = await payload.create({
      collection: 'personas',
      data: {
        title: 'Data Engineer',
        slug: 'data-engineer',
        tagline: 'Transforming data into insights',
        description: 'Expert in building scalable data pipelines and analytics platforms.',
        isActive: true,
        order: 2,
        theme: {
          primaryColor: '#10b981',
          secondaryColor: '#059669',
          accentColor: '#34d399',
        },
      },
    })
    console.log('✅ Created persona:', dataEngineerPersona.title)

    // Create sample skills
    console.log('💡 Creating sample skills...')

    const reactSkill = await payload.create({
      collection: 'skills',
      data: {
        name: 'React',
        category: 'frontend',
        proficiency: 'expert',
        yearsOfExperience: 5,
        isActive: true,
        personas: [webDevPersona.id],
      },
    })

    const nodeSkill = await payload.create({
      collection: 'skills',
      data: {
        name: 'Node.js',
        category: 'backend',
        proficiency: 'expert',
        yearsOfExperience: 4,
        isActive: true,
        personas: [webDevPersona.id],
      },
    })

    const pythonSkill = await payload.create({
      collection: 'skills',
      data: {
        name: 'Python',
        category: 'backend',
        proficiency: 'expert',
        yearsOfExperience: 6,
        isActive: true,
        personas: [dataEngineerPersona.id],
      },
    })

    console.log('✅ Created', 3, 'skills')

    // Create sample project
    console.log('📁 Creating sample project...')

    const sampleProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Multi-Persona Portfolio Platform',
        slug: 'portfolio-platform',
        excerpt: 'A dynamic portfolio platform showcasing expertise across multiple domains.',
        description: 'Built with Next.js, Payload CMS, and MongoDB for managing multiple professional personas.',
        status: 'published',
        featured: true,
        order: 1,
        personas: [webDevPersona.id],
        skills: [reactSkill.id, nodeSkill.id],
        startDate: new Date('2024-01-01').toISOString(),
        technologies: ['Next.js', 'Payload CMS', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      },
    })
    console.log('✅ Created project:', sampleProject.title)

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Login credentials:')
    console.log('   Email: admin@example.com')
    console.log('   Password: admin123')
    console.log('\n🔗 Access the admin panel at: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }

  process.exit(0)
}

seed()

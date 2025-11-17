import { getPayloadClient } from '../getPayload'
import type { Persona, Project, Skill, Experience, Content as ContentType } from '../payload-types'

/**
 * Get Payload client instance
 */
export async function getPayload() {
  return await getPayloadClient()
}

/**
 * Fetch all active personas
 */
export async function getPersonas() {
  const payload = await getPayload()
  const personas = await payload.find({
    collection: 'personas',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
  })

  return personas.docs
}

/**
 * Fetch persona by slug
 */
export async function getPersonaBySlug(slug: string) {
  const payload = await getPayload()
  const personas = await payload.find({
    collection: 'personas',
    where: {
      slug: {
        equals: slug,
      },
      isActive: {
        equals: true,
      },
    },
    limit: 1,
  })

  return personas.docs[0] || null
}

/**
 * Fetch projects for a specific persona
 */
export async function getProjectsByPersona(personaId: string, limit?: number) {
  const payload = await getPayload()
  const projects = await payload.find({
    collection: 'projects',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          personas: {
            contains: personaId,
          },
        },
      ],
    },
    sort: 'order',
    limit: limit || 100,
    depth: 2,
  })

  return projects.docs
}

/**
 * Fetch project by slug
 */
export async function getProjectBySlug(slug: string) {
  const payload = await getPayload()
  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
    depth: 2,
  })

  return projects.docs[0] || null
}

/**
 * Fetch featured projects
 */
export async function getFeaturedProjects(personaId?: string, limit = 6) {
  const payload = await getPayload()

  const where: any = {
    and: [
      {
        status: {
          equals: 'published',
        },
      },
      {
        featured: {
          equals: true,
        },
      },
    ],
  }

  if (personaId) {
    where.and.push({
      personas: {
        contains: personaId,
      },
    })
  }

  const projects = await payload.find({
    collection: 'projects',
    where,
    sort: 'order',
    limit,
    depth: 2,
  })

  return projects.docs
}

/**
 * Fetch skills for a specific persona
 */
export async function getSkillsByPersona(personaId: string) {
  const payload = await getPayload()
  const skills = await payload.find({
    collection: 'skills',
    where: {
      and: [
        {
          isActive: {
            equals: true,
          },
        },
        {
          personas: {
            contains: personaId,
          },
        },
      ],
    },
    sort: 'name',
    limit: 200,
  })

  return skills.docs
}

/**
 * Fetch experiences for a specific persona
 */
export async function getExperiencesByPersona(personaId: string) {
  const payload = await getPayload()
  const experiences = await payload.find({
    collection: 'experiences',
    where: {
      personas: {
        contains: personaId,
      },
    },
    sort: '-startDate',
    depth: 2,
  })

  return experiences.docs
}

/**
 * Fetch content/blog posts for a specific persona
 */
export async function getContentByPersona(personaId: string, type?: string, limit?: number) {
  const payload = await getPayload()

  const where: any = {
    and: [
      {
        publishedAt: {
          exists: true,
        },
      },
      {
        personas: {
          contains: personaId,
        },
      },
    ],
  }

  if (type) {
    where.and.push({
      type: {
        equals: type,
      },
    })
  }

  const content = await payload.find({
    collection: 'content',
    where,
    sort: '-publishedAt',
    limit: limit || 50,
  })

  return content.docs
}

/**
 * Fetch content by slug
 */
export async function getContentBySlug(slug: string) {
  const payload = await getPayload()
  const content = await payload.find({
    collection: 'content',
    where: {
      slug: {
        equals: slug,
      },
      publishedAt: {
        exists: true,
      },
    },
    limit: 1,
    depth: 2,
  })

  return content.docs[0] || null
}

/**
 * Fetch certifications for a specific persona
 */
export async function getCertificationsByPersona(personaId: string) {
  const payload = await getPayload()
  const certifications = await payload.find({
    collection: 'certifications',
    where: {
      personas: {
        contains: personaId,
      },
    },
    sort: '-issueDate',
    depth: 2,
  })

  return certifications.docs
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPersonaBySlug,
  getProjectsByPersona,
  getSkillsByPersona,
  getExperiencesByPersona,
} from '@/lib/payload'
import { formatDateRange } from '@/lib/utils'

type Props = {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function PersonaPage({ params }: Props) {
  const persona = await getPersonaBySlug(params.slug)

  if (!persona) {
    notFound()
  }

  const projects = await getProjectsByPersona(persona.id, 20)
  const skills = await getSkillsByPersona(persona.id)
  const experiences = await getExperiencesByPersona(persona.id)

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  const primaryColor = persona.theme?.primaryColor || '#3b82f6'
  const secondaryColor = persona.theme?.secondaryColor || '#8b5cf6'

  return (
    <div
      className="min-h-screen"
      style={
        {
          '--persona-primary': primaryColor,
          '--persona-secondary': secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold hover:opacity-80 transition-opacity">
              ← Back to Home
            </Link>
            <div className="flex gap-4">
              <Link href={`/persona/${persona.slug}`} className="hover:text-primary transition-colors">
                Overview
              </Link>
              <Link href={`/persona/${persona.slug}/projects`} className="hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href={`/persona/${persona.slug}/about`} className="hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              {persona.title}
            </span>
          </h1>
          {persona.tagline && (
            <p className="text-xl text-muted-foreground mb-8">{persona.tagline}</p>
          )}

          {/* Social Links */}
          {persona.social && (
            <div className="flex gap-4 justify-center mt-8">
              {persona.social.github && (
                <a
                  href={persona.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border hover:bg-muted transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {persona.social.linkedin && (
                <a
                  href={persona.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border hover:bg-muted transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {persona.social.email && (
                <a
                  href={`mailto:${persona.social.email}`}
                  className="p-2 rounded-full border hover:bg-muted transition-colors"
                  aria-label="Email"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  href={`/persona/${persona.slug}/projects/${project.slug}`}
                  className="group rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {project.featuredImage && typeof project.featuredImage === 'object' && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={project.featuredImage.url || ''}
                        alt={project.featuredImage.alt || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--persona-primary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
            {projects.length > 6 && (
              <div className="mt-8 text-center">
                <Link
                  href={`/persona/${persona.slug}/projects`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-muted transition-colors"
                  style={{ borderColor: primaryColor }}
                >
                  View All Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4 capitalize">
                    {category.replace('-', ' ')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium border"
                        style={{
                          borderColor: skill.color || primaryColor,
                          color: skill.color || primaryColor,
                        }}
                      >
                        {skill.name}
                        {skill.proficiency && (
                          <span className="ml-2 text-xs opacity-60">
                            {skill.proficiency}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {experiences.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-8 pb-8 border-l-2 border-muted">
                  <div
                    className="absolute -left-2 top-0 w-4 h-4 rounded-full border-4 border-background"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-4 space-y-2 list-disc list-inside text-sm">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement.achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {persona.title} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

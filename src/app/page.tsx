import Link from 'next/link'
import { getPersonas, getFeaturedProjects } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const personas = await getPersonas()
  const featuredProjects = await getFeaturedProjects(undefined, 6)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to My{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Multi-Persona
            </span>{' '}
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore my diverse expertise across multiple professional domains. From web development
            to security, each persona represents a unique aspect of my technical journey.
          </p>

          {/* Personas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {personas.map((persona) => (
              <Link
                key={persona.id}
                href={`/persona/${persona.slug}`}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all duration-300"
                style={
                  {
                    '--persona-primary': persona.theme?.primaryColor || '#3b82f6',
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--persona-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-2">{persona.title}</h3>
                  {persona.tagline && (
                    <p className="text-sm text-muted-foreground">{persona.tagline}</p>
                  )}
                  <div className="mt-4 inline-flex items-center text-sm font-medium">
                    <span
                      className="mr-2"
                      style={{ color: persona.theme?.primaryColor || '#3b82f6' }}
                    >
                      Explore
                    </span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
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
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.skills &&
                        Array.isArray(project.skills) &&
                        project.skills.slice(0, 3).map((skill) => {
                          const skillObj = typeof skill === 'object' ? skill : null
                          if (!skillObj) return null
                          return (
                            <span
                              key={skillObj.id}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary"
                            >
                              {skillObj.name}
                            </span>
                          )
                        })}
                    </div>
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
            © {new Date().getFullYear()} Multi-Persona Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

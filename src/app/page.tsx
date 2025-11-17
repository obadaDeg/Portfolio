export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Welcome to My{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Persona
          </span>{' '}
          Portfolio
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          The platform is initializing. This is a test page to verify Next.js is working correctly.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
          <p className="text-green-800 font-medium">✅ Next.js is working!</p>
          <p className="text-green-600 text-sm mt-1">Server-side rendering successful</p>
        </div>
      </div>
    </main>
  )
}

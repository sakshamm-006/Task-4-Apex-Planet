import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, ExternalLink, Code, Database, Filter } from "lucide-react"

export default function HomePage() {
  const projects = [
    {
      title: "Smart To-Do & Notes App",
      description: "A feature-rich task management and note-taking application with local storage persistence.",
      tech: ["JavaScript", "Local Storage", "Responsive Design"],
      link: "/todo-app",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Product Catalog with Filters",
      description: "Interactive product listing page with advanced filtering, sorting, and search capabilities.",
      tech: ["JavaScript", "Dynamic Filtering", "Sort Algorithms"],
      link: "/products",
      icon: <Filter className="h-6 w-6" />,
    },
    {
      title: "Portfolio Website",
      description: "This responsive multi-page portfolio showcasing web development skills and projects.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "/about",
      icon: <Code className="h-6 w-6" />,
    },
  ]

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Local Storage",
    "Responsive Design",
    "Git",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="/todo-app" className="text-slate-600 hover:text-slate-900 transition-colors">
                To-Do App
              </Link>
              <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
                Products
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Web Developer
            <span className="block text-blue-600">Portfolio</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Showcasing practical web development skills through three comprehensive projects: a personal portfolio, a
            to-do app with local storage, and an interactive product catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/about">Learn More About Me</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/todo-app">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{project.icon}</div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={project.link}>
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Explore my projects and get in touch to discuss web development opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                View GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

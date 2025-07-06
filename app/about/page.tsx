import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"

export default function AboutPage() {
  const education = [
    {
      degree: "Bachelor's in Computer Science",
      school: "Jaypee University of Engineering & Technology (JUET), Guna",
      year: "2023-2027",
      description: "Relevant coursework: Web Development, Data Structures, Algorithms, Database Systems",
    },
  ]

  const experience = [
    {
      title: "Web Development Projects",
      company: "Personal Development",
      period: "2023-Present",
      description: "Built multiple web applications using HTML, CSS, JavaScript, and modern frameworks",
    },
    {
      title: "Frontend Development Course",
      company: "Online Platform",
      period: "2023",
      description: "Completed comprehensive course covering responsive design, JavaScript ES6+, and React",
    },
  ]

  const achievements = [
    "Built 3 fully functional web applications with different complexity levels",
    "Implemented local storage for data persistence",
    "Created responsive designs that work across all device sizes",
    "Developed interactive user interfaces with filtering and sorting",
    "Applied modern web development best practices",
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
              <Link href="/about" className="text-slate-900 font-medium">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Me</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate web developer focused on creating engaging, user-friendly web experiences through modern
            technologies and best practices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>My Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  I'm a dedicated developer with a passion for creating engaging, user-friendly web experiences. Through
                  self-directed learning and hands-on projects, I've developed strong skills in frontend development.
                </p>
                <p className="text-slate-600">
                  This portfolio demonstrates my ability to combine HTML, CSS, and JavaScript to build fully functional
                  applications, from simple to-do lists to complex product catalogs with advanced filtering
                  capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-slate-500 mb-2">{edu.year}</p>
                    <p className="text-slate-600">{edu.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Experience & Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-green-200 pl-4">
                    <h3 className="font-semibold text-slate-900">{exp.title}</h3>
                    <p className="text-green-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-500 mb-2">{exp.period}</p>
                    <p className="text-slate-600">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Key Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Key Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Let's Work Together</h2>
          <p className="text-slate-600 mb-6">
            I'm passionate about creating innovative web solutions and always excited to take on new challenges and
            collaborate on interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

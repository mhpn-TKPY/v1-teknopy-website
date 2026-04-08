import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 98 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Supabase", level: 92 },
      { name: "PostgreSQL", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Outils & DevOps",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Vercel", level: 95 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    title: "Mobile & Autres",
    skills: [
      { name: "React Native", level: 82 },
      { name: "PWA", level: 88 },
      { name: "SEO", level: 85 },
      { name: "Stripe", level: 90 },
    ],
  },
]

export function Skills() {
  return (
    <section id="competences" className="bg-secondary/30 py-10 md:py-14 lg:py-16" aria-labelledby="competences-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="mb-2 inline-block text-sm font-medium text-primary">Expertise TEKNOPY</span>
          <h2 id="competences-heading" className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Compétences Techniques Fullstack
          </h2>
          <p className="text-muted-foreground">
            Une expertise fullstack moderne pour réaliser vos projets web avec les meilleures technologies du marché.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

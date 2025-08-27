import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, MessageCircle, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: 'Create Polls',
      description: 'Design engaging polls with multiple choice options and custom categories'
    },
    {
      icon: Users,
      title: 'Gather Votes',
      description: 'Collect responses from your community and track participation in real-time'
    },
    {
      icon: TrendingUp,
      title: 'View Results',
      description: 'Analyze poll results with beautiful charts and detailed statistics'
    },
    {
      icon: MessageCircle,
      title: 'Engage Community',
      description: 'Foster discussions with comments and reactions on every poll'
    }
  ]

  const stats = [
    { label: 'Active Polls', value: '1,200+' },
    { label: 'Total Votes', value: '25,000+' },
    { label: 'Community Members', value: '5,000+' }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🎉 Welcome to ALX Polly
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Create Polls,
            <br />
            <span className="text-primary">Gather Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build engaging polls, collect valuable feedback, and make data-driven decisions with our intuitive polling platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/polls/create">
                Create Your First Poll
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/polls">
                Browse Polls
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to create amazing polls</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to create, share, and analyze polls effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating engaging polls and gathering valuable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Sign Up Free
                <CheckCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

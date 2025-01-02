import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Check, Star, Keyboard, Brain, Target, Trophy, Clock, Users, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
          
          <div className="relative bg-gradient-to-b from-primary/10 via-background to-background pt-20 pb-32">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <Badge variant="secondary" className="mb-4">
                  ⌨️ The Ultimate Typing Tutor
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Master Touch Typing with Precision & Speed
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Join thousands of users who have transformed their typing skills. Interactive lessons, real-time feedback, and personalized practice sessions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button size="lg" asChild className="text-lg">
                    <Link href="/playground">Start Typing Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg">
                    View Demo
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>10K+ Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Type It!</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform offers everything you need to become a typing expert
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Keyboard,
                  title: "Interactive Lessons",
                  description: "Step-by-step lessons tailored to your skill level"
                },
                {
                  icon: Brain,
                  title: "Smart Learning",
                  description: "AI-powered system adapts to your learning pace"
                },
                {
                  icon: Target,
                  title: "Precision Focus",
                  description: "Real-time feedback for accuracy improvement"
                },
                {
                  icon: Trophy,
                  title: "Achievement System",
                  description: "Earn badges and track your progress"
                }
              ].map((feature, index) => (
                <Card key={index} className="relative overflow-hidden group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { number: "50M+", label: "Characters Typed" },
                { number: "100K+", label: "Lessons Completed" },
                { number: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your typing journey
              </p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="yearly">Yearly Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Basic",
                      price: "Free",
                      description: "Perfect for beginners",
                      features: ["Basic lessons", "Progress tracking", "Standard typing tests"]
                    },
                    {
                      name: "Pro",
                      price: "$9.99/mo",
                      description: "Most popular choice",
                      features: ["All basic features", "Advanced lessons", "Detailed analytics", "Custom practice sessions"]
                    },
                    {
                      name: "Enterprise",
                      price: "Custom",
                      description: "For teams & organizations",
                      features: ["All pro features", "Team management", "API access", "Dedicated support"]
                    }
                  ].map((plan, index) => (
                    <Card key={index} className={`relative ${index === 1 ? 'border-primary shadow-lg md:scale-105' : ''}`}>
                      {index === 1 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge variant="secondary">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                          <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                          {plan.price !== "Free" && plan.price !== "Custom" && (
                            <span className="text-muted-foreground ml-2">/month</span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                          {index === 2 ? "Contact Sales" : "Get Started"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="yearly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Similar structure as monthly, but with yearly prices */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied users who have improved their typing skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Software Developer",
                  image: "/placeholder.svg?height=80&width=80",
                  content: "Type It! has significantly improved my coding speed. The interactive lessons and real-time feedback are fantastic!"
                },
                {
                  name: "Michael Chen",
                  role: "Content Writer",
                  image: "/placeholder.svg?height=80&width=80",
                  content: "As a writer, typing speed is crucial. This platform helped me increase my WPM from 60 to 90 in just two months."
                },
                {
                  name: "Emily Brown",
                  role: "Student",
                  image: "/placeholder.svg?height=80&width=80",
                  content: "The gamified approach makes learning fun. I actually look forward to my daily typing practice now!"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full w-12 h-12"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Improve Your Typing Skills?</h2>
              <p className="text-primary-foreground/80 mb-8">
                Join thousands of users who have already transformed their typing speed and accuracy
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/playground" className="text-lg">
                  Get Started Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Have questions? We'd love to hear from you.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message here..."
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


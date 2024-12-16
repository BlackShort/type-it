import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthStatus } from "@/components/auth-status"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <header className="bg-[var(--card)] dark:bg-[var(--card)] shadow-sm sticky top-0 z-10 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)] dark:text-[var(--primary)]">Type It!</h1>
          <div className="space-x-4">
            <Link href="/" className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary">Home</Link>
            <Link href="#about" className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary">About</Link>
            <Link href="#features" className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary">Features</Link>
            <Link href="#pricing" className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary">Pricing</Link>
            <Link href="#contact" className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AuthStatus />
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-12 md:py-24 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Unleash Your Typing Potential</h1>
            <p className="text-lg md:text-xl mb-8">
              Improve your typing speed and accuracy with our interactive typing playground and comprehensive tutorials.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary-foreground text-primary font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Learn More
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md border border-primary-foreground text-primary-foreground font-medium transition-colors hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Try Now
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-[var(--card)] dark:bg-[var(--card)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">About Type It!</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg mb-4 text-foreground dark:text-foreground">
                Type It! is a cutting-edge typing tutor designed to help you improve your typing speed and accuracy.
                Whether you're a beginner looking to learn touch typing or an experienced typist aiming to boost your
                words per minute, our platform offers personalized lessons and engaging exercises to meet your goals.
              </p>
              <p className="text-lg text-foreground dark:text-foreground">
                Founded by a team of passionate developers and educators, Type It! combines the latest in educational
                technology with proven typing techniques to deliver an unparalleled learning experience.
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-[var(--muted)] dark:bg-[var(--muted)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Interactive Lessons', description: 'Engaging, step-by-step lessons tailored to your skill level.' },
                { title: 'Real-Time Progress Tracking', description: 'Monitor your WPM, accuracy, and improvement over time.' },
                { title: 'Customizable Practice Sessions', description: 'Create your own drills focusing on problem areas.' },
                { title: 'Typing Games', description: 'Fun, competitive games to make learning enjoyable.' },
                { title: 'Detailed Analytics', description: 'In-depth insights into your typing patterns and areas for improvement.' },
                { title: 'Multi-language Support', description: 'Practice typing in multiple languages and keyboard layouts.' }
              ].map((feature, index) => (
                <div key={index} className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-foreground">{feature.title}</h3>
                  <p className="text-foreground dark:text-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-[var(--card)] dark:bg-[var(--card)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', price: 'Free', features: ['Access to basic lessons', 'Limited progress tracking', 'Standard typing tests'] },
                { name: 'Pro', price: '$9.99/month', features: ['All basic features', 'Advanced lessons', 'Detailed analytics', 'Custom practice sessions'] },
                { name: 'Enterprise', price: 'Contact Us', features: ['All pro features', 'Team management', 'API access', 'Dedicated support'] }
              ].map((plan, index) => (
                <div key={index} className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground dark:text-foreground">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4 text-[var(--primary)] dark:text-[var(--primary)]">{plan.price}</p>
                  <ul className="mb-6 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="mb-2 flex items-center text-foreground dark:text-foreground">
                        <svg className="w-4 h-4 mr-2 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto" variant={index === 1 ? "default" : "outline"}>
                    {index === 2 ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-[var(--muted)] dark:bg-[var(--muted)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">Contact Us</h2>
            <div className="max-w-lg mx-auto">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground dark:text-foreground">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground dark:text-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground dark:text-foreground">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] dark:bg-[var(--input)] dark:border-[var(--border)] dark:text-foreground"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Typing Leaderboard</h2>
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Top Typists</h3>
                <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
                  View Leaderboard
                </Link>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>WPM</TableHead>
                    <TableHead>Accuracy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 border">
                          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>JohnDoe</span>
                      </div>
                    </TableCell>
                    <TableCell>145</TableCell>
                    <TableCell>99%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 border">
                          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <span>SarahMiller</span>
                      </div>
                    </TableCell>
                    <TableCell>138</TableCell>
                    <TableCell>97%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 border">
                          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <span>MichaelJackson</span>
                      </div>
                    </TableCell>
                    <TableCell>132</TableCell>
                    <TableCell>95%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-[var(--card)] dark:bg-[var(--card)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'John Doe', text: 'Type It! has significantly improved my typing speed. Highly recommended!' },
                { name: 'Jane Smith', text: 'The interactive lessons and games make learning to type fun and engaging.' },
                { name: 'Mike Johnson', text: 'As a programmer, Type It! helped me become more efficient in my daily work.' },
                { name: 'Emily Brown', text: 'The progress tracking feature keeps me motivated to improve every day.' }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md">
                  <p className="text-foreground dark:text-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground dark:text-foreground">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; 2024 Typing Mastery. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
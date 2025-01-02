import Link from 'next/link'
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthStatus } from "@/components/auth-status"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

interface NavItem {
  href: string
  label: string
}

interface NavbarProps {
  navItems?: NavItem[]
}

export function Navbar({ navItems = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
] }: NavbarProps) {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-2 sm:py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          <Link href="/">Type It!</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <AuthStatus />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block w-full py-2 px-4 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-border">
                  <ThemeToggle />
                </div>
                <div className="pt-4">
                  <AuthStatus />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}


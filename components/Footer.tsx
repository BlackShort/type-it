import Link from 'next/link'

interface FooterLink {
  href: string
  label: string
}

interface FooterProps {
  links?: FooterLink[]
}

export function Footer({ links = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact Us' },
] }: FooterProps) {
  return (
    <footer className="bg-secondary text-secondary-foreground py-2 sm:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-base font-semibold mb-1">Type It!</h3>
            <p className="text-xs text-muted-foreground">Copyright © {new Date().getFullYear()} Type It! All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-xs text-muted-foreground hover:text-secondary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}


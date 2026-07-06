import { Link } from 'react-router'
import { Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Threat Intelligence', path: '/threat-intel' },
      { label: 'Security Tools', path: '/tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Services', path: '/services' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', path: '#' },
      { label: 'API Reference', path: '#' },
      { label: 'Blog', path: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-[#0a0d12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/pyra-logo.png" alt="PYRA" className="h-8 w-8 object-contain" />
              <span className="text-lg font-bold tracking-wider text-white">
                PYRA<span className="text-cyber-gold">-</span>SOLUTION
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Advanced cyber defense and offensive security platform. Protecting enterprises with next-generation threat intelligence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md bg-cyber-surface border border-cyber-border text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all">
                <Github size={16} />
              </a>
              <a href="#" className="p-2 rounded-md bg-cyber-surface border border-cyber-border text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-md bg-cyber-surface border border-cyber-border text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-3 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-cyber-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-cyber-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} PYRA-SOLUTION. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Mail size={12} /> contact@pyra-solution.com
            </span>
            <span className="flex items-center gap-1">
              <Phone size={12} /> +1 (555) 123-4567
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router'
import {
  Shield, Target, Bug, Zap, Lock, FileSearch,
  TrendingUp, Users, Server, ArrowRight
} from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const increment = target / 60
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 25)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const features = [
  {
    icon: Shield,
    title: 'Threat Intelligence',
    desc: 'Real-time threat detection and analysis powered by AI-driven intelligence feeds.',
    link: '/threat-intel',
  },
  {
    icon: Target,
    title: 'Penetration Testing',
    desc: 'Comprehensive security assessments identifying vulnerabilities before attackers do.',
    link: '/tools',
  },
  {
    icon: Bug,
    title: 'Vulnerability Assessment',
    desc: 'Automated scanning and manual testing to uncover critical security flaws.',
    link: '/tools',
  },
  {
    icon: Zap,
    title: 'Incident Response',
    desc: '24/7 rapid response team to contain, investigate, and remediate security incidents.',
    link: '/dashboard',
  },
  {
    icon: Lock,
    title: 'Security Auditing',
    desc: 'In-depth compliance audits for SOC2, ISO27001, HIPAA, and GDPR standards.',
    link: '/services',
  },
  {
    icon: FileSearch,
    title: 'Malware Analysis',
    desc: 'Advanced reverse engineering and behavioral analysis of malicious software.',
    link: '/threat-intel',
  },
]

const stats = [
  { icon: Shield, value: 2400, suffix: '+', label: 'Threats Blocked' },
  { icon: TrendingUp, value: 999, suffix: '%', label: 'Uptime SLA' },
  { icon: Users, value: 150, suffix: '+', label: 'Enterprise Clients' },
  { icon: Server, value: 50, suffix: '+', label: 'Countries Protected' },
]

export default function Home() {
  return (
    <div className="relative">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/60 via-transparent to-[#0D1117]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <img src="/pyra-logo.png" alt="PYRA" className="h-16 w-16 object-contain" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-tight">
              <span className="text-glow">PYRA</span>
              <span className="text-cyber-gold text-glow-gold">-</span>
              <span className="text-glow">SOLUTION</span>
            </h1>
            <p className="text-xl sm:text-2xl text-cyber-blue/80 font-light mb-3">
              Advanced Cyber Defense & Offensive Security Platform
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Next-generation cybersecurity infrastructure protecting enterprises against evolving digital threats with AI-powered intelligence and expert human analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyber-blue text-white font-semibold rounded-lg hover:bg-cyber-blue/80 transition-all hover:shadow-glow"
              >
                <Shield size={18} />
                Launch Dashboard
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-cyber-gold/50 text-cyber-gold font-semibold rounded-lg hover:bg-cyber-gold/10 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-y border-cyber-border bg-[#0D1117]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-6 glass-card rounded-xl"
              >
                <stat.icon className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Security <span className="text-cyber-blue">Capabilities</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive cybersecurity solutions designed to protect your digital assets from every angle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="glass-card rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    <div className="mt-4 flex items-center text-cyber-blue text-sm font-medium">
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-10 sm:p-16 text-center border border-cyber-blue/30"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to <span className="text-cyber-blue text-glow">Secure</span> Your Infrastructure?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Join hundreds of enterprises that trust PYRA-SOLUTION for their cybersecurity needs. Get started with a free security assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-cyber-blue text-white font-semibold rounded-lg hover:bg-cyber-blue/80 transition-all hover:shadow-glow"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-cyber-border text-gray-300 font-semibold rounded-lg hover:border-cyber-blue/50 hover:text-white transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

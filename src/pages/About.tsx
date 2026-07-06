import { motion } from 'framer-motion'
import {
  Shield, Target, Users, Globe, Clock, Mail, Phone, MapPin,
  Lock, Zap, Eye
} from 'lucide-react'

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Chief Executive Officer',
    bio: 'Former NSA cybersecurity director with 20+ years in threat intelligence and strategic defense operations.',
    certifications: ['CISSP', 'CISM', 'GSEC'],
  },
  {
    name: 'Marcus Webb',
    role: 'Chief Technology Officer',
    bio: 'Pioneer in AI-driven threat detection. Previously led security engineering at a Fortune 500 tech company.',
    certifications: ['OSCP', 'GXPN', 'CISSP'],
  },
  {
    name: 'Dr. Sarah Okonkwo',
    role: 'VP of Threat Research',
    bio: 'PhD in Computer Science from MIT. Discovered 15+ zero-day vulnerabilities and leads our threat hunting team.',
    certifications: ['OSCE', 'GWAPT', 'CISSP'],
  },
  {
    name: 'James Nakamura',
    role: 'Head of Incident Response',
    bio: 'Led response to major breaches at global financial institutions. Expert in forensics and malware analysis.',
    certifications: ['GCFA', 'GCTI', 'CISSP'],
  },
  {
    name: 'Elena Volkov',
    role: 'Director of Penetration Testing',
    bio: 'Former red team lead for a government defense contractor. Specializes in advanced persistent threat simulation.',
    certifications: ['OSCP', 'OSEP', 'CRTO'],
  },
  {
    name: 'David Okafor',
    role: 'VP of Engineering',
    bio: 'Built scalable security platforms processing billions of events daily. Expert in distributed systems.',
    certifications: ['AWS-SCS', 'GCP-SEC', 'CISSP'],
  },
]

const certifications = [
  { name: 'SOC 2 Type II', org: 'AICPA', icon: Shield },
  { name: 'ISO 27001', org: 'ISO', icon: Lock },
  { name: 'CMMC Level 3', org: 'DoD', icon: Shield },
  { name: 'FedRAMP Authorized', org: 'GSA', icon: Shield },
  { name: 'PCI DSS Level 1', org: 'PCI SSC', icon: Lock },
  { name: 'HIPAA Compliant', org: 'HHS', icon: Shield },
]

const partners = [
  'CrowdStrike', 'Palo Alto Networks', 'Splunk', 'Elastic', 'Recorded Future',
  'MITRE ATT&CK', 'CISA', 'NIST', 'ISC2', 'Offensive Security',
]

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Every decision we make prioritizes the security and privacy of our clients above all else.',
  },
  {
    icon: Eye,
    title: 'Continuous Vigilance',
    description: 'Threats never sleep, and neither do we. Our 24/7 operations ensure constant protection.',
  },
  {
    icon: Zap,
    title: 'Rapid Innovation',
    description: 'We invest heavily in R&D to stay ahead of emerging threats with cutting-edge technology.',
  },
  {
    icon: Users,
    title: 'Collaborative Defense',
    description: 'We believe in information sharing and work closely with the security community.',
  },
]

const stats = [
  { icon: Users, value: '150+', label: 'Enterprise Clients' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
  { icon: Shield, value: '2.4M+', label: 'Threats Blocked' },
  { icon: Clock, value: '99.99%', label: 'Platform Uptime' },
]

export default function About() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About <span className="text-cyber-blue">PYRA-SOLUTION</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            We are a next-generation cybersecurity company dedicated to protecting organizations 
            against the ever-evolving landscape of cyber threats. Founded by former intelligence 
            community veterans, we bring nation-state level defense capabilities to enterprises worldwide.
          </p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card rounded-xl p-5 text-center"
            >
              <stat.icon className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mb-4">
              <Target size={22} className="text-cyber-blue" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To democratize advanced cybersecurity capabilities, making enterprise-grade threat 
              protection accessible to organizations of all sizes. We believe every organization 
              deserves defense-in-depth without the complexity and cost barriers that traditionally 
              limited access to nation-state level security.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-cyber-gold/10 border border-cyber-gold/30 flex items-center justify-center mb-4">
              <Eye size={22} className="text-cyber-gold" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              A world where cyber attacks are prevented before they can cause harm. We envision 
              a future where AI-powered security platforms work seamlessly alongside human experts, 
              creating an impenetrable defense that evolves faster than the threats it faces.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Our <span className="text-cyber-blue">Core Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass-card rounded-xl p-5 text-center hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mx-auto mb-3">
                  <value.icon size={18} className="text-cyber-blue" />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Leadership <span className="text-cyber-blue">Team</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            World-class security experts with decades of combined experience in intelligence, 
            defense, and enterprise security.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass-card rounded-xl p-5 group hover:border-cyber-blue/40 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyber-blue/30 to-cyber-gold/30 border border-cyber-blue/30 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                  <Users size={22} className="text-cyber-blue" />
                </div>
                <h3 className="text-white font-semibold mb-0.5">{member.name}</h3>
                <p className="text-cyber-blue text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-0.5 bg-cyber-gold/10 border border-cyber-gold/30 rounded text-xs text-cyber-gold font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Certifications & <span className="text-cyber-blue">Compliance</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="glass-card rounded-xl p-4 text-center hover:border-cyber-gold/40 transition-all"
              >
                <cert.icon className="w-8 h-8 text-cyber-gold mx-auto mb-2" />
                <h4 className="text-white text-sm font-medium">{cert.name}</h4>
                <p className="text-gray-500 text-xs">{cert.org}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Strategic <span className="text-cyber-blue">Partners</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.05 }}
                className="px-4 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-gray-300 text-sm hover:border-cyber-blue/50 hover:text-white transition-all cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="glass-card rounded-xl p-8 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Get in <span className="text-cyber-blue">Touch</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mx-auto mb-3">
                <MapPin size={18} className="text-cyber-blue" />
              </div>
              <h4 className="text-white font-medium mb-1">Headquarters</h4>
              <p className="text-gray-400 text-sm">
                1000 Cyber Defense Way<br />
                Washington, DC 20001<br />
                United States
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mx-auto mb-3">
                <Mail size={18} className="text-cyber-blue" />
              </div>
              <h4 className="text-white font-medium mb-1">Email</h4>
              <p className="text-gray-400 text-sm">
                contact@pyra-solution.com<br />
                support@pyra-solution.com<br />
                sales@pyra-solution.com
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mx-auto mb-3">
                <Phone size={18} className="text-cyber-blue" />
              </div>
              <h4 className="text-white font-medium mb-1">Phone</h4>
              <p className="text-gray-400 text-sm">
                +1 (555) 123-4567<br />
                +1 (555) 987-6543<br />
                24/7 Hotline
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

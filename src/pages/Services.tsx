import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronLeft, ChevronRight, Star, Mail,
  User, Building, MessageSquare, Send
} from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$999',
    period: '/month',
    description: 'Essential security monitoring for small teams',
    features: [
      '24/7 Threat Monitoring',
      'Weekly Security Reports',
      'Email Alert Notifications',
      'Vulnerability Scanning (monthly)',
      'Community Support',
      'Single Domain Coverage',
    ],
    notIncluded: [
      'Incident Response',
      'Penetration Testing',
      'Dedicated Account Manager',
      'Custom Integrations',
      'Compliance Auditing',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$2,499',
    period: '/month',
    description: 'Advanced protection for growing organizations',
    features: [
      'Everything in Basic',
      'Real-time Threat Intelligence',
      'Incident Response (4h SLA)',
      'Vulnerability Scanning (weekly)',
      'Penetration Testing (quarterly)',
      'Priority Support',
      'Multi-Domain Coverage',
      'API Access',
    ],
    notIncluded: [
      'Dedicated Account Manager',
      'Custom Compliance Auditing',
      'On-site Consultation',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-spectrum security for large enterprises',
    features: [
      'Everything in Professional',
      'Dedicated Account Manager',
      '24/7 Incident Response (1h SLA)',
      'Continuous Penetration Testing',
      'SOC2 / ISO27001 Auditing',
      'Custom Compliance Frameworks',
      'On-site Security Consultation',
      'Custom Integrations & APIs',
      'Threat Hunting Team',
      'Executive Dashboard',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const comparisonFeatures = [
  { name: 'Threat Monitoring', basic: '24/7', pro: '24/7 Advanced', enterprise: '24/7 + Threat Hunting' },
  { name: 'Response Time', basic: '24 hours', pro: '4 hours', enterprise: '1 hour' },
  { name: 'Vulnerability Scans', basic: 'Monthly', pro: 'Weekly', enterprise: 'Continuous' },
  { name: 'Penetration Testing', basic: false, pro: 'Quarterly', enterprise: 'Continuous' },
  { name: 'Incident Response', basic: false, pro: true, enterprise: 'Dedicated Team' },
  { name: 'Compliance Audits', basic: false, pro: false, enterprise: true },
  { name: 'API Access', basic: false, pro: true, enterprise: 'Custom Endpoints' },
  { name: 'Support', basic: 'Community', pro: 'Priority', enterprise: 'Dedicated Manager' },
  { name: 'Domains Covered', basic: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'Custom Reports', basic: false, pro: true, enterprise: 'Executive Dashboard' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CISO',
    company: 'TechVenture Inc.',
    text: 'PYRA-SOLUTION transformed our security posture. Their threat intelligence platform detected an APT that our previous vendor missed for months. The real-time alerts and actionable insights are invaluable.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'VP Engineering',
    company: 'DataStream Corp',
    text: 'The penetration testing team uncovered critical vulnerabilities in our infrastructure. Their detailed reports and remediation guidance helped us achieve SOC2 compliance in record time.',
    rating: 5,
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Director of Security',
    company: 'HealthFirst Systems',
    text: 'In healthcare, security is patient safety. PYRA-SOLUTION understands this. Their HIPAA-compliant monitoring and incident response capabilities give us confidence in protecting sensitive data.',
    rating: 5,
  },
  {
    name: 'James Park',
    role: 'CTO',
    company: 'FinLedger',
    text: 'We switched to PYRA-SOLUTION after a security breach. Within weeks, their platform identified and blocked multiple attack attempts. The ROI on this investment has been remarkable.',
    rating: 5,
  },
]

export default function Services() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 3000)
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Security <span className="text-cyber-blue">Services</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the protection level that fits your organization. All plans include our core threat detection engine.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${
                plan.highlighted
                  ? 'border-2 border-cyber-blue shadow-glow'
                  : 'border border-cyber-border'
              }`}
              style={{ background: plan.highlighted ? 'rgba(0, 128, 255, 0.05)' : 'rgba(20, 25, 35, 0.6)' }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 py-1.5 bg-cyber-blue text-center">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Most Popular</span>
                </div>
              )}
              <div className={`p-6 ${plan.highlighted ? 'pt-12' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-cyber-blue' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <button
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-cyber-blue text-white hover:bg-cyber-blue/80 shadow-glow'
                      : 'border border-cyber-border text-gray-300 hover:border-cyber-blue/50 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="px-6 pb-6">
                <div className="border-t border-cyber-border pt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-green-400 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm opacity-40">
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl overflow-hidden mb-16"
        >
          <div className="p-6 border-b border-cyber-border">
            <h2 className="text-xl font-bold text-white">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-border bg-cyber-surface/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Feature</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-400 uppercase">Basic</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-cyber-blue uppercase">Professional</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-cyber-gold uppercase">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={feature.name} className={`border-b border-cyber-border/50 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="px-6 py-3 text-sm text-gray-300">{feature.name}</td>
                    <td className="px-6 py-3 text-center">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? <Check size={14} className="text-green-400 mx-auto" /> : <span className="text-gray-600">-</span>
                      ) : (
                        <span className="text-gray-400 text-xs">{feature.basic}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? <Check size={14} className="text-green-400 mx-auto" /> : <span className="text-gray-600">-</span>
                      ) : (
                        <span className="text-gray-400 text-xs">{feature.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? <Check size={14} className="text-green-400 mx-auto" /> : <span className="text-gray-600">-</span>
                      ) : (
                        <span className="text-gray-400 text-xs">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6 mb-16"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">What Our Clients Say</h2>
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-cyber-gold fill-cyber-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 italic leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-medium">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-lg border border-cyber-border text-gray-400 hover:text-white hover:border-cyber-blue/50 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial ? 'bg-cyber-blue w-6' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-lg border border-cyber-border text-gray-400 hover:text-white hover:border-cyber-blue/50 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6 max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-bold text-white mb-2 text-center">Contact Us</h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Get in touch for custom enterprise solutions or any questions
          </p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <Check size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Company</label>
                <div className="relative">
                  <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50"
                    placeholder="Your company"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Message</label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3 top-3 text-gray-500" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-cyber-blue text-white font-medium rounded-lg hover:bg-cyber-blue/80 transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

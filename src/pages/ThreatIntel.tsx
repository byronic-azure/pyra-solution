import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Shield, AlertTriangle, Eye, Clock,
  ChevronDown, ChevronUp, Database, UserX
} from 'lucide-react'

interface ThreatFeed {
  id: number
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  source: string
  date: string
  description: string
  iocs: string[]
}

const threatFeeds: ThreatFeed[] = [
  {
    id: 1,
    title: 'Lazarus Group Active Campaign Targeting Crypto Exchanges',
    severity: 'critical',
    category: 'APT',
    source: 'MITRE ATT&CK',
    date: '2024-01-15',
    description: 'North Korean APT group Lazarus has been observed conducting sophisticated attacks against cryptocurrency exchanges using supply chain compromise and social engineering tactics.',
    iocs: ['185.220.101.33', 'malware-crypto.xyz', 'apt41.backdoor.exe'],
  },
  {
    id: 2,
    title: 'New Zero-Day in Apache Struts (CVE-2024-1234)',
    severity: 'critical',
    category: 'Zero-Day',
    source: 'NVD',
    date: '2024-01-14',
    description: 'A critical remote code execution vulnerability has been discovered in Apache Struts 2.5.x allowing unauthenticated attackers to execute arbitrary commands.',
    iocs: ['CVE-2024-1234', 'Apache Struts 2.5.0 - 2.5.32'],
  },
  {
    id: 3,
    title: 'LockBit 3.0 Ransomware Infrastructure Disrupted',
    severity: 'high',
    category: 'Ransomware',
    source: 'FBI Flash',
    date: '2024-01-13',
    description: 'International law enforcement operation has disrupted significant portions of the LockBit 3.0 ransomware infrastructure, though affiliates remain active.',
    iocs: ['lockbit-blog.xxx', 'Tor .onion services'],
  },
  {
    id: 4,
    title: 'OilRig APT Targeting Middle East Telecoms',
    severity: 'high',
    category: 'APT',
    source: 'CrowdStrike',
    date: '2024-01-12',
    description: 'Iranian APT group OilRig has launched a new campaign against telecommunications providers in the Middle East using updated BONDUPDATER malware.',
    iocs: ['update-checker[.]com', 'ms-office-update[.]net'],
  },
  {
    id: 5,
    title: 'QBot Banking Trojan Resurgence Detected',
    severity: 'high',
    category: 'Malware',
    source: 'Proofpoint',
    date: '2024-01-11',
    description: 'Despite takedown efforts, new variants of QBot banking trojan have been observed in phishing campaigns targeting financial institutions.',
    iocs: ['qbot-distribution[.]com', 'invoice-[0-9]+.pdf.exe'],
  },
  {
    id: 6,
    title: 'Fortinet FortiOS SSL VPN Vulnerability',
    severity: 'medium',
    category: 'Vulnerability',
    source: 'Fortinet PSIRT',
    date: '2024-01-10',
    description: 'A heap-based buffer overflow vulnerability in FortiOS SSL VPN may allow a remote unauthenticated attacker to crash the VPN service.',
    iocs: ['CVE-2024-21762', 'FortiOS 7.0.0 - 7.0.12'],
  },
]

interface CVE {
  id: string
  severity: string
  cvss: number
  description: string
  affected: string
  published: string
}

const cveDatabase: CVE[] = [
  { id: 'CVE-2024-1234', severity: 'critical', cvss: 9.8, description: 'Apache Struts RCE via OGNL injection', affected: 'Apache Struts 2.5.x', published: '2024-01-14' },
  { id: 'CVE-2024-5678', severity: 'critical', cvss: 9.6, description: 'Microsoft Exchange Server privilege escalation', affected: 'Exchange 2019 CU12', published: '2024-01-13' },
  { id: 'CVE-2024-9012', severity: 'high', cvss: 8.4, description: 'Linux kernel use-after-free in netfilter', affected: 'Linux 5.15 - 6.6', published: '2024-01-12' },
  { id: 'CVE-2024-3456', severity: 'high', cvss: 7.8, description: 'Adobe Acrobat Reader arbitrary code execution', affected: 'Acrobat Reader DC', published: '2024-01-11' },
  { id: 'CVE-2024-7890', severity: 'medium', cvss: 6.5, description: 'WordPress plugin SQL injection', affected: 'WPForms < 1.8.5', published: '2024-01-10' },
  { id: 'CVE-2024-2345', severity: 'medium', cvss: 5.3, description: 'Node.js path traversal vulnerability', affected: 'Node.js 18.x, 20.x', published: '2024-01-09' },
  { id: 'CVE-2024-6789', severity: 'low', cvss: 3.7, description: 'Django information disclosure', affected: 'Django 4.2.x', published: '2024-01-08' },
  { id: 'CVE-2024-4567', severity: 'high', cvss: 8.1, description: 'Jenkins arbitrary file read vulnerability', affected: 'Jenkins 2.426.x', published: '2024-01-07' },
]

interface ThreatActor {
  name: string
  aliases: string[]
  origin: string
  motivation: string
  firstSeen: string
  targets: string[]
  techniques: string[]
  description: string
}

const threatActors: ThreatActor[] = [
  {
    name: 'Lazarus Group',
    aliases: ['Hidden Cobra', 'APT38', 'Zinc'],
    origin: 'North Korea',
    motivation: 'Financial Gain / Espionage',
    firstSeen: '2009',
    targets: ['Financial Institutions', 'Cryptocurrency Exchanges', 'Defense'],
    techniques: ['T1566 - Phishing', 'T1195 - Supply Chain', 'T1071 - C2 Channels'],
    description: 'A North Korean state-sponsored APT group conducting cyber espionage and financially motivated operations since 2009. Known for the Sony Pictures hack and WannaCry ransomware.',
  },
  {
    name: 'APT41',
    aliases: ['Winnti', 'Barium', 'Wicked Panda'],
    origin: 'China',
    motivation: 'Espionage / Financial',
    firstSeen: '2012',
    targets: ['Healthcare', 'Technology', 'Telecommunications', 'Gaming'],
    techniques: ['T1078 - Valid Accounts', 'T1053 - Scheduled Tasks', 'T1021 - Remote Services'],
    description: 'A Chinese state-sponsored espionage group that also conducts financially motivated cybercrime. Known for supply chain attacks and sophisticated malware.',
  },
  {
    name: 'Fancy Bear',
    aliases: ['APT28', 'Sofacy', 'Strontium'],
    origin: 'Russia',
    motivation: 'Espionage',
    firstSeen: '2004',
    targets: ['Government', 'Military', 'NGOs', 'Media'],
    techniques: ['T1566 - Phishing', 'T1203 - Exploitation', 'T1071 - C2 Channels'],
    description: 'A Russian military intelligence (GRU) cyber espionage group. Known for targeting NATO, the DNC, and various Olympic organizations.',
  },
]

interface TimelineEvent {
  date: string
  title: string
  description: string
  severity: string
}

const timelineEvents: TimelineEvent[] = [
  { date: '2024-01-15', title: 'Critical CVE Published', description: 'CVE-2024-1234 Apache Struts RCE disclosed with public PoC', severity: 'critical' },
  { date: '2024-01-14', title: 'Lazarus Campaign Detected', description: 'Crypto exchange targeting campaign attributed to Lazarus Group', severity: 'critical' },
  { date: '2024-01-13', title: 'LockBit Infrastructure Takedown', description: 'International operation disrupts LockBit 3.0 infrastructure', severity: 'high' },
  { date: '2024-01-12', title: 'OilRig Telecom Targeting', description: 'New BONDUPDATER variants targeting Middle East telecoms', severity: 'high' },
  { date: '2024-01-11', title: 'QBot Resurgence', description: 'New QBot variants observed in financial phishing campaigns', severity: 'high' },
  { date: '2024-01-10', title: 'Fortinet VPN Vulnerability', description: 'Heap overflow in FortiOS SSL VPN disclosed', severity: 'medium' },
  { date: '2024-01-09', title: 'WordPress Plugin Flaw', description: 'SQL injection vulnerability in popular WPForms plugin', severity: 'medium' },
  { date: '2024-01-08', title: 'Django Info Disclosure', description: 'Low severity information leak in Django framework', severity: 'low' },
]

const severityConfig: Record<string, { color: string; bg: string; border: string; icon: typeof AlertTriangle }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', icon: AlertTriangle },
  high: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', icon: AlertTriangle },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', icon: Eye },
  low: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', icon: Eye },
}

const severityOrder = ['critical', 'high', 'medium', 'low']

export default function ThreatIntel() {
  const [activeTab, setActiveTab] = useState<'feeds' | 'cve' | 'actors' | 'timeline'>('feeds')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null)
  const [expandedActor, setExpandedActor] = useState<number | null>(null)

  const filteredFeeds = threatFeeds.filter((feed) => {
    const matchesSeverity = severityFilter === 'all' || feed.severity === severityFilter
    const matchesSearch = searchQuery === '' ||
      feed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeverity && matchesSearch
  })

  const filteredCVEs = cveDatabase.filter((cve) => {
    const matchesSeverity = severityFilter === 'all' || cve.severity === severityFilter
    const matchesSearch = searchQuery === '' ||
      cve.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cve.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeverity && matchesSearch
  })

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Threat <span className="text-cyber-blue">Intelligence</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Comprehensive threat feeds, CVE database, and actor profiles</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'feeds' as const, label: 'Threat Feeds', icon: Shield },
            { key: 'cve' as const, label: 'CVE Database', icon: Database },
            { key: 'actors' as const, label: 'Threat Actors', icon: UserX },
            { key: 'timeline' as const, label: 'Timeline', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-cyber-blue text-white shadow-glow'
                  : 'bg-cyber-surface text-gray-400 border border-cyber-border hover:border-cyber-blue/50'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search threats, CVEs, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50"
            />
          </div>
          <div className="flex gap-2">
            {['all', ...severityOrder].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${
                  severityFilter === sev
                    ? severityConfig[sev]?.border
                      ? `${severityConfig[sev].bg} ${severityConfig[sev].color} ${severityConfig[sev].border}`
                      : 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30'
                    : 'bg-cyber-surface text-gray-500 border-cyber-border hover:border-gray-600'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'feeds' && (
            <motion.div key="feeds" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {filteredFeeds.map((feed) => {
                const config = severityConfig[feed.severity]
                const isExpanded = expandedThreat === feed.id
                return (
                  <motion.div
                    key={feed.id}
                    layout
                    className="glass-card rounded-xl overflow-hidden"
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedThreat(isExpanded ? null : feed.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${config.bg} ${config.color} ${config.border} uppercase`}>
                              {feed.severity}
                            </span>
                            <span className="text-xs text-gray-500">{feed.category}</span>
                            <span className="text-xs text-gray-600">|</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock size={10} /> {feed.date}
                            </span>
                          </div>
                          <h3 className="text-white font-medium text-sm mb-1">{feed.title}</h3>
                          <p className="text-gray-400 text-xs">{feed.source}</p>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-cyber-border pt-4">
                            <p className="text-gray-300 text-sm mb-3">{feed.description}</p>
                            <div className="mb-2">
                              <span className="text-xs text-gray-500 font-medium">IOCs:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {feed.iocs.map((ioc) => (
                                <span key={ioc} className="px-2 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded text-xs text-cyber-blue font-mono">
                                  {ioc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'cve' && (
            <motion.div key="cve" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyber-border">
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">CVE ID</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Severity</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">CVSS</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Description</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Affected</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Published</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCVEs.map((cve) => {
                        const config = severityConfig[cve.severity]
                        return (
                          <tr key={cve.id} className="border-b border-cyber-border/50 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-3">
                              <span className="text-cyber-blue font-mono text-sm">{cve.id}</span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${config.bg} ${config.color} ${config.border} uppercase`}>
                                {cve.severity}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-cyber-blue rounded-full" style={{ width: `${cve.cvss * 10}%` }} />
                                </div>
                                <span className="text-white text-xs font-mono">{cve.cvss}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-300 text-sm max-w-xs truncate">{cve.description}</td>
                            <td className="px-5 py-3 text-gray-400 text-xs">{cve.affected}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs">{cve.published}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'actors' && (
            <motion.div key="actors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {threatActors.map((actor, index) => {
                const isExpanded = expandedActor === index
                return (
                  <motion.div key={actor.name} layout className="glass-card rounded-xl overflow-hidden">
                    <div className="p-5 cursor-pointer" onClick={() => setExpandedActor(isExpanded ? null : index)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                            <UserX size={18} className="text-red-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{actor.name}</h3>
                            <p className="text-gray-400 text-xs">{actor.aliases.join(', ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{actor.origin}</span>
                          {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-5 pb-5 border-t border-cyber-border pt-4 space-y-4">
                            <p className="text-gray-300 text-sm">{actor.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <span className="text-xs text-gray-500 block mb-1">Motivation</span>
                                <span className="text-white text-sm">{actor.motivation}</span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 block mb-1">First Seen</span>
                                <span className="text-white text-sm">{actor.firstSeen}</span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 block mb-1">Targets</span>
                                <div className="flex flex-wrap gap-1">
                                  {actor.targets.map((t) => (
                                    <span key={t} className="px-1.5 py-0.5 bg-cyber-surface rounded text-xs text-gray-300">{t}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block mb-2">MITRE ATT&CK Techniques</span>
                              <div className="flex flex-wrap gap-2">
                                {actor.techniques.map((tech) => (
                                  <span key={tech} className="px-2 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded text-xs text-cyber-blue font-mono">{tech}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card rounded-xl p-6">
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-cyber-border" />
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => {
                    const config = severityConfig[event.severity]
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative flex items-start gap-4 ml-2"
                      >
                        <div className={`relative z-10 w-3 h-3 rounded-full mt-1.5 ${config.bg} border-2 ${config.border.replace('border-', 'border-')}`} style={{ borderColor: 'currentColor' }}>
                          <div className={`w-full h-full rounded-full ${config.color}`} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500 font-mono">{event.date}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${config.bg} ${config.color} uppercase`}>
                              {event.severity}
                            </span>
                          </div>
                          <h4 className="text-white text-sm font-medium">{event.title}</h4>
                          <p className="text-gray-400 text-xs mt-0.5">{event.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'
import {
  Shield, AlertTriangle, Activity, Wifi, Lock, Unlock,
  Eye, Globe, Radio
} from 'lucide-react'

const threatData = [
  { time: '00:00', blocked: 45, detected: 62 },
  { time: '02:00', blocked: 32, detected: 48 },
  { time: '04:00', blocked: 28, detected: 40 },
  { time: '06:00', blocked: 55, detected: 78 },
  { time: '08:00', blocked: 89, detected: 120 },
  { time: '10:00', blocked: 112, detected: 156 },
  { time: '12:00', blocked: 95, detected: 134 },
  { time: '14:00', blocked: 134, detected: 189 },
  { time: '16:00', blocked: 156, detected: 210 },
  { time: '18:00', blocked: 120, detected: 168 },
  { time: '20:00', blocked: 78, detected: 105 },
  { time: '22:00', blocked: 56, detected: 82 },
]

const attackTypes = [
  { name: 'DDoS', value: 35, color: '#0080FF' },
  { name: 'Malware', value: 25, color: '#C0A060' },
  { name: 'Phishing', value: 20, color: '#FF6B6B' },
  { name: 'Intrusion', value: 15, color: '#4ECDC4' },
  { name: 'Other', value: 5, color: '#8B949E' },
]

const liveAlerts = [
  { id: 1, severity: 'critical', message: 'Brute force attack detected on SSH port 22', source: '45.142.212.100', time: '2s ago', icon: Lock },
  { id: 2, severity: 'high', message: 'SQL injection attempt blocked on /api/login', source: '185.220.101.33', time: '8s ago', icon: AlertTriangle },
  { id: 3, severity: 'medium', message: 'Suspicious file upload detected', source: '192.168.1.45', time: '15s ago', icon: Eye },
  { id: 4, severity: 'critical', message: 'DDoS attack mitigated - 2.4Gbps', source: 'Multiple', time: '32s ago', icon: Shield },
  { id: 5, severity: 'high', message: 'Ransomware signature detected in email', source: 'mail-ext.com', time: '45s ago', icon: AlertTriangle },
  { id: 6, severity: 'low', message: 'Port scan detected from unknown host', source: '103.54.12.8', time: '1m ago', icon: Activity },
  { id: 7, severity: 'medium', message: 'Failed login attempt (5x) - admin account', source: '10.0.0.15', time: '1m ago', icon: Unlock },
  { id: 8, severity: 'high', message: 'C2 beacon traffic detected', source: '172.16.0.22', time: '2m ago', icon: Radio },
]

const countryData = [
  { country: 'CN', attacks: 3420, x: 75, y: 35 },
  { country: 'RU', attacks: 2890, x: 65, y: 25 },
  { country: 'US', attacks: 2150, x: 20, y: 35 },
  { country: 'KP', attacks: 1870, x: 80, y: 32 },
  { country: 'BR', attacks: 1230, x: 30, y: 65 },
  { country: 'IN', attacks: 980, x: 68, y: 42 },
  { country: 'IR', attacks: 870, x: 60, y: 38 },
  { country: 'DE', attacks: 650, x: 50, y: 28 },
  { country: 'GB', attacks: 520, x: 45, y: 25 },
  { country: 'FR', attacks: 480, x: 48, y: 30 },
]

function SecurityScore() {
  const [score, setScore] = useState(0)
  const targetScore = 94

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval)
            return targetScore
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = score >= 90 ? '#4ECDC4' : score >= 70 ? '#C0A060' : '#FF6B6B'

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#1E2530" strokeWidth="12" />
          <motion.circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Security Score</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${score >= 90 ? 'bg-[#4ECDC4]' : 'bg-[#C0A060]'}`} />
        <span className="text-sm text-gray-300">
          {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Attention'}
        </span>
      </div>
    </div>
  )
}

function WorldMap() {
  const maxAttacks = Math.max(...countryData.map((c) => c.attacks))

  return (
    <div className="relative w-full aspect-[2/1] bg-[#0a0d12] rounded-lg overflow-hidden border border-cyber-border">
      <svg viewBox="0 0 100 50" className="w-full h-full opacity-40">
        <path
          d="M15,12 Q20,8 25,12 T35,10 Q40,12 45,10 T55,8 Q60,10 65,12 T75,10 Q80,12 85,10"
          fill="none" stroke="#1E2530" strokeWidth="0.3"
        />
        <ellipse cx="20" cy="20" rx="15" ry="10" fill="#1E2530" />
        <ellipse cx="50" cy="18" rx="12" ry="8" fill="#1E2530" />
        <ellipse cx="75" cy="20" rx="18" ry="12" fill="#1E2530" />
        <ellipse cx="30" cy="40" rx="8" ry="12" fill="#1E2530" />
        <ellipse cx="70" cy="38" rx="10" ry="8" fill="#1E2530" />
      </svg>
      {countryData.map((country) => {
        const intensity = country.attacks / maxAttacks
        const size = 2 + intensity * 4
        return (
          <div
            key={country.country}
            className="absolute animate-pulse-glow"
            style={{
              left: `${country.x}%`,
              top: `${country.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="rounded-full bg-cyber-blue/60 border border-cyber-blue"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: `0 0 ${size * 2}px rgba(0, 128, 255, ${intensity * 0.5})`,
              }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
              <span className="text-[8px] text-gray-400">{country.country}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const severityColors: Record<string, string> = {
  critical: 'text-red-400 bg-red-400/10 border-red-400/30',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  low: 'text-green-400 bg-green-400/10 border-green-400/30',
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState(liveAlerts)

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => {
        const newAlert = {
          id: Date.now(),
          severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
          message: ['New malware signature detected', 'Port scan blocked', 'Suspicious login attempt', 'DNS tunneling detected'][Math.floor(Math.random() * 4)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          time: 'Just now',
          icon: [Lock, AlertTriangle, Eye, Shield][Math.floor(Math.random() * 4)],
        }
        return [newAlert, ...prev.slice(0, 9)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Security <span className="text-cyber-blue">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Real-time threat monitoring and network analytics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: AlertTriangle, label: 'Active Threats', value: '23', color: 'text-red-400', change: '+5 today' },
            { icon: Shield, label: 'Blocked Attacks', value: '1,247', color: 'text-cyber-blue', change: '+89 today' },
            { icon: Activity, label: 'System Health', value: '99.9%', color: 'text-green-400', change: 'Optimal' },
            { icon: Wifi, label: 'Network Status', value: 'Secure', color: 'text-cyber-gold', change: 'All systems green' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-xs text-gray-500">{metric.change}</span>
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-xl p-6"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Activity size={16} className="text-cyber-blue" />
              Threat Activity (24h)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0080FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="detectedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C0A060" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C0A060" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2530" />
                <XAxis dataKey="time" stroke="#8B949E" fontSize={12} />
                <YAxis stroke="#8B949E" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#141923', border: '1px solid #1E2530', borderRadius: '8px' }}
                  labelStyle={{ color: '#E6EDF3' }}
                />
                <Area type="monotone" dataKey="blocked" stroke="#0080FF" fill="url(#blockedGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="detected" stroke="#C0A060" fill="url(#detectedGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Security Score</h3>
            <SecurityScore />
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe size={16} className="text-cyber-blue" />
              Attack Origins
            </h3>
            <WorldMap />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Attack Types</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={attackTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {attackTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#141923', border: '1px solid #1E2530', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2">
              {attackTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-gray-400">{type.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live Alert Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Radio size={16} className="text-red-400 animate-pulse" />
              Live Threat Feed
            </h3>
            <span className="text-xs text-gray-500">Real-time updates</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${severityColors[alert.severity]} transition-all hover:bg-white/5`}
              >
                <alert.icon size={16} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">{alert.message}</p>
                  <p className="text-xs text-gray-500">Source: {alert.source}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

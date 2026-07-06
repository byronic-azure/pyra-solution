import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Terminal, Scan, KeyRound, Lock, Unlock, Play, Copy,
  CheckCircle, XCircle, Shield
} from 'lucide-react'

// Terminal Component
function TerminalTool() {
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error'; text: string }[]>([
    { type: 'output', text: 'PYRA-SOLUTION Security Toolkit v3.2.1' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  help          - Show this help message',
      '  scan          - Run quick port scan',
      '  whois <ip>    - Perform WHOIS lookup',
      '  ping <host>   - Ping a host',
      '  traceroute    - Show network path',
      '  dns <domain>  - DNS lookup',
      '  clear         - Clear terminal',
      '  banner        - Show banner grabber',
      '  ssl <host>    - SSL certificate check',
      '  version       - Show toolkit version',
    ],
    clear: () => [],
    version: () => ['PYRA-SOLUTION Security Toolkit v3.2.1', 'Build: 2024.01.15', 'Node: v20.11.0'],
    scan: () => [
      'Starting port scan on target 192.168.1.1...',
      'Scanning ports 1-1000...',
      'PORT     STATE    SERVICE',
      '22/tcp   open     ssh',
      '53/tcp   open     domain',
      '80/tcp   open     http',
      '443/tcp  open     https',
      '8080/tcp open     http-proxy',
      'Scan completed in 2.34s. 5 ports open.',
    ],
    whois: () => [
      'WHOIS lookup for 185.220.101.33...',
      'OrgName:       Example Hosting Ltd',
      'OrgId:         EXHL',
      'Address:       123 Cyber Street',
      'City:          Moscow',
      'Country:       RU',
      'NetRange:      185.220.101.0 - 185.220.101.255',
      ' Abuse contact: abuse@examplehost.com',
    ],
    ping: () => [
      'PING 8.8.8.8 (8.8.8.8): 56 data bytes',
      '64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=14.2 ms',
      '64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=13.8 ms',
      '64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=14.1 ms',
      '64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=13.9 ms',
      '--- 8.8.8.8 ping statistics ---',
      '4 packets transmitted, 4 received, 0% packet loss, time 3ms',
    ],
    traceroute: () => [
      'traceroute to 1.1.1.1 (1.1.1.1), 30 hops max',
      ' 1  192.168.1.1   1.2 ms',
      ' 2  10.0.0.1      3.5 ms',
      ' 3  isp-gw.net    8.1 ms',
      ' 4  core-1.isp    12.3 ms',
      ' 5  ix-peering    14.7 ms',
      ' 6  1.1.1.1       15.1 ms',
      'Trace complete.',
    ],
    dns: () => [
      'DNS lookup for pyra-solution.com...',
      'A Record:     104.21.45.123',
      'A Record:     104.21.45.124',
      'MX Record:    10 mail.pyra-solution.com',
      'TXT Record:   "v=spf1 include:_spf.google.com ~all"',
      'NS Record:    ns1.cloudflare.com',
      'NS Record:    ns2.cloudflare.com',
      'CNAME:        (none)',
    ],
    banner: () => [
      'Connecting to 192.168.1.1:80...',
      'HTTP/1.1 200 OK',
      'Server: nginx/1.24.0',
      'Date: Mon, 15 Jan 2024 10:30:00 GMT',
      'Content-Type: text/html',
      'X-Powered-By: PHP/8.2.0',
      'X-Frame-Options: SAMEORIGIN',
      'Connection: close',
      'Banner grab complete.',
    ],
    ssl: () => [
      'SSL Certificate check for cloudflare.com...',
      'Subject: CN = sni.cloudflaressl.com',
      'Issuer:  C = US, O = Cloudflare, CN = Cloudflare Inc ECC CA-3',
      'Validity:',
      '  Not Before: Jan  1 00:00:00 2024 GMT',
      '  Not After : Dec 31 23:59:59 2024 GMT',
      'Serial: 01:23:45:67:89:AB:CD:EF',
      'Signature: ecdsa-with-SHA256',
      'TLS Version: TLSv1.3',
      'Cipher: TLS_AES_256_GCM_SHA384',
    ],
  }

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const newHistory = [...history, { type: 'input' as const, text: `$ ${cmd}` }]

    const baseCmd = trimmed.split(' ')[0]

    if (baseCmd === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared.' }])
      setInput('')
      return
    }

    if (commands[baseCmd]) {
      const output = commands[baseCmd]()
      output.forEach((line) => newHistory.push({ type: 'output', text: line }))
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${baseCmd}. Type "help" for available commands.` })
    }

    setHistory(newHistory)
    setInput('')
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-cyber-border">
      <div className="flex items-center justify-between px-4 py-3 bg-cyber-surface border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyber-blue" />
          <span className="text-sm text-white font-medium">Security Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>
      <div className="p-4 h-80 overflow-y-auto font-mono text-xs bg-[#0a0d12]">
        {history.map((entry, i) => (
          <div key={i} className={`mb-0.5 ${
            entry.type === 'input' ? 'text-cyber-blue' :
            entry.type === 'error' ? 'text-red-400' :
            entry.type === 'output' && entry.text.startsWith('PYRA') ? 'text-cyber-gold' :
            'text-gray-300'
          }`}>
            {entry.text}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cyber-blue">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="flex-1 bg-transparent text-gray-300 outline-none font-mono text-xs"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

// Network Scanner
function NetworkScanner() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{ port: number; state: string; service: string }[]>([])

  const startScan = () => {
    setScanning(true)
    setProgress(0)
    setResults([])

    const ports = [
      { port: 21, service: 'ftp' },
      { port: 22, service: 'ssh' },
      { port: 25, service: 'smtp' },
      { port: 53, service: 'domain' },
      { port: 80, service: 'http' },
      { port: 110, service: 'pop3' },
      { port: 143, service: 'imap' },
      { port: 443, service: 'https' },
      { port: 3306, service: 'mysql' },
      { port: 3389, service: 'rdp' },
      { port: 5432, service: 'postgresql' },
      { port: 8080, service: 'http-proxy' },
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i >= ports.length) {
        clearInterval(interval)
        setScanning(false)
        setProgress(100)
        return
      }
      const isOpen = Math.random() > 0.5
      setResults((prev) => [...prev, {
        port: ports[i].port,
        state: isOpen ? 'open' : 'filtered',
        service: ports[i].service,
      }])
      setProgress(Math.round(((i + 1) / ports.length) * 100))
      i++
    }, 300)
  }

  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border">
      <div className="flex items-center gap-2 mb-4">
        <Scan size={16} className="text-cyber-blue" />
        <h3 className="text-white font-medium">Network Scanner</h3>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          defaultValue="192.168.1.1"
          className="flex-1 px-3 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white font-mono focus:outline-none focus:border-cyber-blue/50"
        />
        <button
          onClick={startScan}
          disabled={scanning}
          className="px-4 py-2 bg-cyber-blue text-white text-sm font-medium rounded-lg hover:bg-cyber-blue/80 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Play size={14} /> {scanning ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      {scanning && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Scanning ports...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyber-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
          <div className="flex text-gray-500 border-b border-cyber-border pb-1">
            <span className="w-16">PORT</span>
            <span className="w-16">STATE</span>
            <span>SERVICE</span>
          </div>
          {results.map((r) => (
            <div key={r.port} className="flex">
              <span className="w-16 text-gray-300">{r.port}/tcp</span>
              <span className={`w-16 ${r.state === 'open' ? 'text-green-400' : 'text-yellow-400'}`}>{r.state}</span>
              <span className="text-gray-400">{r.service}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Password Strength Analyzer
function PasswordAnalyzer() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const analyzePassword = (pwd: string) => {
    let score = 0
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    }

    score = Object.values(checks).filter(Boolean).length

    const messages = [
      'Very Weak - Easily cracked in seconds',
      'Weak - Crackable in minutes',
      'Fair - Crackable in hours',
      'Good - Crackable in months',
      'Strong - Crackable in years',
      'Very Strong - Virtually uncrackable',
    ]

    const colors = ['text-red-500', 'text-red-400', 'text-yellow-400', 'text-cyber-gold', 'text-green-400', 'text-green-300']
    const barColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-cyber-gold', 'bg-green-400', 'bg-green-300']

    return { score, checks, message: messages[score], color: colors[score], barColor: barColors[score] }
  }

  const analysis = analyzePassword(password)

  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border">
      <div className="flex items-center gap-2 mb-4">
        <KeyRound size={16} className="text-cyber-blue" />
        <h3 className="text-white font-medium">Password Strength</h3>
      </div>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to analyze..."
          className="w-full px-3 py-2.5 pr-20 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {password && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Strength</span>
              <span className={analysis.color}>{analysis.message}</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${analysis.barColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${(analysis.score / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(analysis.checks).map(([key, passed]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                {passed ? <CheckCircle size={12} className="text-green-400" /> : <XCircle size={12} className="text-gray-600" />}
                <span className={passed ? 'text-gray-300' : 'text-gray-600'}>
                  {key === 'length' ? '12+ characters' :
                   key === 'uppercase' ? 'Uppercase (A-Z)' :
                   key === 'lowercase' ? 'Lowercase (a-z)' :
                   key === 'number' ? 'Numbers (0-9)' :
                   'Special chars (!@#$%)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Encryption Tool
function EncryptionTool() {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [algorithm, setAlgorithm] = useState<'aes' | 'base64' | 'rot13'>('aes')
  const [result, setResult] = useState('')
  const [key, setKey] = useState('')

  const handleCrypto = async () => {
    if (!text) return

    if (algorithm === 'base64') {
      if (mode === 'encrypt') {
        setResult(btoa(text))
      } else {
        try {
          setResult(atob(text))
        } catch {
          setResult('Error: Invalid Base64 input')
        }
      }
    } else if (algorithm === 'rot13') {
      const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= 'Z' ? 65 : 97
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
      })
      setResult(rot13(text))
    } else if (algorithm === 'aes') {
      const simulated = mode === 'encrypt'
        ? `[AES-256-GCM] ${btoa(text).split('').reverse().join('')}::${Math.random().toString(36).substring(7)}`
        : text.startsWith('[AES-256-GCM]') ? atob(text.replace('[AES-256-GCM]', '').split('::')[0].split('').reverse().join('')) : 'Error: Invalid AES ciphertext'
      setResult(simulated)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border">
      <div className="flex items-center gap-2 mb-4">
        {mode === 'encrypt' ? <Lock size={16} className="text-cyber-blue" /> : <Unlock size={16} className="text-cyber-gold" />}
        <h3 className="text-white font-medium">Crypto Tool</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('encrypt')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'encrypt' ? 'bg-cyber-blue text-white' : 'bg-cyber-surface text-gray-400 border border-cyber-border'
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setMode('decrypt')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'decrypt' ? 'bg-cyber-gold text-black' : 'bg-cyber-surface text-gray-400 border border-cyber-border'
          }`}
        >
          Decrypt
        </button>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-400 mb-1 block">Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as 'aes' | 'base64' | 'rot13')}
          className="w-full px-3 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white focus:outline-none focus:border-cyber-blue/50"
        >
          <option value="aes">AES-256-GCM (Simulated)</option>
          <option value="base64">Base64</option>
          <option value="rot13">ROT13</option>
        </select>
      </div>

      {algorithm === 'aes' && (
        <div className="mb-3">
          <label className="text-xs text-gray-400 mb-1 block">Key (simulated)</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key..."
            className="w-full px-3 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50 font-mono"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="text-xs text-gray-400 mb-1 block">{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter text to decrypt...'}
          rows={3}
          className="w-full px-3 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/50 resize-none"
        />
      </div>

      <button
        onClick={handleCrypto}
        disabled={!text}
        className="w-full px-4 py-2 bg-cyber-blue text-white text-sm font-medium rounded-lg hover:bg-cyber-blue/80 transition-all disabled:opacity-50 mb-3 flex items-center justify-center gap-2"
      >
        {mode === 'encrypt' ? <Lock size={14} /> : <Unlock size={14} />}
        {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
      </button>

      {result && (
        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">Result</label>
          <div className="px-3 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-sm text-white font-mono break-all pr-10">
            {result}
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-6 p-1 text-gray-400 hover:text-white"
          >
            <Copy size={14} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Tools() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Security <span className="text-cyber-blue">Toolkit</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Interactive penetration testing and security analysis tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <TerminalTool />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <NetworkScanner />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <PasswordAnalyzer />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <EncryptionTool />
          </motion.div>
        </div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass-card rounded-xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield size={16} className="text-cyber-blue" />
            Tool Reference
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Terminal, title: 'Security Terminal', desc: 'Interactive CLI with common security commands' },
              { icon: Scan, title: 'Network Scanner', desc: 'Port scanning with service detection' },
              { icon: KeyRound, title: 'Password Analyzer', desc: 'Real-time strength assessment' },
              { icon: Lock, title: 'Crypto Tool', desc: 'Encrypt/decrypt with multiple algorithms' },
            ].map((tool) => (
              <div key={tool.title} className="p-4 bg-cyber-surface rounded-lg border border-cyber-border">
                <tool.icon size={18} className="text-cyber-blue mb-2" />
                <h4 className="text-white text-sm font-medium">{tool.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

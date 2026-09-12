import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Anchor,
  Ban,
  Brain,
  Cpu,
  Gauge,
  Lock,
  RefreshCw,
  ScrollText,
  Square,
  Unlock,
  Zap,
} from 'lucide-react'
import {
  C_CRITICAL,
  PHI_GATE,
  RUNG_MAX,
  jah,
  type EventKind,
  type JaHState,
  type Specialist,
} from '../lib/jah/engine'

function useJah(): JaHState {
  return useSyncExternalStore(jah.subscribe, jah.getState)
}

const fmtUptime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

const fmtClock = (at: number) =>
  new Date(at).toLocaleTimeString([], { hour12: false })

const EVENT_COLOR: Record<EventKind, string> = {
  sys: 'text-gray-500',
  poi: 'text-cyber-gold',
  mos: 'text-cyber-blue',
  seal: 'text-emerald-400',
  rl: 'text-cyber-blue/60',
}

function Chip({
  label,
  value,
  tone = 'dim',
}: {
  label: string
  value: string
  tone?: 'blue' | 'gold' | 'red' | 'dim'
}) {
  const toneClass =
    tone === 'gold'
      ? 'border-cyber-gold/40 bg-cyber-gold/5'
      : tone === 'blue'
        ? 'border-cyber-blue/40 bg-cyber-blue/10'
        : tone === 'red'
          ? 'border-destructive/40 bg-destructive/10'
          : 'border-cyber-border bg-cyber-surface/60'
  return (
    <div className={`flex items-center gap-2 rounded-md border px-3 py-1.5 ${toneClass}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">{label}</span>
      <span className={`font-mono text-xs font-semibold ${tone === 'dim' ? 'text-gray-300' : ''}`}>
        {value}
      </span>
    </div>
  )
}

function LoadBar({ value, gold }: { value: number; gold?: boolean }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-cyber-border">
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${gold ? 'bg-cyber-gold' : 'bg-cyber-blue'}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  )
}

function SpecialistCard({
  sp,
  disabled,
  onDispatch,
}: {
  sp: Specialist
  disabled: boolean
  onDispatch: (id: string) => void
}) {
  const stateTone =
    sp.state === 'ANCHORED'
      ? 'border-cyber-gold/40 bg-cyber-gold/10 text-cyber-gold'
      : sp.state === 'CONVERGED'
        ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400'
        : sp.state === 'RUNNING'
          ? 'border-cyber-blue/40 bg-cyber-blue/10 text-cyber-blue'
          : 'border-cyber-border text-gray-400'
  return (
    <div className="glass-card flex h-full flex-col gap-3 rounded-xl p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-sm font-bold tracking-[0.18em] text-white">{sp.name}</div>
          <div className="mt-0.5 text-xs leading-snug text-gray-500">{sp.role}</div>
        </div>
        <span className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest ${stateTone}`}>
          {sp.state}
        </span>
      </div>
      <LoadBar value={sp.state === 'IDLE' ? 0 : sp.progress} gold={sp.state === 'ANCHORED'} />
      <div className="min-h-[32px] font-mono text-[11px] leading-snug text-gray-400">
        {sp.artifact ?? 'no artifact staged'}
      </div>
      <button
        onClick={() => onDispatch(sp.id)}
        disabled={disabled || sp.state !== 'IDLE'}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-cyber-blue/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyber-blue transition-all hover:bg-cyber-blue/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Zap size={13} /> Dispatch
      </button>
    </div>
  )
}

function CoherenceRing({ coherence }: { coherence: number }) {
  const R = 56
  const circ = 2 * Math.PI * R
  const coherent = coherence >= PHI_GATE
  const gateAngle = PHI_GATE * 2 * Math.PI - Math.PI / 2
  const cos = Math.cos(gateAngle)
  const sin = Math.sin(gateAngle)
  return (
    <div className="relative mx-auto h-[140px] w-[140px]">
      <svg viewBox="0 0 140 140" className="h-full w-full" role="img" aria-label={`coherence ${coherence.toFixed(2)} against gate ${PHI_GATE}`}>
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke={coherent ? '#C0A060' : '#0080FF'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${coherence * circ} ${circ}`}
          transform="rotate(-90 70 70)"
          className="transition-all duration-500"
        />
        <line
          x1={70 + (R - 8) * cos}
          y1={70 + (R - 8) * sin}
          x2={70 + (R + 8) * cos}
          y2={70 + (R + 8) * sin}
          stroke="#C0A060"
          strokeWidth="2"
        />
        <text x="70" y="67" textAnchor="middle" className="fill-white font-mono text-[20px] font-bold">
          {coherence.toFixed(2)}
        </text>
        <text x="70" y="85" textAnchor="middle" className="fill-gray-500 font-mono text-[9px] tracking-[0.2em]">
          PHI
        </text>
      </svg>
    </div>
  )
}

const reinsBtnClass = (active: boolean, gold: boolean) =>
  `inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
    active
      ? gold
        ? 'border-cyber-gold/60 bg-cyber-gold/10 text-cyber-gold'
        : 'border-cyber-blue/60 bg-cyber-blue/10 text-cyber-blue'
      : 'border-cyber-border text-gray-400 hover:border-cyber-blue/40 hover:text-white'
  }`

export default function JaHRule() {
  const state = useJah()
  const [targetInput, setTargetInput] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [state.events.length])

  const alive = state.daemon === 'ACTIVE' || state.daemon === 'ENFORCING'
  const busy = state.daemon === 'SPAWNING'
  const locked = busy || alive
  const pending = state.specialists.find(sp => sp.state === 'CONVERGED')

  const summon = () => {
    if (!targetInput.trim()) return
    jah.summon(targetInput)
    setTargetInput('')
  }

  return (
    <div className="relative">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-cyber-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,128,255,0.08),transparent_60%)]" />
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 opacity-[0.14]"
        >
          <polygon points="100,18 182,164 18,164" fill="none" stroke="#0080FF" strokeWidth="1.5" />
          <polygon points="100,52 155,148 45,148" fill="none" stroke="#C0A060" strokeWidth="1.5" />
          <polygon points="100,88 128,136 72,136" fill="none" stroke="#0080FF" strokeWidth="1.5" />
        </svg>
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyber-blue">
              Sovereign Enforcement Plane
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              JaH<span className="text-cyber-gold">_</span>
              <span className="text-glow">RULE</span>
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
              The jockey rides the horse. Summon the daemon and the Power of Invention holds the
              line between human authority and the specialist swarm.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Chip
                label="daemon"
                value={state.daemon}
                tone={state.daemon === 'ENFORCING' ? 'gold' : alive ? 'blue' : state.daemon === 'HALTED' ? 'red' : 'dim'}
              />
              <Chip label="rung" value={`${state.rung} / ${RUNG_MAX}`} tone={state.rung >= RUNG_MAX ? 'gold' : 'dim'} />
              <Chip label="reins" value={state.reins} tone={state.reins === 'RELEASE' ? 'gold' : 'dim'} />
              <Chip label="evidence" value={state.evidence} tone={state.evidence === 'MEASURED' ? 'gold' : 'dim'} />
              <Chip label="phi" value={state.coherence.toFixed(2)} tone={state.coherence >= PHI_GATE ? 'gold' : 'blue'} />
              <span className="rounded-md border border-cyber-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                simulation - local telemetry, real sha-256
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Summon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Cpu className="text-cyber-blue" size={18} />
                <h2 className="text-lg font-semibold text-white">Summon the daemon</h2>
                {state.daemonId && (
                  <span className="ml-auto font-mono text-xs text-gray-500">
                    {state.daemonId} · up {fmtUptime(state.uptime)}
                  </span>
                )}
              </div>
              <label
                htmlFor="jah-target"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500"
              >
                Invention target
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="jah-target"
                  value={locked ? state.target : targetInput}
                  onChange={event => setTargetInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && !locked && targetInput.trim()) summon()
                  }}
                  disabled={locked}
                  placeholder="state what the swarm must invent"
                  className="flex-1 rounded-lg border border-cyber-border bg-cyber-dark px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-cyber-blue/60 focus:outline-none focus:ring-1 focus:ring-cyber-blue/40 disabled:opacity-70"
                />
                {locked ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => jah.halt()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/50 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-destructive/10"
                    >
                      <Square size={14} /> Halt
                    </button>
                    <button
                      onClick={() => jah.reset()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyber-border px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:border-cyber-blue/40 hover:text-white"
                    >
                      <RefreshCw size={14} /> Reset
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={summon}
                    disabled={!targetInput.trim() || busy}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyber-blue px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyber-blue/80 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
                  >
                    <Zap size={15} /> Summon
                  </button>
                )}
              </div>
              {busy && (
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-cyber-blue">
                  <Activity size={14} className="animate-pulse" />
                  binding daemon in the background...
                </div>
              )}
              {state.daemon === 'HALTED' && (
                <div className="mt-4 font-mono text-xs text-red-400">
                  daemon halted. reset to summon a new target.
                </div>
              )}
            </motion.div>

            {/* MoS roster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Brain className="text-cyber-gold" size={18} />
                <h2 className="text-lg font-semibold text-white">Mixture of Specialists</h2>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  trinity + guard
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {state.specialists.map(sp => (
                  <SpecialistCard key={sp.id} sp={sp} disabled={!alive} onDispatch={id => jah.dispatch(id)} />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Coherence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Gauge className="text-cyber-blue" size={18} />
                <h2 className="text-lg font-semibold text-white">Swarm coherence</h2>
              </div>
              <CoherenceRing coherence={state.coherence} />
              <div className="mt-5 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">C score</span>
                  <span className={state.cScore >= C_CRITICAL ? 'text-white' : 'text-red-400'}>
                    {state.cScore.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">gate</span>
                  <span className="text-cyber-gold">PHI {PHI_GATE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">critical</span>
                  <span className="text-gray-400">C {C_CRITICAL.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-4 border-t border-cyber-border pt-3 font-mono text-[10px] leading-relaxed text-gray-600">
                S(t+1) = S(t) + n1*SUM w(Sj - Si) + n2*GRAD q. Telemetry is simulated in-browser.
              </p>
            </motion.div>

            {/* JaH gate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Lock className="text-cyber-gold" size={18} />
                <h2 className="text-lg font-semibold text-white">JaH gate</h2>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => jah.setReins('HOLD')}
                  disabled={!alive}
                  className={reinsBtnClass(state.reins === 'HOLD', false)}
                >
                  <Lock size={13} /> Hold
                </button>
                <button
                  onClick={() => jah.setReins('RELEASE')}
                  disabled={!alive}
                  className={reinsBtnClass(state.reins === 'RELEASE', true)}
                >
                  <Unlock size={13} /> Release
                </button>
              </div>
              {pending ? (
                <div className="rounded-lg border border-cyber-blue/30 bg-cyber-blue/5 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-blue">
                    staged artifact
                  </div>
                  <div className="mt-1 text-sm text-white">{pending.artifact}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-gray-500">from {pending.name}</div>
                  <button
                    onClick={() => jah.measure()}
                    disabled={!alive || state.evidence === 'MEASURED'}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-cyber-blue/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyber-blue transition-all hover:bg-cyber-blue/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <Activity size={14} /> Measure breakthrough
                  </button>
                  <button
                    onClick={() => {
                      void jah.approve()
                    }}
                    disabled={!alive}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-cyber-gold px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-cyber-dark transition-all hover:shadow-glow-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
                  >
                    <Anchor size={15} /> Approve and seal
                  </button>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-cyber-border p-6 text-center text-xs text-gray-500">
                  No staged artifact. Dispatch a specialist and let it converge.
                </div>
              )}
              {state.refusal && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs leading-relaxed text-red-400">
                  <Ban size={14} className="mt-0.5 shrink-0" />
                  <span>{state.refusal}</span>
                </div>
              )}
              <div className="mt-5">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  <ScrollText size={12} /> seal chain
                </div>
                {state.seals.length === 0 ? (
                  <div className="font-mono text-[11px] text-gray-600">genesis {'0'.repeat(16)}...</div>
                ) : (
                  <ul className="space-y-1.5">
                    {state.seals
                      .slice(-4)
                      .reverse()
                      .map(seal => (
                        <li key={seal.index} className="font-mono text-[11px] text-gray-400">
                          <span className="text-cyber-gold">#{seal.index}</span> {seal.hash.slice(0, 22)}...
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* Under the hood */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white">Under the hood</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="rounded-md border border-cyber-border p-2.5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500">eta1</div>
                  <div className="mt-0.5 text-cyber-blue">{state.policy.eta1.toFixed(3)}</div>
                </div>
                <div className="rounded-md border border-cyber-border p-2.5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500">eta2</div>
                  <div className="mt-0.5 text-cyber-blue">{state.policy.eta2.toFixed(3)}</div>
                </div>
                <div className="rounded-md border border-cyber-border p-2.5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500">last reward</div>
                  <div className={`mt-0.5 ${state.policy.reward >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {state.policy.reward >= 0 ? '+' : ''}
                    {state.policy.reward.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-md border border-cyber-border p-2.5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500">updates</div>
                  <div className="mt-0.5 text-white">{state.policy.updates}</div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-gray-600">
                Every seal trains the policy: reward follows coherence against the PHI gate.
              </p>
              <div
                ref={logRef}
                aria-live="polite"
                className="mt-4 h-44 overflow-y-auto rounded-lg border border-cyber-border bg-cyber-dark p-3 font-mono text-[11px] leading-relaxed"
              >
                {state.events.length === 0 ? (
                  <div className="text-gray-600">daemon dormant. events will stream here.</div>
                ) : (
                  state.events.map(event => (
                    <div key={event.id} className="flex gap-2">
                      <span className="shrink-0 text-gray-600">{fmtClock(event.at)}</span>
                      <span className={EVENT_COLOR[event.kind]}>{event.text}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Evidence strip */}
      <section className="relative z-10 border-t border-cyber-border py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:px-6 lg:px-8">
          <span>DOI 10.5281/zenodo.18910246</span>
          <span>PCT/EP2025/080977</span>
          <span>DD7 International GmbH</span>
        </div>
      </section>
    </div>
  )
}

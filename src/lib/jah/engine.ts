// JaH - "Jockey atop Horse" - the sovereign enforcement engine behind JaH_RULE.
// The human is the jockey, the model is the horse. When summoned, a daemon
// binds in the background and enforces the Power of Invention (PoI) over a
// Mixture of Specialists (MoS) swarm. Browser-scope simulation: seal hashes
// are real SHA-256 via WebCrypto; every other signal is generated locally.

export const PHI_GATE = 0.77
export const C_OPTIMAL = 78.42
export const C_CRITICAL = 52.79
export const RUNG_MAX = 4

export type DaemonState = 'DORMANT' | 'SPAWNING' | 'ACTIVE' | 'ENFORCING' | 'HALTED'
export type Reins = 'HOLD' | 'RELEASE'
export type EvidenceStatus = 'DESIGNED' | 'MEASURED'
export type SpecialistState = 'IDLE' | 'RUNNING' | 'CONVERGED' | 'ANCHORED'
export type EventKind = 'sys' | 'poi' | 'mos' | 'seal' | 'rl'
export type Rung = 0 | 1 | 2 | 3 | 4

export interface Specialist {
  id: string
  name: string
  role: string
  state: SpecialistState
  load: number
  progress: number
  artifact: string | null
}

export interface JaHEvent {
  id: number
  at: number
  kind: EventKind
  text: string
}

export interface SealRecord {
  index: number
  hash: string
  prevHash: string
  action: string
  at: number
}

export interface RLPolicy {
  eta1: number
  eta2: number
  reward: number
  updates: number
}

export interface JaHState {
  daemon: DaemonState
  daemonId: string | null
  target: string
  reins: Reins
  evidence: EvidenceStatus
  rung: Rung
  specialists: Specialist[]
  coherence: number
  cScore: number
  uptime: number
  events: JaHEvent[]
  seals: SealRecord[]
  refusal: string | null
  policy: RLPolicy
}

const ARTIFACT_OF: Record<string, (target: string) => string> = {
  planner: t => `route map for ${t}`,
  critic: t => `vector audit of ${t}`,
  synthesizer: t => `unified form of ${t}`,
  guardian: t => `perimeter report on ${t}`,
  archivist: t => `evidence ledger for ${t}`,
}

const SEED_SPECIALISTS: Specialist[] = [
  { id: 'planner', name: 'PLANNER', role: 'draws the path across the problem field', state: 'IDLE', load: 0.38, progress: 0, artifact: null },
  { id: 'critic', name: 'CRITIC', role: 'intersects the path with test vectors', state: 'IDLE', load: 0.3, progress: 0, artifact: null },
  { id: 'synthesizer', name: 'SYNTHESIZER', role: 'resolves the unified gold form', state: 'IDLE', load: 0.44, progress: 0, artifact: null },
  { id: 'guardian', name: 'GUARDIAN', role: 'watches the perimeter of every run', state: 'IDLE', load: 0.2, progress: 0, artifact: null },
  { id: 'archivist', name: 'ARCHIVIST', role: 'binds evidence into the ledger', state: 'IDLE', load: 0.16, progress: 0, artifact: null },
]

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value))

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

function freshState(): JaHState {
  return {
    daemon: 'DORMANT',
    daemonId: null,
    target: '',
    reins: 'HOLD',
    evidence: 'DESIGNED',
    rung: 0,
    specialists: SEED_SPECIALISTS.map(sp => ({ ...sp })),
    coherence: 0.42,
    cScore: C_OPTIMAL * (0.42 / PHI_GATE),
    uptime: 0,
    events: [],
    seals: [],
    refusal: null,
    policy: { eta1: 0.22, eta2: 0.14, reward: 0, updates: 0 },
  }
}

export class JaHEngine {
  private state: JaHState = freshState()
  private listeners = new Set<() => void>()
  private timers: ReturnType<typeof setTimeout>[] = []
  private loop: ReturnType<typeof setInterval> | null = null

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getState = (): JaHState => this.state

  private set(patch: Partial<JaHState>) {
    this.state = { ...this.state, ...patch }
    this.listeners.forEach(listener => listener())
  }

  private log(kind: EventKind, text: string) {
    const last = this.state.events[this.state.events.length - 1]
    const event: JaHEvent = { id: last ? last.id + 1 : 1, at: Date.now(), kind, text }
    this.set({ events: [...this.state.events, event].slice(-140) })
  }

  private later(ms: number, fn: () => void) {
    this.timers.push(setTimeout(fn, ms))
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout)
    this.timers = []
    if (this.loop) {
      clearInterval(this.loop)
      this.loop = null
    }
  }

  private alive(): boolean {
    return this.state.daemon === 'ACTIVE' || this.state.daemon === 'ENFORCING'
  }

  summon(target: string) {
    const trimmed = target.trim()
    if (!trimmed || this.state.daemon === 'SPAWNING' || this.alive()) return
    this.clearTimers()
    const daemonId = 'jah-' + Math.random().toString(16).slice(2, 6)
    this.state = freshState()
    this.set({ daemon: 'SPAWNING', daemonId, target: trimmed })
    this.log('sys', `summon received for "${trimmed}". binding ${daemonId} in the background...`)
    this.later(900, () => {
      this.log('sys', `${this.state.daemonId} spawned. heartbeat armed. rung ladder mounted at 0.`)
    })
    this.later(1900, () => {
      this.log('poi', 'PoI armed: nothing passes without MEASURED evidence and RELEASED reins.')
    })
    this.later(2800, () => {
      if (this.state.daemon !== 'SPAWNING') return
      this.set({ daemon: 'ACTIVE' })
      this.log('sys', 'daemon ACTIVE. MoS roster idle. dispatch a specialist to begin.')
      this.startLoop()
    })
  }

  dispatch(id: string) {
    if (!this.alive()) return
    const target = this.state.specialists.find(sp => sp.id === id)
    if (!target || target.state !== 'IDLE') return
    this.set({
      specialists: this.state.specialists.map(sp =>
        sp.id === id ? { ...sp, state: 'RUNNING', artifact: ARTIFACT_OF[id](this.state.target) } : sp,
      ),
    })
    this.log('mos', `${target.name} dispatched at ${(target.load * 100).toFixed(0)}% load.`)
  }

  measure() {
    if (!this.alive()) return
    const staged = this.state.specialists.some(sp => sp.state === 'CONVERGED')
    if (!staged) {
      this.set({ refusal: 'Measurement refused: no converged artifact is staged to measure.' })
      this.log('poi', 'measurement refused: no staged breakthrough.')
      return
    }
    this.set({ evidence: 'MEASURED', refusal: null })
    this.log('poi', 'breakthrough measured. evidence MEASURED. PoI precondition satisfied.')
  }

  setReins(reins: Reins) {
    if (!this.alive() || this.state.reins === reins) return
    this.set({ reins, refusal: null })
    this.log(
      'poi',
      reins === 'RELEASE'
        ? 'reins RELEASED. the jockey hands the bit to the swarm.'
        : 'reins HELD. the jockey keeps the bit.',
    )
  }

  async approve(): Promise<void> {
    if (!this.alive()) return
    const staged = this.state.specialists.find(sp => sp.state === 'CONVERGED')
    if (!staged) {
      this.set({ refusal: 'PoI refusal: no converged artifact is staged at the gate.' })
      this.log('poi', 'PoI refusal: nothing staged.')
      return
    }
    if (this.state.evidence !== 'MEASURED') {
      this.set({ refusal: 'PoI refusal: approvals require MEASURED evidence at breakthrough.' })
      this.log('poi', 'PoI refusal: evidence is DESIGNED, not MEASURED.')
      return
    }
    if (this.state.reins !== 'RELEASE') {
      this.set({ refusal: 'PoI refusal: the JaH gate holds the beam while the reins are HELD.' })
      this.log('poi', 'PoI refusal: reins are HELD. release to pass the gate.')
      return
    }
    const prevHash =
      this.state.seals.length > 0
        ? this.state.seals[this.state.seals.length - 1].hash
        : '0'.repeat(64)
    const payload = `${prevHash}|${staged.id}|${staged.artifact ?? ''}|${Date.now()}`
    const hash = await sha256Hex(payload)
    const prevRung = this.state.rung
    const coherence = clamp(this.state.coherence + 0.03, 0, 0.96)
    const reward =
      coherence >= PHI_GATE ? 0.06 + Math.random() * 0.08 : -(0.04 + Math.random() * 0.05)
    const policy: RLPolicy = {
      eta1: clamp(this.state.policy.eta1 + reward * 0.6, 0.05, 0.6),
      eta2: clamp(this.state.policy.eta2 - reward * 0.3, 0.02, 0.4),
      reward,
      updates: this.state.policy.updates + 1,
    }
    const rung = coherence >= PHI_GATE ? (Math.min(RUNG_MAX, prevRung + 1) as Rung) : prevRung
    this.set({
      seals: [
        ...this.state.seals,
        {
          index: this.state.seals.length + 1,
          hash,
          prevHash,
          action: `${staged.name} - ${staged.artifact ?? ''}`,
          at: Date.now(),
        },
      ],
      specialists: this.state.specialists.map(sp =>
        sp.id === staged.id ? { ...sp, state: 'ANCHORED' } : sp,
      ),
      coherence,
      cScore: C_OPTIMAL * (coherence / PHI_GATE),
      refusal: null,
      policy,
      rung,
    })
    this.log('seal', `seal #${this.state.seals.length} anchored: ${hash.slice(0, 18)}...`)
    this.log(
      'rl',
      `policy update #${policy.updates}: reward ${reward >= 0 ? '+' : ''}${reward.toFixed(2)}, eta1 ${policy.eta1.toFixed(2)}, eta2 ${policy.eta2.toFixed(2)}`,
    )
    if (rung > prevRung) {
      this.log(
        'sys',
        rung === RUNG_MAX
          ? 'RUNG 4 mounted. cycle satisfied. summon again for the next invention.'
          : `rung ladder climbed to ${rung}.`,
      )
    } else {
      this.log('sys', 'coherence below the gate. rung held.')
    }
  }

  halt() {
    if (this.state.daemon === 'DORMANT' || this.state.daemon === 'HALTED') return
    this.clearTimers()
    this.set({ daemon: 'HALTED', reins: 'HOLD' })
    this.log('sys', 'halt accepted. daemon held in the background. state preserved.')
  }

  reset() {
    this.clearTimers()
    this.state = freshState()
    this.set({})
  }
}

export const jah = new JaHEngine()

export interface ScriptLine {
  type: 'cmd' | 'out'
  text: string
  accent?: boolean
}

export interface Progress {
  line: number
  chars: number
}

export const TERMINAL_SCRIPT: ScriptLine[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'sebastian nepote' },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: 'Chief Technology Officer', accent: true },
  { type: 'cmd', text: 'echo $MISSION' },
  { type: 'out', text: 'empowering tech & product teams' },
  { type: 'cmd', text: 'uptime' },
  { type: 'out', text: '24 yrs · building teams that ship' },
]

export const isDone = (p: Progress, script = TERMINAL_SCRIPT) => p.line >= script.length

/** Advance the typing animation by one character, moving to the next line when one is complete. */
export function step(p: Progress, script = TERMINAL_SCRIPT): Progress {
  if (isDone(p, script)) return p
  if (p.chars < script[p.line].text.length) return { line: p.line, chars: p.chars + 1 }
  return { line: p.line + 1, chars: 0 }
}

/** Commands pause before typing and type slowly; output streams in fast. */
export function delayFor(p: Progress, script = TERMINAL_SCRIPT): number {
  const isCmd = script[p.line].type === 'cmd'
  if (isCmd && p.chars === 0) return 500
  return isCmd ? 55 : 12
}

export interface VisibleLine extends ScriptLine {
  /** True while this line is still being typed (it carries the cursor). */
  typing: boolean
}

/** The lines on screen for a given progress, each cut to what has been typed so far. */
export function visibleLines(p: Progress, script = TERMINAL_SCRIPT): VisibleLine[] {
  const lines: VisibleLine[] = []
  for (let i = 0; i <= Math.min(p.line, script.length - 1); i++) {
    const entry = script[i]
    const full = i < p.line
    const text = full ? entry.text : entry.text.slice(0, p.chars)
    if (!full && text.length === 0 && entry.type === 'out') continue
    lines.push({ ...entry, text, typing: !full })
  }
  return lines
}

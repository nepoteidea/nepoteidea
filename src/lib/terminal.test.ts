import { describe, expect, it } from 'vitest'
import { delayFor, isDone, step, TERMINAL_SCRIPT, visibleLines, type ScriptLine } from './terminal'

const script: ScriptLine[] = [
  { type: 'cmd', text: 'ls' },
  { type: 'out', text: 'a' },
]

describe('terminal typing', () => {
  it('types one character at a time, then moves to the next line', () => {
    expect(step({ line: 0, chars: 0 }, script)).toEqual({ line: 0, chars: 1 })
    expect(step({ line: 0, chars: 2 }, script)).toEqual({ line: 1, chars: 0 })
  })

  it('stops advancing once the script is finished', () => {
    const done = { line: 2, chars: 0 }
    expect(isDone(done, script)).toBe(true)
    expect(step(done, script)).toBe(done)
  })

  it('pauses before a command, types commands slowly and streams output fast', () => {
    expect(delayFor({ line: 0, chars: 0 }, script)).toBe(500)
    expect(delayFor({ line: 0, chars: 1 }, script)).toBe(55)
    expect(delayFor({ line: 1, chars: 0 }, script)).toBe(12)
  })

  it('shows completed lines in full and the current line cut to the typed length', () => {
    expect(visibleLines({ line: 1, chars: 0 }, script)).toEqual([{ type: 'cmd', text: 'ls', typing: false }])
    expect(visibleLines({ line: 0, chars: 1 }, script)).toEqual([{ type: 'cmd', text: 'l', typing: true }])
    expect(visibleLines({ line: 2, chars: 0 }, script).map((l) => l.text)).toEqual(['ls', 'a'])
  })

  it('opens with whoami and ends with uptime', () => {
    expect(TERMINAL_SCRIPT[0].text).toBe('whoami')
    expect(TERMINAL_SCRIPT.at(-1)?.text).toContain('building teams that ship')
  })
})

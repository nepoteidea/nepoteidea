<script lang="ts">
  import { delayFor, isDone, step, TERMINAL_SCRIPT, visibleLines, type Progress } from './terminal'

  let { motion }: { motion: boolean } = $props()

  const finished: Progress = { line: TERMINAL_SCRIPT.length, chars: 0 }
  // Without motion the effect below jumps straight to the finished transcript.
  let progress = $state<Progress>({ line: 0, chars: 0 })

  $effect(() => {
    if (!motion) {
      progress = finished
      return
    }
    if (isDone(progress)) return
    const id = setTimeout(() => (progress = step(progress)), delayFor(progress))
    return () => clearTimeout(id)
  })

  const lines = $derived(visibleLines(progress))
  const done = $derived(isDone(progress))
</script>

<div class="terminal" aria-label="Terminal introducing Sebastian Nepote">
  <div class="terminal-bar">
    <span class="dot dot-r"></span>
    <span class="dot dot-y"></span>
    <span class="dot dot-g"></span>
    <span class="terminal-title">sebastian@nepoteidea — zsh</span>
  </div>
  <div class="terminal-body">
    {#each lines as line, i (i)}
      <div class="t-line">
        {#if line.type === 'cmd'}
          <span><span class="t-prompt">{'~ $ '}</span><span class="t-cmd">{line.text}</span></span>
        {:else}
          <span class={line.accent ? 't-accent' : 't-out'}>{line.text}</span>
        {/if}
        {#if line.typing}<span class="cursor"></span>{/if}
      </div>
    {/each}
    {#if done}
      <div class="t-line"><span class="t-prompt">{'~ $ '}</span><span class="cursor"></span></div>
    {/if}
  </div>
</div>

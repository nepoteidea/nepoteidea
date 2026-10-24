<script lang="ts">
  import { CAREER, CONTACT_EMAIL, GAMES, PROJECTS, SOCIAL_LINKS, STRENGTHS, type Project } from './lib/content'
  import { reveal } from './lib/reveal'
  import Terminal from './lib/Terminal.svelte'
  import ThemeIcon from './lib/ThemeIcon.svelte'
  import { loadTheme, prefersReducedMotion, saveTheme, THEME_BACKGROUND, type Theme } from './lib/theme'

  // Defaults chosen in the Claude Design tweaks panel.
  const ACCENT_A = '#8b5cf6'
  const ACCENT_B = '#38bdf8'
  const GLOW = 0.5

  const motion = !prefersReducedMotion()
  let theme = $state<Theme>(loadTheme())

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark'
    saveTheme(theme)
  }

  // Paint html/body to match the theme so overscroll edges don't flash the other theme's
  // background (the theme variables are scoped to .site, which body sits above).
  $effect(() => {
    document.documentElement.style.background = THEME_BACKGROUND[theme]
    document.body.style.background = THEME_BACKGROUND[theme]
  })

  const socialLinks = SOCIAL_LINKS.filter((l) => l.href)
  const year = new Date().getFullYear()
</script>

{#snippet projectCard(p: Project, heading: 'h3' | 'h4')}
  <article class="card project">
    <a class="project-shot" href={p.url} rel="noopener" target="_blank" tabindex="-1">
      <img src={p.image} alt="Screenshot of {p.name}" width="1280" height="800" loading="lazy" />
    </a>
    <div class="project-body">
      <svelte:element this={heading}>{p.name}</svelte:element>
      <p>{p.blurb}</p>
      <div class="chips">
        {#each p.stack as tech (tech)}<span class="chip">{tech}</span>{/each}
      </div>
      <div class="project-links">
        <a href={p.url} rel="noopener" target="_blank" aria-label="Open {p.name}">Live app <span class="arrow">↗</span></a>
        {#if p.repo}
          <a href={p.repo} rel="noopener" target="_blank" aria-label="{p.name} on GitHub">GitHub <span class="arrow">↗</span></a>
        {/if}
      </div>
    </div>
  </article>
{/snippet}


<div
  class="site"
  data-theme={theme}
  data-motion={motion ? 'on' : 'off'}
  style:--accent-a={ACCENT_A}
  style:--accent-b={ACCENT_B}
  style:--blob-opacity={GLOW}
>
  <div class="mesh" aria-hidden="true">
    <div class="blob blob-a"></div>
    <div class="blob blob-b"></div>
    <div class="blob blob-c"></div>
  </div>
  <svg class="grain" width="100%" height="100%" aria-hidden="true">
    <filter id="grain-f">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"></feTurbulence>
      <feColorMatrix type="saturate" values="0"></feColorMatrix>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"></feFuncA></feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-f)"></rect>
  </svg>

  <div class="content">
    <nav class="nav">
      <a class="wordmark" href="#top"><span class="spark"></span><span>nepoteidea</span></a>
      <div class="nav-links">
        <a href="#do">What I do</a>
        <a href="#career">Career</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
      </div>
      <button
        class="theme-toggle"
        type="button"
        onclick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        <ThemeIcon {theme} />
      </button>
      <a class="nav-cta" href="#contact">Contact</a>
    </nav>

    <main>
      <section class="hero" id="top">
        <div class="shell hero-grid">
          <div>
            <div use:reveal><div class="eyebrow">sebastian nepote · cto</div></div>
            <div use:reveal={80}>
              <h1>I help teams <span class="grad-text">ship great software.</span></h1>
            </div>
            <div use:reveal={160}>
              <p class="hero-sub">
                Chief Technology Officer with two decades of building and leading engineering and product
                teams — from the first commit to a scaled organisation. Berlin, via Barcelona.
              </p>
            </div>
            <div use:reveal={240}>
              <div class="hero-ctas">
                <a class="btn btn-primary" href="#career">See my path <span class="arrow">→</span></a>
                <a class="btn btn-ghost" href="#contact">Say hello</a>
              </div>
            </div>
          </div>
          <div use:reveal={200}><Terminal {motion} /></div>
        </div>
      </section>

      <section id="do">
        <div class="shell">
          <div class="section-head" use:reveal>
            <div class="eyebrow">~/strengths</div>
            <h2>What I do well</h2>
            <p>The work I’m known for, distilled into three things.</p>
          </div>
          <div class="feature-grid">
            {#each STRENGTHS as s, i (s.idx)}
              <div use:reveal={i * 90}>
                <div class="card card-text">
                  <span class="idx">{s.idx}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>

      <section id="career">
        <div class="shell">
          <div class="section-head" use:reveal>
            <div class="eyebrow">~/career --reverse</div>
            <h2>The path so far</h2>
            <p>Two decades, two countries, one constant: building teams and products that last.</p>
          </div>
          <ol class="timeline">
            {#each CAREER as job, i (i)}
              <li use:reveal={Math.min(i, 4) * 60}>
                <div class="tl-item">
                <div class="tl-when">
                  <span class="tl-range">{job.range}</span>
                  <span class="tl-dur">{job.dur}</span>
                </div>
                <div class="tl-card">
                  <span class="tl-node"></span>
                  <h3 class="tl-role">{job.role}</h3>
                  <div class="tl-co">
                    {job.company}{#if job.type}<span class="tl-type">{' · '}{job.type}</span>{/if}
                  </div>
                  <div class="tl-loc">{job.loc}</div>
                  {#if job.skills}
                    <div class="chips">
                      {#each job.skills as skill (skill)}<span class="chip">{skill}</span>{/each}
                    </div>
                  {/if}
                </div>
                </div>
              </li>
            {/each}
          </ol>
        </div>
      </section>

      <section id="projects">
        <div class="shell">
          <div class="section-head" use:reveal>
            <div class="eyebrow">~/projects</div>
            <h2>Things I’ve built</h2>
            <p>Side projects I build to stay hands-on — all live, all open source.</p>
          </div>
          <div class="project-grid">
            {#each PROJECTS as p, i (p.name)}
              <div use:reveal={i * 90}>{@render projectCard(p, 'h3')}</div>
            {/each}
          </div>

          <div class="subsection-head" use:reveal>
            <div class="eyebrow">~/projects/games</div>
            <h3 id="games">Games</h3>
            <p>Small browser games: tilt your phone, tap to jump, or play a friend.</p>
          </div>
          <div class="project-grid">
            {#each GAMES as p, i (p.name)}
              <div use:reveal={i * 90}>{@render projectCard(p, 'h4')}</div>
            {/each}
          </div>
        </div>
      </section>

      <section id="about">
        <div class="shell">
          <div class="section-head" use:reveal>
            <div class="eyebrow">~/about</div>
            <h2>Behind the domain</h2>
          </div>
          <div class="about-grid">
            <div use:reveal>
              <div class="avatar-wrap">
                <img class="avatar" src="/images/avatar.jpg" alt="Sebastian Nepote" width="200" height="200" loading="lazy" />
              </div>
            </div>
            <div class="about-copy" use:reveal={100}>
              <p>
                <strong>nepoteidea</strong> — literally, “Nepote’s idea.” It’s where I keep the things I think
                about: technology leadership, building teams, and the craft of shipping software that lasts.
              </p>
              <p>
                Originally from Barcelona, now based in Berlin. I’ve spent my career as a hands-on technology
                leader — close enough to the code to earn the team’s trust, far enough to set the direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact" id="contact">
        <div class="shell">
          <div use:reveal>
            <div class="eyebrow">~/contact</div>
            <h2>Let’s talk teams,<br /><span class="grad-text">tech &amp; building things.</span></h2>
            <p class="lede">Always happy to trade notes with fellow builders and leaders. No pitch required.</p>
            <a class="btn btn-primary" href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL} <span class="arrow">→</span></a>
            {#if socialLinks.length}
              <div class="social-row">
                {#each socialLinks as link (link.label)}
                  <a href={link.href} rel="noopener" target="_blank">{link.label}</a>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="shell">
        <span>© {year} sebastian nepote</span>
        <span>nepoteidea.com</span>
      </div>
    </footer>
  </div>
</div>

// ONDC "forming-India" hero — components + choreography, ported from the
// Next.js extract (src/components/*, src/content/*). GSAP ScrollTrigger +
// Lenis are replaced by native sticky positioning, one scroll listener per
// act, and IntersectionObservers — the same scrub windows, driven by plain
// scroll progress (the extract's own touch path, applied everywhere).
// Depends on hero-map.js (window.OndcHeroMap) being loaded first.

/* ---- content (src/content/home.ts, verbatim copy) ---- */

const HERO_GENESIS_BEATS = [
  { id: "beat-1", line1: "Every business in India", line2: "deserves access to every customer in India." },
  { id: "beat-2", line1: "ONDC connects them", line2: "through one open network." },
  { id: "beat-3", line1: "Sellers, buyer apps, logistics and payments", line2: "speak one shared language." },
  { id: "beat-1b", line1: "And when every connection holds hands,", line2: "a country takes shape." },
];

const HERO_IMPACT_BEAT = {
  id: "beat-act2",
  line1: "The network is live across this map.",
  line2: "Here is what it carries.",
};

const HERO_LOCKUP = {
  wordmark: "ONDC",
  title: "Building India's Digital Commerce Infrastructure",
  tagline: "One Network. Efficiency by Design. Inclusion by Intent.",
};

// CTA targets remapped onto this site's own sections.
const HERO_CTA_LINKS = {
  primary: { label: "Explore the network", target: "#site-top" },
  secondary: { label: "Join the ecosystem", target: "#find-your-place" },
};

/* ---- the governance register gate (src/content/register.ts, reduced to
 * the rows this hero renders). Metric figures render ONLY through this
 * gate: R19 is OPEN, so the cities/sellers tiles collapse without a gap.
 * To light them up, mark R19 RESOLVED and supply its sanctioned lines —
 * never hardcode figures in the components. ---- */
const HERO_REGISTER = {
  R18: { status: "RESOLVED", sanctioned: ["500M+ transactions till date"] },
  R19: { status: "OPEN", sanctioned: [] },
};

function heroSanctionedLine(id, index) {
  const row = HERO_REGISTER[id];
  if (!row || row.status !== "RESOLVED") return null;
  const line = row.sanctioned[index || 0];
  return line === undefined ? null : line;
}

const HERO_IMPACT = {
  headline: "The impact one open network has enabled",
  metrics: [
    { id: "metric-transactions", rowId: "R18", line: null,
      counter: { to: 500, suffix: "M+", label: "transactions till date" },
      meshEvent: "pulse-accelerate" },
    { id: "metric-participants", rowId: null, line: "300+ network participants",
      counter: { to: 300, suffix: "+", label: "network participants" },
      meshEvent: "participant-flare" },
    { id: "metric-cities", rowId: "R19", line: null, counter: null, meshEvent: "city-glints" },
    { id: "metric-sellers", rowId: "R19", line: null, counter: null, meshEvent: "seller-shimmer" },
  ],
};

const heroReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroClamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);

/* ---- BeatBlock: a per-character slot-reel reveal ----
 * Each letter gets a short vertical strip of decoy glyphs ending in the
 * real one (REEL_DEPTH deep); painting the beat transitions the strip up
 * into the mask, like a split-flap board settling. Same architecture as the
 * old per-word fade it replaces: a scroll listener only ever flips
 * data-armed/data-painted (HeroGenesisChoreo, HeroBeatPainter below); every
 * frame of the animation is a CSS transition, not JS. Decoy letters are a
 * deterministic hash, not Math.random, so re-renders are
 * stable and there's nothing to seed from scroll state. */

/* ---- BeatBlock: a per-word slot-reel reveal ----
 * Each word gets a short vertical strip: a couple of scrambled anagrams of
 * its own letters, ending in the real word, inside a fixed-height mask.
 * Painting the beat transitions the strip up, like a split-flap board
 * settling on the right word. An earlier per-CHARACTER version of this (one
 * reel per letter, ~50+ per beat) triggered a genuine Chromium compositor
 * bug specific to this sticky hero: text inside it, once that many small
 * transform-transitioning siblings existed simultaneously, rasterized as a
 * corrupted double-exposure ghost — reproducible on a fresh load, confirmed
 * by process of elimination (moving the exact same live node outside the
 * hero rendered it perfectly; trimming it to under ~12 reels in place also
 * did). Per-word keeps the same slot-machine idea (letters visibly cycling
 * before landing) at ~8-10 reels a beat — comfortably under that threshold,
 * and it's the density the original per-word fade already shipped at. */

const REEL_WORD_DEPTH = 3; // keep in sync with hero.css --reel-depth

function heroHash01(i, salt) {
  let x = (i + 1) * 374761393 + salt * 668265263;
  x = (x ^ (x >> 13)) * 1274126177;
  x = x ^ (x >> 16);
  return (x >>> 0) / 4294967296;
}

// Deterministic shuffle (not Math.random): a word's letters land in the same
// scrambled order on every render.
function heroScrambleLetters(letters, seed, salt) {
  const arr = letters.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(heroHash01(seed, salt * 31 + i + 1) * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr.join("");
}

function HeroReelWord({ word, seed, delayMs }) {
  const rdelayVar = { "--rdelay": `${delayMs}ms` };
  const match = /^([A-Za-z]*)(.*)$/.exec(word);
  const core = match[1];
  const rest = match[2];
  if (!core) {
    return (
      <span className="hb-static" style={rdelayVar}>
        {word}
      </span>
    );
  }
  const rows = [];
  for (let d = 0; d < REEL_WORD_DEPTH - 1; d++) {
    rows.push(heroScrambleLetters(core, seed, d + 1) + rest);
  }
  rows.push(word);
  return (
    <span className="hb-mask" style={rdelayVar}>
      <span className="hb-reel">
        {rows.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </span>
    </span>
  );
}

function HeroBeatBlock({ beat, as, align }) {
  const Tag = as || "p";
  let wordIndex = 0;
  const renderLine = (line) => (
    <span className="hb-line">
      {line.split(" ").map((word, i) => {
        const delay = wordIndex * 80;
        const seed = wordIndex;
        wordIndex++;
        return (
          <span key={i}>
            <HeroReelWord word={word} seed={seed} delayMs={delay} />{" "}
          </span>
        );
      })}
    </span>
  );
  return (
    <Tag className="hero-beat" data-beat={beat.id} data-align={align || "center"}>
      {renderLine(beat.line1)}
      {renderLine(beat.line2)}
    </Tag>
  );
}

/* ---- MeshStage: the one persistent scene, a 2D canvas driven by
 * hero-map.js. The outline it samples from is fetched here (the extract
 * inlined it at build time with fs; a static site fetches). Sticky
 * containment + IntersectionObserver gating mean the canvas never renders
 * behind the rest of the site. ---- */

function HeroMeshStage() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    let map = null;
    let disposed = false;
    let inView = false;
    const sync = () => map && map.setVisible(inView && !document.hidden);

    fetch("public/map/india-scaffold.svg")
      .then((r) => r.text())
      .then((svg) => {
        if (disposed) return;
        const d = (svg.match(/\sd="([^"]+)"/) || [])[1];
        if (!d) throw new Error("no path");
        map = window.OndcHeroMap.create(canvas, d, { reduced: heroReducedMotion() });
        canvas.classList.add("visible");
        sync();
      })
      .catch((e) => console.error("[hero] map outline failed to load", e));

    document.addEventListener("visibilitychange", sync);
    // The stage is sticky inside the hero; once the hero scrolls past, the
    // canvas leaves the viewport and the loop stops.
    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(canvas.parentElement || canvas);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", sync);
      io.disconnect();
      if (map) map.dispose();
    };
  }, []);

  return (
    <div className="mesh-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="mesh-canvas" />
    </div>
  );
}

/* ---- Act 1 choreography: beat windows over 420vh of sticky travel; the
 * map reads the same progress and stages itself (hero-map.js BANDS/CUM);
 * the lockup at 85–100%. The skip affordance lives in intro.js, shared with
 * the About page. ---- */

const HERO_BEAT_WINDOWS = [
  { id: "beat-1", from: 0, to: 0.15 },
  { id: "beat-2", from: 0.15, to: 0.35 },
  { id: "beat-3", from: 0.35, to: 0.55 },
  { id: "beat-1b", from: 0.55, to: 0.85 },
];

function HeroGenesisChoreo() {
  React.useEffect(() => {
    const map = window.OndcHeroMap;
    const section = document.getElementById("story");
    if (!section) return undefined;

    const heroRoot = section.closest(".ondc-hero");

    if (heroReducedMotion()) {
      section.querySelectorAll("[data-beat]").forEach((el) => (el.dataset.painted = "true"));
      const lockup = section.querySelector("[data-lockup]");
      if (lockup) lockup.dataset.painted = "true";
      if (heroRoot) heroRoot.style.setProperty("--hero-spine", "1");
      map.setProgress(1);
      return undefined;
    }

    const beats = HERO_BEAT_WINDOWS.map((w) =>
      Object.assign({}, w, { el: section.querySelector(`[data-beat="${w.id}"]`) })
    );
    // arm word paint only once JS drives it; the plain document stays visible
    beats.forEach((b) => b.el && (b.el.dataset.armed = "true"));
    const lockup = section.querySelector("[data-lockup]");
    let prevP = -1;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = heroClamp01(-rect.top / travel);
      if (p === prevP) return; // fully before/past the act: leave the bus alone
      prevP = p;

      for (const b of beats) {
        const on = p >= b.from && p < b.to;
        if (b.el && (b.el.dataset.painted === "true") !== on) {
          b.el.dataset.painted = on ? "true" : "false";
        }
      }

      map.setProgress(p);

      if (heroRoot) heroRoot.style.setProperty("--hero-spine", p.toFixed(3));

      const lit = p >= 0.85;
      if (lockup) {
        // The swish crosses the lockup once, the first time it paints.
        if (lit && lockup.dataset.painted !== "true" && !lockup.dataset.swished) {
          lockup.dataset.swished = "true";
        }
        lockup.dataset.painted = lit ? "true" : "false";
      }
    };


    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return null;
}

/* ---- Act 1: Genesis ---- */

function HeroActGenesis() {
  return (
    <section id="story" aria-label="Story" className="hero-act-genesis">
      <div className="hero-genesis-stage" data-genesis-stage>
        <div className="hero-spine" aria-hidden="true" />
        <div className="hero-beat-stack">
          <HeroBeatBlock beat={HERO_GENESIS_BEATS[0]} as="h1" />
          <HeroBeatBlock beat={HERO_GENESIS_BEATS[1]} />
          <HeroBeatBlock beat={HERO_GENESIS_BEATS[2]} />
          <HeroBeatBlock beat={HERO_GENESIS_BEATS[3]} />
        </div>
        <div className="hero-lockup" data-lockup>
          <span className="hero-lockup-swish" aria-hidden="true" />
          <p className="hero-wordmark">{HERO_LOCKUP.wordmark}</p>
          <p className="hero-title">{HERO_LOCKUP.title}</p>
          <p className="hero-tagline">{HERO_LOCKUP.tagline}</p>
          <div className="hero-ctas">
            <a className="hero-cta-primary" href={HERO_CTA_LINKS.primary.target}>
              {HERO_CTA_LINKS.primary.label}
            </a>
            <a className="hero-cta-secondary" href={HERO_CTA_LINKS.secondary.target}>
              {HERO_CTA_LINKS.secondary.label}
            </a>
          </div>
        </div>
      </div>
      <HeroGenesisChoreo />
    </section>
  );
}

/* ---- Act 2 choreography: entering tweens the formed map to 60% scale
 * docked left; scrub-driven and reversible. ---- */

function HeroImpactChoreo() {
  React.useEffect(() => {
    const map = window.OndcHeroMap;
    const section = document.getElementById("impact");
    if (!section) return undefined;

    // Static parity: the formed map stays centred behind the metrics.
    if (heroReducedMotion()) return undefined;

    const heroRoot = section.closest(".ondc-hero");
    let prevT = -1;
    let prevExit = -1;
    const update = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const t = heroClamp01((vh * 0.85 - rect.top) / (vh * 0.7));

      /* The map dissolves over the act's last half-viewport, so it has faded
       * before the clip edge could cut it. Reversible, like the dock tween. */
      if (heroRoot) {
        const exit = heroClamp01((-rect.bottom + vh * 1.5) / (vh * 0.5));
        if (exit !== prevExit) {
          prevExit = exit;
          heroRoot.style.setProperty("--hero-exit", exit.toFixed(3));
        }
      }

      if (t === prevT) return;
      const leftBack = t <= 0 && prevT > 0;
      prevT = t;
      if (t > 0 || leftBack) map.setDock(t);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return null;
}

/* ---- MetricModule: Space Mono label, Space Grotesk numeral counting
 * once over 1200ms on first entry, the leader line drawing in 400ms. ---- */

function HeroMetricModule({ id, line, counter, meshEvent, index }) {
  const ref = React.useRef(null);
  const fired = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const map = window.OndcHeroMap;
    const reduced = heroReducedMotion();
    const numeral = el.querySelector("[data-numeral]");
    const leader = el.querySelector("[data-leader]");

    if (!reduced && !fired.current) el.dataset.armed = "true";

    // ignition at "top 78%" of the viewport, once
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (fired.current) return;
        fired.current = true;
        el.dataset.ignited = "true";
        map.impulse(meshEvent);
        if (reduced) return;
        if (leader) {
          const len = leader.getTotalLength();
          leader.style.strokeDasharray = `${len}`;
          leader.style.strokeDashoffset = `${len}`;
          void leader.getBoundingClientRect();
          leader.style.transition = "stroke-dashoffset var(--t-line) ease-out";
          leader.style.strokeDashoffset = "0";
        }
        if (numeral && counter) {
          const start = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            numeral.textContent = `${counter.prefix || ""}${Math.round(counter.to * eased)}${counter.suffix}`;
            if (t < 1) requestAnimationFrame(tick);
            else numeral.textContent = `${counter.prefix || ""}${counter.to}${counter.suffix}`;
          };
          requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -22% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const numeralText = counter ? `${counter.prefix || ""}${counter.to}${counter.suffix}` : null;
  const labelText = counter ? counter.label : line;

  return (
    <div ref={ref} className="hero-metric" data-metric={id} data-index={index}>
      <span className="hero-metric-wash" aria-hidden="true" />
      <span className="hero-metric-node" aria-hidden="true" />
      <svg className="hero-metric-leader" aria-hidden="true" viewBox="0 0 120 24" preserveAspectRatio="none">
        <path data-leader d="M120 12 H8 L0 12" />
      </svg>
      <div>
        {numeralText && (
          <span className="hero-metric-numeral" data-numeral>
            {numeralText}
          </span>
        )}
        <span className="hero-metric-label">{labelText}</span>
      </div>
    </div>
  );
}

/* ---- Act 2: Impact on the Map ---- */

function HeroActImpact() {
  const metrics = HERO_IMPACT.metrics
    .map((m) => {
      const line = m.rowId ? heroSanctionedLine(m.rowId) : m.line;
      return line ? Object.assign({}, m, { resolvedLine: line }) : null;
    })
    .filter(Boolean);

  return (
    <section id="impact" aria-label="Impact" className="hero-act-impact">
      <div className="hero-map-dock" aria-hidden="true" />
      <div className="hero-impact-content">
        <HeroBeatBlock beat={HERO_IMPACT_BEAT} as="h2" align="left" />
        <p className="hero-impact-headline">{HERO_IMPACT.headline}</p>
        <div className="hero-metrics">
          {metrics.map((m, i) => (
            <HeroMetricModule
              key={m.id}
              id={m.id}
              line={m.resolvedLine}
              counter={m.counter}
              meshEvent={m.meshEvent}
              index={i}
            />
          ))}
        </div>
      </div>
      <HeroImpactChoreo />
    </section>
  );
}

/* ---- BeatPainter: paints beats outside #story on scroll-in ---- */

function HeroBeatPainter() {
  React.useEffect(() => {
    const beats = Array.from(document.querySelectorAll("[data-beat]")).filter(
      (el) => !el.closest("#story")
    );
    if (!beats.length) return undefined;
    if (!heroReducedMotion()) beats.forEach((el) => (el.dataset.armed = "true"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.dataset.painted = "true";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.6 }
    );
    beats.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}

/* ---- the hero, whole ---- */

function OndcHero() {
  // The scroll-scrubbed story — the WebGL India formation, 420vh of scrub, and
  // four beats stacked inside a 100vh clipped stage — is built for a desktop
  // viewport. On a phone it is close to six screens of hero before the first
  // piece of content, and the beats overflow the stage they cannot scroll.
  // So below 900px the homepage opens on the sector carousel instead, and
  // returning null here means the mesh, the three.js import and the two scroll
  // choreographers are never constructed at all rather than merely hidden.
  // mobile.css carries the matching `display:none` as a backstop.
  const mq = "(max-width: 900px)";
  const [mobile, setMobile] = React.useState(() => window.matchMedia(mq).matches);
  React.useEffect(() => {
    const m = window.matchMedia(mq);
    const sync = () => setMobile(m.matches);
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  if (mobile) return null;

  return (
    <div className="ondc-hero">
      <HeroMeshStage />
      <HeroActGenesis />
      <HeroActImpact />
      <HeroBeatPainter />
    </div>
  );
}

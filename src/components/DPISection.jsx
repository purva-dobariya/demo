// Building Blocks band — dark, horizontal scroll-snap track.
// All nine network building blocks: the six of copy doc lines 200–256 plus
// the two shared-services blocks (lines 258–278), verbatim headline + body.
// Numbered "01 · …" eyebrows dropped (they scaffolded a sequence that isn't one).
// Cards are informational, with no per-card CTA: the blocks are described here,
// not navigated to. Body content is vertically centred so the card reads even.

const DPI_CARDS = [
  {
    icon: "catalogue", name: "DigiCatalog",
    tagline: "Create once. Sell across many channels.",
    desc: "Build a single product catalogue for multiple commerce destinations with AI-powered infrastructure for discoverability, compliance, validation, and export readiness.",
    img: "/public/assets/dpi/digicatalogue.jpg", mediaTag: "Unified catalogue",
  },
  {
    icon: "network", name: "Gateway",
    tagline: "One connection. Thousands of opportunities.",
    desc: "Access buyers, sellers, logistics providers, and service partners through a common network layer, helping businesses expand reach without managing multiple one-to-one integrations.",
    img: "/public/assets/dpi/gateway.jpg", mediaTag: "One connection, many partners",
  },
  {
    icon: "building", name: "Registry",
    tagline: "Find trusted partners faster",
    desc: "A verified network directory that helps participants discover, trust, and connect with each other while reducing onboarding friction and improving interoperability.",
    img: "/public/assets/dpi/registry.jpg", mediaTag: "Verified network directory",
  },
  {
    icon: "globe", name: "Discovery & Search",
    tagline: "Reach customers beyond your own storefront",
    desc: "Help products and services get discovered across a growing network of buyer applications, increasing visibility without raising customer acquisition costs.",
    img: "/public/assets/dpi/discovery.jpg", mediaTag: "Beyond your own storefront",
  },
  {
    icon: "rupee", name: "Reconciliation & Payments",
    tagline: "Spend less time matching transactions",
    desc: "Simplify settlements and payment tracking across multiple network participants to improve operational efficiency as businesses scale.",
    img: "/public/assets/dpi/payments.jpg", mediaTag: "Real-time settlement",
  },
  {
    icon: "shield", name: "Dispute Resolution",
    tagline: "Trust backed by accountability",
    desc: "Resolve issues faster through structured grievance and dispute frameworks that build confidence and transparency across every transaction.",
    img: "/public/assets/dpi/disputes.jpg", mediaTag: "Structured resolution",
  },
  {
    icon: "grid", name: "Shared Commerce Services",
    tagline: "Enterprise-grade capabilities without enterprise costs",
    desc: "Access common commerce services that reduce the need to build and maintain complex infrastructure. Helping businesses launch faster while lowering technology investments.",
    img: "/public/assets/dpi/shared-services.jpg", mediaTag: "Launch faster, together",
  },
  {
    icon: "shield", name: "Verifiable Credentials",
    tagline: "Trust that is proven, not assumed.",
    desc: "A two-layer trust system that gives every seller and network participant a verified identity, and makes credentials, government licences, business registrations, quality scores and reputation visible, verified and portable across the entire network.",
    img: "/public/assets/dpi/verifiable-credentials.jpeg", mediaTag: "Verified, portable trust", soon: true,
  },
  {
    icon: "globe", name: "Bharat Tourism Stack",
    tagline: "Verified Indian experiences, discoverable at last.",
    desc: "Built with the Ministry of Tourism: a trust, verification, onboarding and transacting layer that verifies tourist and provider identity and surfaces credentials, licences and certifications at the point of booking — opening up supply that has stayed largely offline to date.",
    img: "/public/assets/dpi/tourism-stack.jpeg", mediaTag: "Verified at the point of booking", soon: true,
  },
];

function DPICard({ card, index, active }) {
  const state = index < active ? " is-behind" : index === active ? " is-front" : "";

  // The mobile rail shows the block NAME only; the photo and the description
  // arrive on tap. 820px is exactly where fx.css stops running the scrubbed
  // deck, so this hangs off the same boundary — above it `flat` is false and
  // the desktop card receives none of these props and never gets `is-open`.
  const mq = "(max-width: 820px)";
  const [flat, setFlat] = React.useState(() => window.matchMedia(mq).matches);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia(mq);
    const sync = () => setFlat(m.matches);
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  const toggle = flat ? {
    role: "button",
    tabIndex: 0,
    "aria-expanded": open,
    onClick: () => setOpen((o) => !o),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); }
    },
  } : {};

  return (
    <article className={`dpi-card${state}${flat && open ? " is-open" : ""}`} {...toggle}>
      {/* Sweeps when this card takes the front of the deck: gaining .is-front
          starts the CSS animation fresh, no remount needed. (A key={active}
          remount here once fed the mandatory-snap re-snap loop — never again.) */}
      <span className="dpi-card-wash" aria-hidden="true" />
      <div className="dpi-card-body">
        <span className="dpi-card-ghost" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="dpi-eyebrow">
          <span>Building block</span>
          {card.soon && <span className="dpi-soon">Coming soon</span>}
        </div>
        <h3 className="dpi-name">{card.name}</h3>
        <div className="dpi-tagline">{card.tagline}</div>
        <p className="dpi-desc">{card.desc}</p>
      </div>
      {card.img ? (
        <div className="dpi-media" style={{ "--dpi-img": `url(${card.img})` }}>
          <div className="dpi-media-tag">{card.mediaTag}</div>
        </div>
      ) : (
        <div className="dpi-media dpi-media-ghost">
          <div className="dpi-media-tag">{card.mediaTag}</div>
        </div>
      )}
    </article>
  );
}

/* The deck is scrubbed by the PAGE scroll, the classic pinned stacking-cards
 * pattern (the GSAP-forum logic, implemented on the same sticky-runway
 * architecture the hero already uses — no library):
 *   - the section is a tall runway; a 100vh stage stays pinned inside it;
 *   - all cards sit in one grid cell (in flow, stacked — never absolute);
 *   - vertical scroll progress p maps linearly to a deck position d = p·(N−1);
 *     card i slides in from the right over exactly one unit of d, so every
 *     card gets an identical share of the runway and spacing can never drift;
 *   - linear with the scroll (no easing) so the stack tracks the finger and is
 *     fully reversible — the user's scroll IS the timeline, nothing hijacks it.
 * Mobile and reduced-motion render a plain vertical list, no pin. */
function DPISection({ onSignUp }) {
  const sectionRef = React.useRef(null);
  const deckRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const N = DPI_CARDS.length;

  React.useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const flat = window.matchMedia("(max-width: 820px)");
    const cards = Array.from(deck.querySelectorAll(".dpi-card"));
    // Paint order + first frame live outside React's style props, so a
    // re-render (active change) can never clobber a mid-scrub transform.
    cards.forEach((card, i) => { card.style.zIndex = String(i + 1); });

    let prevP = -1;
    let prevActive = -1;
    // The paint itself: one rect read, then N transform writes. Never called
    // straight from the scroll event — see onScroll below.
    const paint = () => {
      if (flat.matches) {
        if (prevP !== -1) cards.forEach((c) => { c.style.transform = ""; });
        prevP = -1;
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / travel));
      if (p === prevP) return;
      prevP = p;
      const d = p * (N - 1);
      for (let i = 0; i < N; i++) {
        // Card 0 rests from the start; card i slides in across d ∈ [i−1, i].
        const t = i === 0 ? 1 : Math.max(0, Math.min(1, d - (i - 1)));
        // Buried cards sink slightly so the pile reads as depth.
        const depth = Math.max(0, Math.min(1, d - i));
        const x = (1 - t) * 106;
        cards[i].style.transform = `translateX(${x.toFixed(2)}vw) scale(${(1 - 0.04 * depth).toFixed(4)})`;
      }
      // Only when the front card actually changes: this used to fire a setState
      // on every scroll event, re-entering React's render path for nothing.
      const next = Math.max(0, Math.min(N - 1, Math.round(d)));
      if (next !== prevActive) { prevActive = next; setActive(next); }
    };

    // Coalesce to one paint per frame — the same queued-flag + rAF idiom as
    // beckn.js:173 and d2c-retail-v2.js:198. macOS trackpads fire scroll far
    // faster than 60Hz, and painting inline meant this handler's N transform
    // writes dirtied layout for the five other scroll listeners on this page
    // (Hero.jsx:349/460, App.jsx:225, fx.js:152, intro.js:60), each of which
    // then forced a synchronous reflow with its own getBoundingClientRect.
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; paint(); });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    flat.addEventListener?.("change", onScroll);
    paint();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      flat.removeEventListener?.("change", onScroll);
    };
  }, []);

  // Arrows and dots steer the same timeline: they scroll the PAGE to the
  // runway position where the target card has fully arrived.
  const scrollToCard = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (N - 1)) * travel, behavior: "smooth" });
  };

  return (
    <section className="dpi" id="infrastructure" ref={sectionRef} style={{ "--dpi-n": N }}>
      <div className="dpi-bg"></div>
      <div className="dpi-stage">
        <div className="container">
          <div className="dpi-header">
            <h2 className="dpi-h2">Building Blocks Behind the Network</h2>
            <p className="dpi-sub">Digital commerce creates the greatest value when opportunity is accessible to every business. From neighbourhood kiranas to national brands, ONDC provides shared infrastructure that helps participants connect with customers, reduce costs and grow across an open network.</p>
          </div>
        </div>
        <div className="dpi-deck" ref={deckRef}>
          {DPI_CARDS.map((c, i) => <DPICard key={i} card={c} index={i} active={active}/>)}
        </div>
        <div className="dpi-controls">
          <button className="dpi-arrow prev" aria-label="Previous" disabled={active <= 0}
            onClick={() => scrollToCard(active - 1)}>
            <Icon name="prev" size={18} viewBox="0 0 20 20"/>
          </button>
          <div className="dpi-dots">
            {DPI_CARDS.map((_, i) => (
              <button key={i} className={`dpi-dot${i === active ? " active" : ""}`} aria-label={`Go to block ${i + 1}`} onClick={() => scrollToCard(i)}/>
            ))}
          </div>
          <button className="dpi-arrow next" aria-label="Next" disabled={active >= N - 1}
            onClick={() => scrollToCard(active + 1)}>
            <Icon name="next" size={18} viewBox="0 0 20 20"/>
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DPISection });

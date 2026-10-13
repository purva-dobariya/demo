// Hero carousel — 11 sector slides with photo background, hairline-ruled stats
// panel, auto-advancing every 6s, pill-strip nav + prev/next arrows.
//
// Each slide carries `figures` (the large numerals across the top of the
// stats card) and `stats` (the supporting rows). A fact lives in exactly one of
// the two — never both.

const HERO_SLIDES = [
  {
    sector: "Retail · D2C Brands",
    pill: "D2C Brands",
    href: "pages/d2c-retail.html",
    img: "public/assets/hero/d2c-brands.jpg",
    h1: "A low-cost, sustainable e-commerce channel for brands",
    primary: "Explore D2C →",
    figures: [
      { value: "75K+", label: "merchants across electronics, beauty, grocery, health & wellness" },
      { value: "5–10%", label: "Lower channel commissions on average" },
      { value: "30%+", label: "Branded products priced lower than other platforms" },
    ],
    stats: [
      { icon: "truck", text: <>Warehousing, logistics &amp; marketing support</> },
    ],
  },
  {
    sector: "Retail · DigiDukaan",
    pill: "DigiDukaan",
    href: "pages/digidukaan.html",
    img: "public/assets/hero/digidukaan.jpg",
    h1: "Bringing efficiency to supply operations for general trade, including kiranas, distributors & brands",
    primary: "Explore DigiDukaan →",
    figures: [
      { value: "98K+", label: "Orders till date" },
      { value: "12K+", label: "Kiranas' inventory digitised" },
      { value: "400+", label: "Brands available through one procurement platform" },
    ],
    stats: [
      { icon: "globe", text: <>Live in <strong>2 cities</strong> (Hyderabad &amp; Jaipur)</> },
      { icon: "clock", text: <><strong>Daily replenishment</strong> replacing weekly distributor cycles</> },
      { icon: "rupee", text: <>Reduced working capital lock-up for kiranas</> },
    ],
  },
  {
    sector: "Amazing India",
    pill: "Amazing India",
    href: "pages/impact-retail.html",
    img: "public/assets/hero/impact-retail.jpg",
    h1: "Bringing India's kisaans and karigars to digital markets",
    primary: "Explore Amazing India →",
    figures: [
      { value: "1,500", label: "FPOs on the network" },
      { value: "50K+", label: "Farmers connected" },
      { value: "800+", label: "Independent merchants onboarded" },
    ],
    stats: [
      { icon: "chartUp", text: <><strong>Double-digit</strong> month-on-month growth</> },
      { icon: "star", text: <><strong>500 orders</strong> by a single merchant on Amazing India Gold in one day</> },
      { icon: "truck", text: <>Handholding and support provided across Packaging, Warehousing, Logistics, etc.</> },
      { icon: "globe", text: <>Expanding participation across FPOs and districts nationwide</> },
    ],
  },
  {
    sector: "Food & Beverages",
    pill: "Food & Beverages",
    href: "pages/food-and-beverages.html",
    img: "public/assets/hero/food-beverages.jpg",
    h1: "Lower-cost digital commerce for restaurants and food brands",
    primary: "Explore Food & Beverages →",
    figures: [
      { value: "80K+", label: "Active restaurants across major cities" },
      { value: "20–30%", label: "Lower cost of selling for restaurants" },
      { value: "20+", label: "Cities live" },
    ],
    stats: [
      { icon: "check", text: <><strong>Fair &amp; transparent pricing</strong> — offline menu prices online</> },
      { icon: "globe", text: <>Live in <strong>Delhi, Mumbai, Bangalore &amp; Pune</strong></> },
    ],
  },
  {
    sector: "Hyperlocal Logistics",
    pill: "Logistics",
    href: "pages/hyperlocal-logistics.html",
    img: "public/assets/hero/logistics.jpg",
    h1: "Powering the Largest Supply Network for Food, Parcel & Quick-Commerce Deliveries",
    primary: "Explore Hyperlocal Logistics →",
    figures: [
      { value: "70+", label: "Hyperlocal LSPs live on the ONDC network" },
      { value: "150+", label: "Cities live" },
      { value: "50+", label: "Brands generating demand on the network" },
    ],
    // Figures only. The small-fleet and FIFO rows were cut by the category team;
    // an empty .stats-list carries no padding of its own, so it collapses away.
    stats: [],
  },
  {
    sector: "Public Transport",
    pill: "Public Transport",
    href: "pages/public-transport.html",
    img: "public/assets/hero/public-transport.jpg",
    h1: "Making public transport accessible across apps",
    primary: "Explore Public Transport →",
    figures: [
      { value: "300K+", label: "Tickets booked daily across the network" },
      { value: "25+", label: "Leading applications live" },
      { value: "20+", label: "Cities with metro & bus systems integrated" },
    ],
    stats: [
      { icon: "pin", text: <>Active across <strong>Delhi, Bengaluru, Mumbai</strong> &amp; other transit networks</> },
    ],
  },
  {
    sector: "Shared Mobility",
    pill: "Shared Mobility",
    href: "pages/shared-mobility.html",
    img: "public/assets/hero/shared-mobility.jpg",
    h1: "Catalysed India's shift to subscription-led mobility",
    primary: "Explore Shared Mobility →",
    figures: [
      { value: "900K+", label: "Drivers supported across 55+ cities" },
      { value: "20–50%", label: "Increase in driver earnings" },
    ],
    stats: [
      { icon: "rupee", text: <>Reshaped <strong>driver economics</strong> across the ride-hailing ecosystem</> },
      { icon: "truck", text: <><strong>Bharat Taxi</strong> — India's first cooperative network, live across 7 cities</> },
    ],
  },
  {
    sector: "Tourism & Experiences",
    pill: "Tourism",
    href: "pages/tourism.html",
    img: "public/assets/hero/tourism.jpg",
    h1: "Making India's Tourism Experiences discoverable and accessible across multiple consumer apps",
    primary: "Explore Tourism & Experiences →",
    figures: [
      { value: "170+", label: "ASI monuments including Taj Mahal & Red Fort" },
      { value: "350+", label: "Live events across comedy, concerts & festivals" },
      { value: "1000+", label: "Private experiences — tours, guides & theme parks" },
    ],
    stats: [
      { icon: "pin", text: <><strong>100+</strong> curated walking tours across 60+ locations</> },
      { icon: "building", text: <><strong>27 National Museums</strong> including Victoria Memorial, Indian Museum &amp; NGMA on the network</> },
    ],
  },
  {
    sector: "Finance · Credit",
    pill: "Credit",
    href: "pages/credit.html",
    img: "public/assets/hero/credit.jpg",
    h1: "Making formal credit more accessible",
    primary: "Explore Credit →",
    figures: [
      { value: "₹3.75B", label: "Lifetime disbursals" },
      { value: "11", label: "Lenders live (Bajaj Finance, Fibe, Zype…)" },
      { value: "<₹100K", label: "Average loan size" },
    ],
    stats: [
      { icon: "user", text: <>Serving <strong>MSME, new-to-credit, self-employed &amp; prime</strong> borrower segments</> },
      { icon: "grid", text: <>Small-ticket loans to the underserved</> },
      { icon: "building", text: <><strong>11 LSPs</strong> live on the network</> },
    ],
  },
  {
    sector: "Finance · Investments",
    pill: "Investments",
    href: "pages/investments.html",
    img: "public/assets/hero/investments.jpg",
    h1: "Democratizing small-ticket investments for the next billion users",
    primary: "Explore Investments →",
    figures: [
      { value: "58K+", label: "Unique investors on the network" },
      { value: "29", label: "AMCs live on the network" },
      { value: "74%", label: "Of investors from Tier 2+ cities" },
    ],
    stats: [
      { icon: "clock", text: <>Economically viable <strong>₹100 7-day daily SIPs</strong> for gig workers &amp; everyday users</> },
      { icon: "building", text: <><strong>81 distributors</strong> live on the network</> },
    ],
  },
  {
    sector: "Finance · Insurance",
    pill: "Insurance",
    href: "pages/coming-soon.html#insurance",
    img: "public/assets/hero/insurance.jpg",
    badge: "Upcoming",
    h1: "Affordable insurance for underserved communities",
    primary: "Insurance — coming soon →",
    figures: [
      { value: "Marine", word: true, label: "Pilot live on the network" },
      { value: "Gig", word: true, label: "Workers, retailers, underserved" },
      { value: "Embedded", word: true, label: "Insurance across sectors" },
    ],
    stats: [
      { icon: "check", text: <>Expanding access to <strong>formal financial protection</strong></> },
    ],
  },
];

// A cached image can fire `load` before React attaches onLoad, which would
// strand the layer at opacity 0 — hence the ref check as well as the handler.
// The flag is a DOM class rather than React state: 11 booleans re-rendering on
// every decode is churn, and className is a static string so React never
// clobbers it.
function markLoaded(el) { if (el) el.classList.add("is-loaded"); }

function HeroSlide({ slide, active, show, headId }) {
  return (
    <div className={`slide${active ? " active" : ""}`} inert={active ? undefined : ""}>
      <div className="slide-bg">
        {show && (
          <img className="slide-photo fx-drift"
            src={slide.img}
            alt=""
            fetchpriority={active ? "high" : "low"}
            decoding="async"
            ref={(el) => { if (el && el.complete) markLoaded(el); }}
            onLoad={(e) => markLoaded(e.currentTarget)}
            onError={(e) => markLoaded(e.currentTarget)} />
        )}
      </div>
      <div className="container">
        <div className="slide-content">
          <div className="slide-sector-tag"><span className="dot"></span>{slide.sector}</div>
          <h1 className="slide-h1">{slide.h1}</h1>
          <div className="slide-actions">
            <a className="btn btn-light hero-cta"
              href={slide.href || "#"}>{slide.primary}</a>
          </div>
        </div>
        <aside className="slide-stats" aria-labelledby={headId}>
          <div className="stats-header">
            <h2 className="stats-title" id={headId}>By the numbers</h2>
            <span className="stats-pill">{slide.badge || "Live"}</span>
          </div>
          {slide.figures && (
            <div className="stats-figures">
              {slide.figures.map((f, i) => (
                <div className="stats-fig" key={i}>
                  <div className={`stats-fig-num${f.word ? " is-word" : ""}`}>{f.value}</div>
                  <div className="stats-fig-label">{f.label}</div>
                </div>
              ))}
            </div>
          )}
          <ul className="stats-list">
            {slide.stats.map((s, i) => <li key={i}>{s.text}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  );
}

// ±1 of the current slide, wrapping at both ends.
const nearCurrent = (i, cur, n) => { const d = Math.abs(i - cur); return Math.min(d, n - d) <= 1; };
const prefersStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = HERO_SLIDES.length;

  // Slides already seen keep their photo element mounted, so stepping back is instant.
  const [visited, setVisited] = React.useState(() => new Set([0]));
  React.useEffect(() => {
    setVisited(v => v.has(current) ? v : new Set(v).add(current));
  }, [current]);

  // Auto-advance holds while the hero is hovered or holds focus, and never runs
  // at all for a reader who has asked for reduced motion. `current` in the deps
  // is what restarts the dwell after a manual jump.
  React.useEffect(() => {
    if (paused || prefersStill()) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 6000);
    return () => clearInterval(t);
  }, [paused, total, current]);

  const go = (i) => setCurrent(((i % total) + total) % total);

  // A sector clicked from below the fold should bring the carousel back rather
  // than swap a slide off-screen. Wired to the pill click alone -- never to
  // go() or the [current] effect -- so the 6s auto-advance and the arrows keep
  // leaving the page where the reader put it.
  const heroRef = React.useRef(null);
  const showHero = () => {
    const el = heroRef.current;
    if (!el) return;
    // Centring a hero taller than the window would clip the rail off the bottom
    // -- the control just clicked. Seat its bottom edge instead, so the sector
    // you picked stays under the cursor and the next one is still one click away.
    const tall = el.getBoundingClientRect().height > window.innerHeight;
    el.scrollIntoView({
      block: tall ? 'end' : 'center',
      behavior: prefersStill() ? 'auto' : 'smooth'
    });
  };

  // Once the rail is narrow enough to scroll, keep the active sector in view.
  // Driving the rail's own scrollLeft rather than scrollIntoView is deliberate:
  // the rail sits below the fold on load, and scrollIntoView would drag the
  // whole page down every time the carousel advanced.
  const railRef = React.useRef(null);
  const activeRef = React.useRef(null);
  React.useEffect(() => {
    const rail = railRef.current, el = activeRef.current;
    if (!rail || !el || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
      behavior: prefersStill() ? 'auto' : 'smooth'
    });
  }, [current]);

  return (
    <section className="hero" ref={heroRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      <div className="hero-slides">
        {HERO_SLIDES.map((s, i) => (
          <HeroSlide key={i}
            slide={s}
            active={i === current}
            show={nearCurrent(i, current, total) || visited.has(i)}
            headId={`slide-stats-title-${i}`} />
        ))}
      </div>
      <button className="hero-arrow prev" aria-label="Previous sector" onClick={() => go(current - 1)}>
        <Icon name="prev" size={18} viewBox="0 0 20 20" />
      </button>
      <button className="hero-arrow next" aria-label="Next sector" onClick={() => go(current + 1)}>
        <Icon name="next" size={18} viewBox="0 0 20 20" />
      </button>
      <div className="hero-pills">
        <div className="container">
          <div className="sector-rail" role="group" aria-label="Sectors on the network" ref={railRef}>
            {HERO_SLIDES.map((s, i) => (
              <button key={i} type="button"
                ref={i === current ? activeRef : null}
                className={`sector-pill${i === current ? " active" : ""}`}
                aria-current={i === current ? "true" : undefined}
                onClick={() => { go(i); showHero(); }}>{s.pill}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroCarousel, HERO_SLIDES });

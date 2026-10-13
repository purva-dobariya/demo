// Top-level App — stitches every section together in homepage order
// (matching docs/Website-copy.md) and threads the Sign Up modal demo state,
// with an optional preset role, through every CTA that opens it.

// Slim brand-statement strip between navbar and hero (copy doc lines 3–9).
function TaglineStrip() {
  return (
    <section className="tagline-strip">
      <div className="container">
        <h2>
          Building India's Digital Commerce Infrastructure
        </h2>
        <p>
          One Network. Efficiency by Design. Inclusion by Intent.
        </p>
      </div>
    </section>
  );
}

// "Find Your Place on the Network" — the four audience doors (copy doc lines 280–366).
const AUDIENCE_DOORS = [
  {
    title: "Find on ONDC", audience: "For Everyday Shoppers", icon: "cart", img: "public/assets/doors/shoppers.jpg",
    lead: "Looking for groceries, fashion, beauty products, electronics, home essentials, mobility, travel, local experiences, logistics or financial services?",
    points: [
      "Competitive prices across categories",
      "Discover unique sellers, local brands and Indian-made products",
      "New deals, offers and launches every week",
      "Access commerce, mobility, travel and financial services through the network",
    ],
    cta: { label: "Buy on ONDC", href: "pages/how-to-shop.html" },
  },
  {
    title: "Sell on ONDC", audience: "For Sellers & Brands", icon: "building", img: "public/assets/doors/sellers.jpg",
    lead: "Onboard once and reach customers across the network.",
    points: [
      "250K+ sellers already participating",
      "Reach customers through multiple commerce destinations",
      "Lower participation costs",
      "Cataloguing, logistics and onboarding support available",
      "Sell alongside leading national and regional brands",
    ],
    cta: { label: "Sell on ONDC", role: "seller" },
  },
  {
    title: "Build on ONDC", audience: "For Buyer and Seller Applications", icon: "grid", img: "public/assets/doors/builders.jpg",
    lead: "Build a business rapidly on ONDC leveraging your access to sellers or buyers.",
    points: [
      "300+ participants already connected to the network",
      "Build Buyer Apps (Customer Facing) and Seller Apps (Merchant/ Manufacturer onboarding)",
      "Access shared infrastructure and network services",
      "Launch faster and scale across categories",
    ],
    cta: { label: "Build on ONDC", role: "buyer" },
  },
  {
    title: "Enable Commerce", audience: "For Logistics, Financial Services & Ecosystem Enablers", icon: "truck", img: "public/assets/doors/enablers.jpg",
    lead: "Power the movement of goods, services and transactions across one growing network.",
    points: [
      "Enable commerce at national scale",
      "Connect with businesses, sellers and consumers",
      "Create category-specific solutions",
      "Participate in a growing digital commerce ecosystem",
    ],
    cta: { label: "Explore Opportunities", role: "logistics" },
  },
];

/* One reveal-on-scroll for any section: adds .hv-in to the given root when it
 * enters, letting its .hv-rv children (with their inline stagger delays)
 * rise. Final state immediately under reduced motion. */
function useReveal(ref, threshold) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) {
      el.classList.add("hv-in");
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      el.classList.add("hv-in");
      io.disconnect();
      // The stagger delays exist only for the entrance; left in place they
      // would also postpone every later hover transition on the same node.
      // A class (not clearing inline styles) survives React re-renders.
      setTimeout(() => el.classList.add("hv-done"), 1400);
    }, { threshold: threshold || 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

function FindYourPlace({ onSignUp }) {
  const trackRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  useReveal(sectionRef);
  const [progress, setProgress] = React.useState(0);
  const total = AUDIENCE_DOORS.length;

  const step = () => {
    const el = trackRef.current;
    const card = el?.querySelector(".door-card");
    if (!card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).gap) || 0);
  };
  const scrollByDir = (d) => {
    const track = trackRef.current;
    if (track) glideTo(track, track.scrollLeft + d * step());
  };
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className="infra" id="find-your-place" ref={sectionRef}>
      <div className="container">
        <div className="section-header hv-rv">
          <h2>Find Your Place on the Network</h2>
          <p>Whether you are shopping, selling, building or enabling commerce, there is a place for you on ONDC.</p>
        </div>
        <div className="doors-wrap" data-end={progress >= 0.999}>
          <button className="doors-arrow prev" aria-label="Previous" disabled={progress <= 0}
            onClick={() => scrollByDir(-1)}>
            <Icon name="prev" size={16} viewBox="0 0 20 20" />
          </button>
          <button className="doors-arrow next" aria-label="Next" disabled={progress >= .999}
            onClick={() => scrollByDir(1)}>
            <Icon name="next" size={16} viewBox="0 0 20 20" />
          </button>
          <div className="doors-track" ref={trackRef} onScroll={onScroll}>
            {AUDIENCE_DOORS.map((d, i) => (
              <div className="door-card hv-rv" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="door-media">
                  <img src={d.img} alt={d.audience} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="door-media-tag">{d.title}</div>
                </div>
                <div className="door-body">
                  <div className="infra-name">{d.audience}</div>
                  <div className="infra-desc">{d.lead}</div>
                  <ul className="infra-bullets">
                    {d.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                  {d.cta && (d.cta.href ? (
                    <a className="btn btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }}
                      href={d.cta.href}>{d.cta.label}</a>
                  ) : (
                    <button className="btn btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }}
                      onClick={() => onSignUp(d.cta.role)}>{d.cta.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="doors-progress">
          <div className="doors-progress-bar" style={{ transform: `scaleX(${Math.min(1, 1 / total + progress * (1 - 1 / total))})` }} />
        </div>
      </div>
    </section>
  );
}

const PORTAL_URL = "https://portal.ondc.org/";

/* The expanding node field, behind the light half of the page: the About Us
 * journey constellation re-cut as a full-viewport background — see
 * src/scripts/home-network.js for the engine and why it is a sibling of that
 * page's inline one rather than a shared abstraction.
 *
 * Pure scroll scrub: page progress from the end of the sector carousel to the
 * foot of the document decides how far the network has grown, so scrolling
 * back up retracts it — all the way down to the single point it grew from.
 * Nothing exists until the reader is past the carousel, which is the
 * homepage's stand-in for the category pages; that gate also subsumes the old
 * "never run alongside the hero's own engine" guard, since the carousel sits
 * below the hero. Sits out reduced motion entirely, and each section header
 * crossing the viewport flares the lit node nearest it. It never touches
 * meshBus: that module-level singleton belongs to the hero. */
function HomeAmbient() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const Net = window.HomeNetwork;
    if (!canvas || !Net) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const net = Net.create(canvas);
    net.resize();

    let raf = 0, running = false;

    const frame = (now) => {
      if (!running) return;
      net.frame(now);
      raf = requestAnimationFrame(frame);
    };

    const setRunning = (on) => {
      if (on === running) return;
      running = on;
      // data-on drives the CSS fade, so the point materialises as the reader
      // leaves the carousel instead of the layer popping in at full strength.
      canvas.toggleAttribute("data-on", on);
      if (on) { raf = requestAnimationFrame(frame); return; }
      cancelAnimationFrame(raf);
      // Pausing must also blank the bitmap: this canvas sits later in the
      // tree than the hero, so a lingering last frame would paint over it
      // when scrolling back up — the same lingering-frame trap as the map.
      net.clear();
    };

    // The trigger: the carousel's bottom edge crossing the bottom of the
    // viewport. A passive scroll listener is the pattern this codebase already
    // uses for scrub work (Hero.jsx, DPISection.jsx), and it is exact — an
    // IntersectionObserver would need rootMargin gymnastics to fire on that
    // same line. net.past() keeps the measurement in one place.
    const sync = () => setRunning(net.past() && !document.hidden);
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);

    const onResize = () => { net.resize(); sync(); };
    window.addEventListener("resize", onResize);

    // Once on mount, so a reload part-way down the page lands in the right state.
    sync();

    // The response: entering a new section flares the network where the
    // reader is looking and pushes pulses out from there.
    const heads = document.querySelectorAll(
      ".metrics-header, .dpi-header, .infra .section-header, .testimonials .section-header, .news .section-header"
    );
    const sectionIo = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const r = e.target.getBoundingClientRect();
        net.flareAt(r.left + r.width / 2, r.top + r.height / 2);
      });
    }, { threshold: 0.4 });
    heads.forEach((h) => sectionIo.observe(h));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      sectionIo.disconnect();
      net.destroy();
    };
  }, []);

  return <canvas className="home-ambient" ref={canvasRef} aria-hidden="true" />;
}

function App() {
  const openSignUp = () => window.open(PORTAL_URL, "_blank", "noopener");

  // Every section below is rendered by React, so the browser resolves the URL
  // hash before its target exists and a deep link lands at the top instead.
  // Re-apply it once mounted so cross-page links to #site-top and
  // #find-your-place land on the intended section.
  React.useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    // instant, not smooth: html sets scroll-behavior:smooth and the hero's own
    // scroll handler cancels an animated jump partway.
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
    <>
      {/* The floating glass navbar is constant across every page, hero included. */}
      <div id="site-header" data-visible="true">
        <Navbar onSignUp={openSignUp} />
      </div>
      <OndcHero />
      <HomeAmbient />
      <TaglineStrip />
      <div id="site-top">
        <HeroCarousel />
      </div>
      <MetricsBar />
      <DPISection onSignUp={openSignUp} />
      <FindYourPlace onSignUp={openSignUp} />
      <Testimonials />
      <News />
      <Footer onSignUp={openSignUp} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// Key metrics band (copy doc lines 182–197).
// id="financial" is the interim anchor target for the hero's financial slides.

const METRICS = [
  { num: "500M+", label: <>Transactions<br/>till date</> },
  { num: "500",   label: <>Orders per<br/>minute</> },
  { num: "250K+", label: <>Sellers on<br/>the network</> },
  { num: "300+",  label: <>Network<br/>participants</> },
];

// "500M+" → { value: 500, suffix: "M+" } — the numeral counts, the suffix rides.
function splitMetric(num) {
  const m = /^(\d+)(.*)$/.exec(num);
  return m ? { value: parseInt(m[1], 10), suffix: m[2] } : { value: null, suffix: num };
}

function MetricsBar() {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);

  // One observer arms everything: the .hv-rv reveals fire (the per-cell
  // transitionDelay stagger was dead code until now — no observer ever set a
  // class), and the numerals count up once.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("hv-in");
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      el.classList.add("hv-in");
      setSeen(true);
      io.disconnect();
      // Entrance-only stagger: left in place it would delay later transitions.
      setTimeout(() => el.classList.add("hv-done"), 1400);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="metrics-bar" id="financial" ref={ref}>
      <div className="container">
        <div className="metrics-header hv-rv">
          <h2 className="metrics-h2">The impact one open network has enabled</h2>
        </div>
        <div className="metrics-row">
          {METRICS.map((m, i) => (
            <React.Fragment key={i}>
              <div className="metric hv-rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="metric-fill" aria-hidden="true" />
                <div className="metric-num"><MetricCount num={m.num} go={seen} /></div>
                <div className="metric-label">{m.label}</div>
              </div>
              {i < METRICS.length - 1 && <div className="metric-sep"></div>}
            </React.Fragment>
          ))}
        </div>
        <p className="metrics-tagline hv-rv" style={{ transitionDelay: "360ms" }}>
          From kiranas and gig workers to first-time investors and daily commuters — an open network spanning Retail, Logistics, Mobility, Tourism and Financial Services.
        </p>
      </div>
    </section>
  );
}

// The kit count-up: 1200ms, cubic ease-out, fires once when the band reveals.
function MetricCount({ num, go }) {
  const { value, suffix } = splitMetric(num);
  const [shown, setShown] = React.useState(value === null ? num : 0);
  const done = React.useRef(false);

  React.useEffect(() => {
    if (!go || done.current || value === null) return undefined;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1200);
      setShown(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);

  return value === null ? num : <>{shown}{suffix}</>;
}

Object.assign(window, { MetricsBar });

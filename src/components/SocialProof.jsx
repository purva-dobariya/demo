// Stories From The Network (copy doc lines 368–456) + In-the-news + Footer.
// Voice attributions are role descriptors, not invented names (copy marks the
// named attributions as "Part C" pending). Featured story/video, newsroom and
// browse links have no live targets yet, so they render as text, never dead links.

// Real seller voices, sourced from ONDC's own LinkedIn testimonial posts.
// `poster` is the published post creative itself — the quote, the name, the
// role and the ONDC mark are all baked into the artwork, so the UI never
// re-typesets them. `quote`/`name`/`role` stay here as the accessible text
// equivalent (alt + aria-label), which is the only place they're needed.
// Posters are 3:4 today; the frame is 4:5 so 1080×1350 drops in unchanged.
const VOICES = [
  {
    tag: "Seller Story",
    name: "Harshal Gada",
    role: "Director, Onlinebecho Solutions India Pvt Ltd",
    quote: "ONDC is a game changer ecommerce platform that has allowed us to increase our brands to a national level. The user base of the ONDC Network is increasing multifolds month on month.",
    poster: "public/assets/the_network/1.jpeg",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7442813849013157888",
  },
  {
    tag: "Seller Story",
    name: "Rahul Jaishwal",
    role: "Founder, APIDEAR",
    quote: "As a budding entrepreneur with little prior experience in the digital business ecosystem, ONDC Network and UdyamWell proved to be a true blessing in disguise… instilled in me the confidence to innovate and expand my product range.",
    poster: "public/assets/the_network/2.jpeg",
    // Brief listed post 1's URL again for this slot; 2.jpeg is Rahul Jaishwal,
    // whose post is this one. Confirm if a different post was intended.
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7443542399223693312",
  },
  {
    tag: "Seller Story",
    name: "Sanjeev Bhardwaj",
    role: "Founder, SukeshKart",
    quote: "Compared to traditional private marketplaces, ONDC Network offers a more economical and transparent model, creating a level playing field and expanding opportunities for MSMEs and manufacturers across India.",
    poster: "public/assets/the_network/3.jpeg",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7442083536192536577",
  },
];

function Testimonials() {
  const sectionRef = React.useRef(null);
  useReveal(sectionRef);
  return (
    <section className="testimonials" id="stories" ref={sectionRef}>
      <div className="container">
        <div className="section-header hv-rv">
          <h2>The Network in Action</h2>
          <p>Built by businesses, technology providers, logistics partners, financial institutions and millions of consumers across India.</p>
        </div>

        {/* Three seller voices as nodes hanging from the section's radial —
            each card opens the original ONDC post. The poster carries the
            quote and attribution, so the visible chrome adds only the link
            affordance; the full quote rides along in aria-label. */}
        <div className="net-wire" aria-hidden="true" />
        <div className="net-grid">
          {VOICES.map((v, i) => (
            <a className="net-card hv-rv" key={i} href={v.href} target="_blank" rel="noopener noreferrer"
              style={{ transitionDelay: `${120 + i * 110}ms` }}
              aria-label={`${v.name}, ${v.role}: “${v.quote}” — open the post on LinkedIn`}>
              <span className="net-node" aria-hidden="true" />
              <div className="net-poster">
                <img src={v.poster} alt={`${v.name}, ${v.role}: “${v.quote}”`} loading="lazy" />
              </div>
              <div className="net-foot" aria-hidden="true">
                <span className="net-tag">{v.tag}</span>
                <span className="net-open">
                  <LinkedInMark /> View post
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Ecosystem logo wall omitted: copy flags "assets and logo licences required". */}
      </div>
    </section>
  );
}

// Newsroom & Media — live press coverage, in editorial priority order.
// Headlines are our own short-form summaries; `source` names the publication the
// card links out to, and images are the publishers' own article images.
const NEWS = [
  {
    pub: "DigiDukaan",
    source: "Inc42",
    headline: "One open network for kirana procurement",
    dek: "DigiDukaan connects retailers, distributors and brands directly — 10K+ retailers and 35+ brands already live in the Hyderabad pilot.",
    img: "public/assets/news/news-digidukaan-inc42.jpg",
    href: "https://inc42.com/buzz/how-ondc-plans-to-digitise-b2b-procurement-for-kirana-stores-through-digidukaan/",
  },
  {
    pub: "DigiDukaan",
    source: "BW Businessworld",
    headline: "FMCG brands back the push to modernise general trade",
    dek: "Major FMCG players join DigiDukaan to bring better pricing, schemes and margins to India's neighbourhood stores.",
    img: "public/assets/news/news-digidukaan-fmcg-bw.jpg",
    href: "https://www.businessworld.in/article/ondc-s-digidukaan-initiative-gains-fmcg-backing-to-modernise-general-trade-network-610614",
  },
  {
    pub: "Public Transport",
    source: "Business Standard",
    headline: "300K bus and metro tickets booked every day",
    dek: "Transit ticketing runs inside the apps people already use, as the network crosses 500M cumulative transactions.",
    img: "public/assets/news/news-transit-bs.jpg",
    href: "https://www.business-standard.com/industry/news/ondc-enables-three-lakh-daily-bus-and-metro-ticket-bookings-126060101212_1.html",
  },
  {
    pub: "Logistics",
    source: "Entrackr",
    headline: "Uber enters B2B logistics in India on ONDC",
    dek: "Uber Direct launches through the network, opening on-demand delivery capacity to businesses of every size.",
    img: "public/assets/news/news-uber-b2b-entrackr.webp",
    href: "https://entrackr.com/snippets/uber-india-enters-b2b-logistics-via-ondc-10898856",
  },
  {
    pub: "Financial Services",
    source: "ET BFSI",
    headline: "Loans, insurance and more, delivered over the network",
    dek: "ONDC is rolling out a full financial services suite — unsecured loans, business finance and insurance — within 18 months.",
    img: "public/assets/news/news-finserv-etbfsi.jpg",
    href: "https://bfsi.economictimes.indiatimes.com/articles/ondc-expands-financial-services-unsecured-loans-insurance-and-more-in-18-months/123514520",
  },
  {
    pub: "Food & Beverages",
    source: "Adgully",
    headline: "Flipkart enters food delivery through ONDC",
    dek: "A phased rollout across urban markets plugs Flipkart into the network's restaurant supply instead of a captive platform.",
    img: "public/assets/news/news-flipkart-food-adgully.jpg",
    href: "https://www.adgully.com/post/18439/flipkart-enters-food-delivery-ecosystem-through-ondc-integration",
  },
];

const pad2 = (n) => String(n).padStart(2, "0");

const ONDC_LINKEDIN_URL = "https://www.linkedin.com/company/open-network-for-digital-commerce";

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06L12 2.16zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

// Footer social row — order matches the ONDC brand sheet.
const SOCIALS = [
  { label: "LinkedIn", href: ONDC_LINKEDIN_URL, Mark: LinkedInMark },
  { label: "Instagram", href: "https://www.instagram.com/ondc_official/", Mark: InstagramMark },
  { label: "YouTube", href: "https://www.youtube.com/@ondc1300", Mark: YouTubeMark },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100076520217598", Mark: FacebookMark },
  { label: "X", href: "https://x.com/ONDC_Official", Mark: XMark },
];

function News() {
  const trackRef = React.useRef(null);
  const [atEnd, setAtEnd] = React.useState(false);
  const [atStart, setAtStart] = React.useState(true);

  // Drives the right-edge fade on .news-rail-wrap — hides once there's nothing
  // left to scroll to — and the disabled state on both rail arrows.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
    setAtStart(el.scrollLeft <= 8);
  };

  // Same one-card-per-click stepping as the "Find Your Place" rail.
  const step = () => {
    const el = trackRef.current;
    const card = el?.querySelector(".news-card");
    if (!card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).gap) || 0);
  };
  const scrollByDir = (d) => {
    const track = trackRef.current;
    if (track) glideTo(track, track.scrollLeft + d * step());
  };

  // Clippings deal in as the rail scrolls into view. The stagger comes from the
  // per-card transitionDelay below.
  React.useEffect(() => {
    const cards = trackRef.current?.querySelectorAll(".news-card");
    if (!cards?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => c.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="news">
      <div className="container">
        <div className="section-header">
          <h2>ONDC in the News</h2>
          <p>ONDC in the press — announcements, network milestones and coverage from across the ecosystem.</p>
        </div>

        <div className="news-rail-wrap" data-end={String(atEnd)}>
          <button className="doors-arrow prev" aria-label="Previous" disabled={atStart}
            onClick={() => scrollByDir(-1)}>
            <Icon name="prev" size={16} viewBox="0 0 20 20" />
          </button>
          <button className="doors-arrow next" aria-label="Next" disabled={atEnd}
            onClick={() => scrollByDir(1)}>
            <Icon name="next" size={16} viewBox="0 0 20 20" />
          </button>

          <div className="news-rail" ref={trackRef} onScroll={onScroll}
            tabIndex={0} role="region" aria-label="Press coverage — scroll horizontally">
            {NEWS.map((n, i) => (
              <a className="news-card" key={i} href={n.href} target="_blank" rel="noopener noreferrer"
                style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="news-thumb">
                  <img src={n.img} alt={n.headline} loading="lazy" />
                  <div className="news-thumb-tag">{n.pub}</div>
                </div>
                <div className="news-body">
                  <div className="news-slug">
                    <span className="news-slug-src">{n.source}</span>
                    <span className="news-slug-rule" aria-hidden="true" />
                    <span className="news-slug-no" aria-hidden="true">{pad2(i + 1)}</span>
                  </div>
                  <div className="news-headline">{n.headline}</div>
                  <div className="news-dek">{n.dek}</div>
                  <span className="news-cta">
                    Read on {n.source} <Icon name="arrowR" size={12} />
                  </span>
                </div>
              </a>
            ))}
            <a className="news-card news-more" href={ONDC_LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
              style={{ transitionDelay: `${NEWS.length * 90}ms` }}>
              <div className="news-more-mark"><LinkedInMark /></div>
              <div className="news-more-label">Stay in the loop</div>
              <div className="news-more-headline">View more on LinkedIn</div>
              <div className="news-more-dek">More announcements, network milestones and press mentions, as they land.</div>
              <span className="news-cta">
                View on LinkedIn <Icon name="arrowR" size={12} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer — links map to real pages; "get started" items open the sign-up modal;
// no href="#" and no dead-end links.
const FOOTER_GROUPS = [
  {
    head: "About ONDC", links: [
      { label: "Overview", href: "pages/about-us.html" },
      { label: "Board Of Directors", href: "pages/about-us.html#board-of-directors" },
      { label: "Careers", href: "pages/careers.html" },
      { label: "Download the Strategy Paper", href: "https://ondc-static-web-bucket.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/files/ONDCStrategyPaper_ucvfjm/1659889490.pdf" },
      { label: "Download the Public Consultation Paper", href: "https://ondc-static-web-bucket.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/files/ONDC_Building_Trust_Consultation_Vf_utbodw/1664541553.pdf" },
      { label: "Annual Newsletter — FY25-26 in Focus", href: "public/assets/newsletters/ondc-fy25-26-in-focus.pdf" },
      { label: "Quarterly Newsletter — ONDC Pulse FY26-27 Q1", href: "public/assets/newsletters/ondc-pulse-2026-27-q1.pdf" },
    ]
  },
  {
    head: "Roles you can play", links: [
      { label: "Buyer Network Participant", href: "pages/buyer-network-participants.html" },
      { label: "Seller Network Participant", href: "pages/seller-network-participants.html" },
      { label: "Gateway", href: "pages/gateway.html" },
      { label: "Technology Service Provider", href: "pages/technology-service-provider.html" },
    ]
  },
  {
    head: "Help & Support", links: [
      { label: "Resources", href: "pages/resources.html" },
      { label: "Contact Us", href: "pages/contact-us.html" },
      { label: "Complaint", href: "pages/complaint.html" },
      { label: "Network Participants", href: "pages/network-participants.html" },
      { label: "Ecosystem Participants", href: "pages/ecosystem-participants.html" },
      { label: "Payment Assurance Program", href: "pages/payment-assurance-program.html" },
      { label: "RFPs/RFQs", href: "pages/rfp.html" },
      { label: "Privacy Policy", href: "pages/privacy-policy.html" },
      { label: "Cookie Policy", href: "pages/cookie-policy.html" },
      { label: "Terms and Conditions", href: "pages/terms-and-conditions.html" },
    ]
  },
];

function Footer({ onSignUp }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div style={{ marginBottom: 18 }}>
              <LogoMark height={42} />
            </div>
            <p>India's open network for commerce — not an app, not a platform. Infrastructure for everyone.</p>
          </div>
          {FOOTER_GROUPS.map((g, i) => (
            <div key={i}>
              <div className="footer-col-head">{g.head}</div>
              {g.links.map((l, j) => l.href ? (
                <a className="footer-link" href={l.href} key={j}
                  {...((l.href.startsWith("http") || l.href.endsWith(".pdf")) ? { target: "_blank", rel: "noopener" } : {})}>{l.label}</a>
              ) : (
                <a className="footer-link" href="#find-your-place" key={j}
                  onClick={(e) => { e.preventDefault(); onSignUp && onSignUp(l.role); }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 ONDC</span>
          <div className="footer-social">
            {SOCIALS.map(({ label, href, Mark }) => (
              <a className="footer-social-link" key={label} href={href}
                target="_blank" rel="noopener noreferrer" aria-label={`ONDC on ${label}`}>
                <Mark />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Testimonials, News, Footer });

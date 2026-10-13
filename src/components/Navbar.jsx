// Sticky brand navbar.

function Navbar({ onSignUp }) {
  // An entry with `children` renders as a <details> dropdown; fx.js positions
  // the panel and handles outside-click / Escape on every page, this one included.
  const links = [
    { label: "Home", href: "#site-top", active: true },
    { label: "About", href: "pages/about-us.html" },
    { label: "Roles You Can Play", href: "#find-your-place" },
    { label: "How To Join", href: "https://portal.ondc.org/", external: true },
    { label: "Resources", href: "pages/resources.html" },
    { label: "Complaints", href: "pages/complaint.html" },
    { label: "ONDC Participants", children: [
      { label: "Network Participants", href: "pages/network-participants.html" },
      { label: "Ecosystem Participants", href: "pages/ecosystem-participants.html" },
    ] },
    { label: "RFPs/RFQs", href: "pages/rfp.html" },
    { label: "Contact", href: "pages/contact-us.html" },
    { label: "Careers", href: "pages/careers.html" },
  ];
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-logo">
          <LogoMark height={52}/>
        </div>
        <div className="nav-links">
          {links.map((l, i) => l.children ? (
            <details className="nav-drop" key={i}>
              <summary className="nav-link">
                {l.label}
                <svg className="nav-drop-chev" width="8" height="5" viewBox="0 0 8 5" fill="none"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M1 1l3 3 3-3"/>
                </svg>
              </summary>
              <div className="nav-drop-menu">
                {l.children.map((c, j) => <a key={j} href={c.href}>{c.label}</a>)}
              </div>
            </details>
          ) : (
            <a
              className={"nav-link" + (l.active ? " active" : "")}
              key={i}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
        {/* Keep the CTA in the same .nav-right wrapper used by static pages so
            the link row centres against consistent navbar geometry. */}
        <div className="nav-right">
          <button className="nav-cta" onClick={onSignUp}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { Navbar });

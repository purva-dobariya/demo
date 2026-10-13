// ONDC UI kit · Primitives
// Shared low-level building blocks. Style is fully driven by styles.css.
const { useState } = React;

// Icon utility — inline SVG, 24×24, 2 stroke, currentColor. Maps short keys → paths.
const ICON_PATHS = {
  chartUp:   <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
  cart:      <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></>,
  rupee:     <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3M9 13c6.667 0 6.667-10 0-10"/>,
  clock:     <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  building:  <><path d="M3 21V9l9-6 9 6v12M9 21V12h6v9"/></>,
  truck:     <path d="M3 7h13l5 5v5h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3z"/>,
  globe:     <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  user:      <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
  star:      <path d="M12 2l3 6 6 .9-4.5 4.3L18 20l-6-3.2L6 20l1.5-6.8L3 8.9 9 8z"/>,
  grid:      <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></>,
  pin:       <><circle cx="12" cy="10" r="3"/><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/></>,
  check:     <><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></>,
  shield:    <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6z"/>,
  bus:       <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 4v14M17 4v14M3 11h18"/></>,
  bolt:      <path d="M13 2L3 14h7l-1 8 10-12h-7z"/>,
  chevronD:  <path d="M1 1l3 3 3-3"/>,
  arrowR:    <path d="M3 7h8M8 4l3 3-3 3"/>,
  prev:      <path d="M13 4l-6 6 6 6"/>,
  next:      <path d="M7 4l6 6-6 6"/>,
  catalogue: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h6M8 17h4"/></>,
  network:   <><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M9.5 9.5L7 7M14.5 9.5L17 7M9.5 14.5L7 17M14.5 14.5L17 17"/></>,
  language:  <><circle cx="8" cy="8" r="6"/><path d="M8 2c-2 2-3 4-3 6s1 4 3 6"/><path d="M2 8h12"/></>,
  phone:     <path d="M14 10.67c0 .26-.06.5-.18.74a2.12 2.12 0 0 1-.5.66c-.3.27-.62.4-.97.41a2.4 2.4 0 0 1-.77-.12l-.74-.37-.77-.38a10.1 10.1 0 0 1-4.08-4.08l-.38-.78-.36-.73a2.4 2.4 0 0 1-.12-.77c0-.34.13-.66.4-.96.26-.3.55-.45.87-.45.12 0 .24.03.35.08.12.05.23.13.3.25l1.47 2.07c.08.11.15.23.19.35.05.11.07.22.07.32 0 .13-.04.26-.1.38-.06.13-.15.26-.26.39l-.35.37c-.05.05-.07.11-.07.17 0 .03 0 .06.02.09l.02.06a8.55 8.55 0 0 0 1.14 1.56 8.55 8.55 0 0 0 1.55 1.14l.06.02c.03.01.06.02.1.02.07 0 .13-.03.18-.08l.35-.37c.13-.12.26-.21.39-.27.13-.06.26-.09.38-.09.1 0 .2.02.32.07.12.05.24.11.35.19l2.1 1.49c.11.08.19.18.25.3.05.1.07.22.07.34z"/>,
  briefcase: <><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 2v1h4V2"/></>,
  image:     <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>,
};

function Icon({ name, size = 24, stroke = 2, viewBox = "0 0 24 24", ...rest }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {path}
    </svg>
  );
}

function Button({ variant = "primary", size, children, onClick }) {
  const cls = ["btn", `btn-${variant}`, size === "sm" && "btn-sm"].filter(Boolean).join(" ");
  return <button className={cls} onClick={onClick}>{children}</button>;
}

function Pill({ children, color = "blue" }) {
  return <span className="pill">{children}</span>;
}

// Full ONDC logo (mark + wordmark + "Open Network for Digital Commerce" tagline).
// SVG natural aspect ratio is ~841×399 (≈2.11:1). Size by height.
function LogoMark({ height = 44, variant = "default" }) {
  // variant "default" keeps the SVG's native blue gradient (works on cream / light).
  // variant "light" inverts to a white silhouette via CSS filter — for dark / navy footer.
  const filter = variant === "light"
    ? "brightness(0) invert(1)"
    : undefined;
  return (
    <img src="public/assets/ondc-logo.svg" alt="ONDC — Open Network for Digital Commerce"
         style={{ height, width: "auto", display: "block", filter }}/>
  );
}

// Generic "image goes here" placeholder — used wherever a real photo/asset
// hasn't been supplied yet. Fills its parent; parent controls size/shape.
function ImagePlaceholder({ label }) {
  return (
    <div className="img-placeholder">
      <Icon name="image" size={28} stroke={1.4}/>
      {label && <span>{label}</span>}
    </div>
  );
}

function StatBullet({ icon, children }) {
  return (
    <li>
      <span className="ico"><Icon name={icon} size={16}/></span>
      <div>{children}</div>
    </li>
  );
}

Object.assign(window, { Icon, Button, Pill, LogoMark, StatBullet, ImagePlaceholder });

// Programmatic element scrolling for the horizontal rails. Native
// scrollTo/scrollBy with behavior:"smooth" silently never starts on elements
// under the site-wide `zoom` (scale.css), so every rail arrow was dead. This
// animates scrollLeft by hand: fixed 450ms, the house entrance curve
// (fast attack, long settle, no overshoot), cancelled cleanly if a new glide
// or a user gesture takes over.
function glideTo(el, left) {
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  const target = Math.max(0, Math.min(max, left));
  const from = el.scrollLeft;
  if (Math.abs(target - from) < 1) return;
  if (el._glide) cancelAnimationFrame(el._glide);
  const cancel = () => { cancelAnimationFrame(el._glide); el._glide = 0; cleanup(); };
  const cleanup = () => ["wheel", "touchstart", "pointerdown"].forEach((t) => el.removeEventListener(t, cancel));
  ["wheel", "touchstart", "pointerdown"].forEach((t) => el.addEventListener(t, cancel, { passive: true, once: true }));
  const t0 = performance.now(), dur = 450;
  const ease = (p) => 1 - Math.pow(1 - p, 3);
  const frame = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    el.scrollLeft = from + (target - from) * ease(p);
    if (p < 1) el._glide = requestAnimationFrame(frame);
    else { el._glide = 0; cleanup(); }
  };
  el._glide = requestAnimationFrame(frame);
}

Object.assign(window, { glideTo });

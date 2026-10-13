# ONDC Website — Current Live Copy (Snapshot: 2026-08-21)

> **What this file is.** A manual, page-by-page vetting compared the copy in this folder's reference doc (`website-copy.md.md`, plus the standalone `credit.md.md` / `insurance.md.md` / `investments.md.md` / `Abous_Us_New.md`, which duplicate the same drafted sections) against what is *actually live* on the website today. Every page that has a corresponding section in the reference doc shows substantial, systematic disparity — reworded headlines, replaced section headers, added/dropped stats, restructured "Why Join" audiences, and in several cases entire subsections (e.g. the Bharat Taxi feature on Shared Mobility, the Insurance landing page, most of the About Us doc) that simply are not built.
>
> **This file does not replace the reference doc** and the reference doc has not been edited. This is a new, separate snapshot of what is currently shipping, extracted read-only from the live HTML/JSX source. No website code was changed to produce it.
>
> **Coverage note:** All pages with a corresponding reference-doc section (Home, D2C Retail, DigiDukaan, Impact Retail, F&B, Hyperlocal Logistics, Public Transport, Shared Mobility, Tourism, Credit, Investments, Insurance, About Us) are fully captured below, each with an explicit disparity summary. All other live pages are also captured for completeness. Ten secondary `/resources/*` sub-pages (Mobility, Services, Investor Corner, Marketing, Network Policy, NP Agreement, Publications, Guidance, Governance, Academy) share the identical template already documented under "Resources" below (hero tag / H1 / subhead + dynamic document list) but their page-specific hero copy was still being extracted at the time this file was written and is marked **[PENDING]**.
>
> Shared site chrome (navbar links, standard footer columns, "Explore other sectors" pill nav) is documented once under **Shared Site Chrome** near the end rather than repeated on every page.

---

## Homepage (`index.html` → React components in `src/components/`)

### Navbar
Home · About · ONDC Participants (dropdown: Network Participants, Ecosystem Participants) · Roles You Can Play · How To Join (→ portal.ondc.org) · Resources · Complaints · RFPs/RFQs · Contact · Button: **Sign Up**

### Hero — Act 1 "Genesis" (scroll-driven beats)
- "Every business in India / deserves access to every customer in India."
- "ONDC connects them / through one open network."
- "Sellers, buyer apps, logistics and payments / speak one shared language."
- "And when every connection holds hands, / a country takes shape."
- Lockup: **ONDC** — "Building India's Digital Commerce Infrastructure" — "One Network. Efficiency by Design. Inclusion by Intent."
- CTAs: **Explore the network** · **Join the ecosystem**

### Hero — Act 2 "Impact"
- Beat: "The network is live across this map. Here is what it carries."
- Headline: "The impact one open network has enabled"
- Metrics: **500M+** transactions till date · **300+** network participants (two more metric slots — cities, sellers — currently blank/gated)

### Tagline Strip
- H2: "Building India's Digital Commerce Infrastructure"
- P: "One Network. Efficiency by Design. Inclusion by Intent."

### Hero Carousel — 11 sector slides ("By the numbers" panel, auto-advances 6s)
1. **Retail · D2C Brands** — "A low-cost, sustainable e-commerce channel for brands" — 75K+ sellers across electronics, beauty, grocery, health & wellness · Channel commissions 5–10% lower on average · 30%+ branded products priced lower than other e-commerce platforms · Warehousing, logistics & marketing support — CTA "Explore D2C →"
2. **Retail · DigiDukaan** — "Bringing efficiency to supply operations for general trade, including kiranas, distributors & brands" — 98K+ orders till date · Live in 2 cities (Hyderabad & Jaipur) · 400+ brands available through one procurement platform · Daily replenishment replacing weekly distributor cycles · 12K+ Kiranas' inventory digitised · Reduced working capital lock-up for kiranas — CTA "Explore DigiDukaan →"
3. **Amazing India** — "Bringing India's kisaans and karigars to digital markets" — 1,500 FPOs on the network · 50K+ farmers connected · 800+ independent sellers onboarded · Double-digit month-on-month growth · 500 orders by a single seller on Amazing India Gold in one day · Handholding across Packaging, Warehousing, Logistics · Expanding across FPOs and districts nationwide — CTA "Explore Amazing India →"
4. **Food & Beverages** — "Lower-cost digital commerce for restaurants and food brands" — 20–30% lower cost of selling for restaurants · Fair & transparent pricing — offline menu prices online · 80K+ active restaurants across major cities · Live in Delhi, Mumbai, Bangalore, Pune + 20+ cities — CTA "Explore Food & Beverages →"
5. **Hyperlocal Logistics** — "Making India's logistics more efficient by bringing long-tail delivery fleets online" — 30+ small fleet operators · Live across 150+ cities · 50+ Hyperlocal LSPs · 50K+ sellers leveraging the logistics network · FIFO allocation enables deliveries in <15 mins — CTA "Explore Hyperlocal Logistics →"
6. **Public Transport** — "Making public transport accessible across apps" — 300K+ tickets booked daily · Live across 25+ leading applications · Integrated with metro & bus systems across 20+ cities · Active across Delhi, Bengaluru, Mumbai & other transit networks — CTA "Explore Public Transport →"
7. **Shared Mobility** — "Catalysed India's shift to subscription-led mobility" — Reshaped driver economics · 20–50% increase in driver earnings · 900K+ drivers across 55+ cities · Bharat Taxi — India's first cooperative network, live across 7 cities · Bharat Taxi scaled to ~15K rides/day — CTA "Explore Shared Mobility →"
8. **Tourism & Experiences** — "India's tourism, digitised" — 170+ ASI monuments incl. Taj Mahal, Red Fort & Qutub Minar · 12 National Museums incl. Victoria Memorial, Indian Museum & NGMA · 250+ live events · 420+ local experiences · Seamless discovery & ticketing — CTA "Explore Tourism & Experiences →"
9. **Finance · Credit** — "Making formal credit more accessible" — Serving MSME, new-to-credit, self-employed & prime borrower segments · Lifetime disbursals crossed ₹3.75B · Small-ticket loans avg below ₹100K · 11 lenders (Bajaj Finance, Fibe, Zype…) & 11 LSPs — CTA "Explore Credit →"
10. **Finance · Investments** — "Democratizing small-ticket investments for the next billion users" — 58K+ unique investors · ₹100 7-day daily SIPs for gig workers & everyday users · ~74% of investors from Tier 2+ cities · 29 AMCs and 81 distributors live — CTA "Explore Investments →"
11. **Finance · Insurance** (badge: "Upcoming") — "Affordable insurance for underserved communities" — Marine insurance pilot live · Designed for gig workers, small retailers & underserved users · Expanding embedded insurance participation · Expanding access to formal financial protection — CTA "Insurance — coming soon →"

### Metrics Bar
- H2: "The impact one open network has enabled"
- 500M+ Transactions till date · 500 Orders per minute · 250K+ Sellers on the network · 300+ Network participants
- Tagline: "From kiranas and gig workers to first-time investors and daily commuters — an open network spanning Retail, Logistics, Mobility, Tourism and Financial Services."

### Building Blocks (9 cards, no per-card CTA)
- H2: "Building Blocks Behind the Network"
- Sub: "Digital commerce creates the greatest value when opportunity is accessible to every business. From neighbourhood kiranas to national brands, ONDC provides shared infrastructure that helps participants connect with customers, reduce costs and grow across an open network."
1. **DigiCatalog** — "Create once. Sell across many channels." — Build a single product catalogue for multiple commerce destinations with AI-powered infrastructure for discoverability, compliance, validation, and export readiness.
2. **Gateway** — "One connection. Thousands of opportunities." — Access buyers, sellers, logistics providers, and service partners through a common network layer.
3. **Registry** — "Find trusted partners faster" — A verified network directory that helps participants discover, trust, and connect while reducing onboarding friction.
4. **Discovery & Search** — "Reach customers beyond your own storefront" — Help products and services get discovered across a growing network of buyer applications.
5. **Reconciliation & Payments** — "Spend less time matching transactions" — Simplify settlements and payment tracking across multiple network participants.
6. **Dispute Resolution** — "Trust backed by accountability" — Resolve issues faster through structured grievance and dispute frameworks.
7. **Shared Commerce Services** — "Enterprise-grade capabilities without enterprise costs" — Access common commerce services that reduce the need to build and maintain complex infrastructure.
8. **Verifiable Credentials** — "Trust that is proven, not assumed." — A two-layer trust system giving every seller and participant a verified identity, and making licences, registrations, quality scores and reputation portable across the network.
9. **Bharat Tourism Stack** — "Verified Indian experiences, discoverable at last." — Built with the Ministry of Tourism: surfaces provider credentials, licences and certifications at the point of booking.

### Find Your Place on the Network (4 audience doors)
- H2: "Find Your Place on the Network"
- Sub: "Whether you are shopping, selling, building or enabling commerce, there is a place for you on ONDC."
1. **Find on ONDC** / For Everyday Shoppers — Competitive prices across categories · Discover unique sellers, local brands and Bharat-made products · New deals every week · Access commerce, mobility, travel and financial services — CTA "Buy on ONDC"
2. **Sell on ONDC** / For Sellers & Brands — 250K+ sellers already participating · Reach customers through multiple commerce destinations · Lower participation costs · Cataloguing/logistics/onboarding support · Sell alongside leading national and regional brands — CTA "Sell on ONDC"
3. **Build on ONDC** / For Buyer and Seller Applications — 300+ participants already connected · Build Buyer Apps and Seller Apps · Access shared infrastructure and network services · Launch faster and scale — CTA "Build on ONDC"
4. **Enable Commerce** / For Logistics, Financial Services & Ecosystem Enablers — Enable commerce at national scale · Connect with businesses, sellers and consumers · Create category-specific solutions · Participate in a growing digital commerce ecosystem — CTA "Explore Opportunities"

### The Network in Action (Testimonials)
- H2: "The Network in Action" / Sub: "Built by businesses, technology providers, logistics partners, financial institutions and millions of consumers across Bharat."
- Harshal Gada, Director, Onlinebecho Solutions India Pvt Ltd — "ONDC is a game changer ecommerce platform that has allowed us to increase our brands to a national level. The user base of the ONDC Network is increasing multifolds month on month."
- Rahul Jaishwal, Founder, APIDEAR — "As a budding entrepreneur with little prior experience in the digital business ecosystem, ONDC Network and UdyamWell proved to be a true blessing in disguise… instilled in me the confidence to innovate and expand my product range."
- Sanjeev Bhardwaj, Founder, SukeshKart — "Compared to traditional private marketplaces, ONDC Network offers a more economical and transparent model, creating a level playing field and expanding opportunities for MSMEs and manufacturers across India."

### ONDC News
- H2: "ONDC News" / Sub: "ONDC in the press — announcements, network milestones and coverage from across the ecosystem."
1. DigiDukaan / Inc42 — "One open network for kirana procurement" — "DigiDukaan connects retailers, distributors and brands directly — 10K+ retailers and 35+ brands already live in the Hyderabad pilot."
2. DigiDukaan / BW Businessworld — "FMCG brands back the push to modernise general trade" — "Major FMCG players join DigiDukaan to bring better pricing, schemes and margins to India's neighbourhood stores."
3. Public Transport / Business Standard — "300K bus and metro tickets booked every day" — "Transit ticketing runs inside the apps people already use, as the network crosses 500M cumulative transactions."
4. Logistics / Entrackr — "Uber enters B2B logistics in India on ONDC" — "Uber Direct launches through the network, opening on-demand delivery capacity to businesses of every size."
5. Financial Services / ET BFSI — "Loans, insurance and more, delivered over the network" — "ONDC is rolling out a full financial services suite — unsecured loans, business finance and insurance — within 18 months."
6. Food & Beverages / Adgully — "Flipkart enters food delivery through ONDC" — "A phased rollout across urban markets plugs Flipkart into the network's restaurant supply instead of a captive platform."
- "Stay in the loop" card — "View more on LinkedIn" — "More announcements, network milestones and press mentions, as they land."

**Disparity vs. reference doc:** Tourism carousel headline drops the doc's "Book iconic monuments, museums, live events & local experiences" half entirely. Investments carousel figures (58K+ investors, ₹100 SIP, ~74% Tier 2+) diverge numerically from the doc's (46,000+ investors, ₹10 SIP, ~67%) — not just rewording. Section 2 metric "500M+ transactions till date" replaces the doc's "218M+ transactions in FY 2025-26" with a different number and framing; "cities served" placeholder is dropped entirely; site adds an "Orders per minute" metric not in the doc. The entire **"Vyapar LM / Commerce AI" section is missing** from the live site. Building Blocks are reordered and gain two cards not in the doc (Verifiable Credentials, Bharat Tourism Stack) while losing per-card CTAs and the standalone Shared Commerce Services section styling. **The Government Validation quote (Piyush Goyal), the Ecosystem Wall of logos, Featured Story/Video of the Month, the doc's placeholder Seller/Buyer/Technology stories, and "Browse More Stories" are all absent** — replaced by three real named testimonials and a built-out "ONDC News" section, neither of which exist in the doc.

---

## D2C Retail (`pages/d2c-retail.html`)

*Note: this page was recently rebuilt (v2 redesign) — see `src/scripts/d2c-retail-v2.js` / `src/styles/d2c-retail-v2.css`. Its indicator stats carry an on-page disclaimer: "Figures retained from the supplied page; source and date verification required before publication."*

### Hero
- H1: "Providing a low-cost and sustainable e-commerce channel for brands"
- Body: "Creating a more sustainable commerce ecosystem for D2C brands through lower commissions, wider digital visibility, connected logistics infrastructure and growth support across India."
- CTAs: List your brand · How it works

### How the network opens up
01 Multiple commerce apps · 02 Connected logistics · 03 Better profitability · 04 Growth and onboarding support

### D2C on ONDC, by the numbers
*(flagged unverified — see note above)*
- 2x+ monthly — Double-digit monthly growth across participating brands
- 75K+ — Sellers across electronics, grocery, beauty, wellness and lifestyle
- 30%+ lower — Branded products priced lower than other e-commerce platforms
- 5–10% lower — Channel commission on average, improving brand profitability
- Shared — Warehousing and logistics infrastructure enabling scalable fulfilment
- 20x+ — Growth in demand across leading buyer apps including Bajaj Finserv, Hamaramall and One India Mall

### Participant rail
"Active across buyer apps and brands" — Bajaj Finserv, HamaraMall, Portronics, Renée, Zilibuy, DigiHaat, One India Mall, Mystore, Snapdeal, Bajaj Markets

### Reality section
- H2: "Digital retail in India has grown rapidly, but participation remains uneven."
- Body: "While larger brands benefit from scale, visibility and distribution leverage, many emerging and regional businesses continue facing structural barriers to sustainable growth."
- Pull-quote: "As competition intensifies, sustainable growth increasingly depends on improving efficiency across the commerce value chain, not just increasing visibility."
- **Five barriers keep the route fragmented:** Rising customer acquisition costs · High commission-led marketplace models · Fragmented fulfilment and logistics operations · Limited access to scalable digital discovery · Operational dependence on a limited number of platforms

### Mechanism section — "One integration. Many storefronts. Better economics."
01 **Access to Multiple Commerce Apps** — Reach customers across different commerce platforms · Reduce dependence on a single marketplace · Increase product visibility and customer reach
02 **Connected Logistics Support** — Use multiple logistics providers easily · Improve delivery reach across cities and regions · Scale operations without managing separate integrations
03 **Better Profitability** — Reduce platform and operational costs · Improve margins on every order · Build more efficient digital growth models
04 **Growth and Onboarding Support** — Onboarding assistance and catalogue support · Marketing collaborations and buyer app partnerships · Listing support for emerging and growing brands

### Role CTA
- H2: "Join the retail commerce network" — Sell / Shop / Build-Enable panel

**Disparity vs. reference doc:** Doc's four full audience-targeted blocks ("For D2C Brands," "For Emerging & Regional Businesses," "For Customers," "For Technology & Ecosystem Participants") have **no live equivalent at all** — collapsed into a compact "choose your role" panel. Doc's "Five barriers" list is different (doc: Rising CAC, high commissions, limited access to Quick Commerce, private-label competition, "no voice on the table"; site swaps in fragmented fulfilment, scalable discovery, platform dependence — private-label competition is dropped entirely). Indicator stats have no source in the doc at all (doc has no numeric stats block for this page) and are explicitly flagged unverified in the live HTML itself. New "Better Profitability" mechanism chapter has no doc counterpart. Doc's CTA list ("Join our community," "Integrate your services," "Explore the network") mostly missing.

---

## DigiDukaan (`pages/digidukaan.html`)

### Hero
- H1: "Digitising supply operations for general trade, kiranas, distributors & brands"
- Sub: "Building a more efficient and connected supply ecosystem for kiranas, distributors and brands through digitised procurement, faster replenishment, scheme transparency and smarter inventory access."

### DigiDukaan on ONDC, by the numbers
10K+ kiranas digitised · 1K+ distributors onboarded · 35+ brands enabled · Live in Hyderabad, expanding to Jaipur + 3 cities · Daily replenishment replacing slower weekly cycles · Reduced working-capital lock-up for retailers

### Structural Reality
- H2: "India's kiranas power everyday commerce, but procurement remains fragmented and manual."
- **Key challenges:** Retailer app fatigue · Time-consuming procurement · Working capital lock-up · Limited scheme visibility · Distributors operate manually

### How It Works — "One interface. Many suppliers. Smarter replenishment."
01 One Unified Ordering Interface · 02 Powered by Proven Industry Partners (Salescode, Qwipo, Bizom) · 03 Smarter Replenishment Cycles · 04 Real-Time Visibility Across Ecosystem · 05 Existing Distributor Networks Continue

### Why Join
For Kiranas · For Brands · For Distributors & Wholesalers · For the Retail Ecosystem (each with 3–4 bullets, matching the doc almost verbatim at bullet level)

### CTA
"Power general-trade digitisation" — Buttons: Onboard kirana networks · Partner as a brand

**Disparity vs. reference doc:** This is the closest page to its doc source at the bullet level (Why Join sections match almost verbatim), but the **doc's granular stakeholder pain-point lists are the single biggest gap on the site**: doc's "For retailers" (5 bullets), "For distributors" (3 bullets) and "For brands" (5 bullets, including the specific "10%+ stock-outs at retailers – competition replaces your brand" line) are entirely absent, replaced by a generic 5-card "Key challenges" list not sourced from the doc. Doc's CTA list has 4 items ("Onboard Kirana Networks," "Integrate Distribution Systems," "Partner as a Brand," "Explore DigiDukaan") — only 2 ship live; "Integrate Distribution Systems" and "Explore DigiDukaan" are missing.

---

## Amazing India / Impact Retail (`pages/impact-retail.html`)

### Hero
- H1: "Bringing Bharat's kisaans and karigars to digital markets"
- Sub: "Helping grassroots producers, SHGs, farmers and artisans sell across India through digital access, fulfilment support and scalable commerce models."

### Stats (6 of the doc's 7 bullets survive, reworded)
2x growth in order volumes since April 2025 · Unified Amazing India Swadeshi branding · 4 aggregators (NAFED, Ekgaon, EL World Organic, NSC) · India Post + DCGpack fulfilment · 500 orders/day by a single Amazing India Gold seller · Multi-city India Post warehousing

### Structural Reality
- H2: "Millions of farmers, artisans and small producers remain outside digital commerce."
- **Key challenges:** Limited market access · Low digital visibility · Logistics and delivery gaps · Packaging and cataloguing gaps · Hard onboarding journeys

### How It Works
Digital Market Access · Seller Enablement Support · Shared Warehousing & Fulfilment · Aggregator-Led Scaling · Better Discovery for Local Products

### Why Join
For Farmers, Artisans & SHGs · For Institutions & Aggregators · For Buyers · For Fulfilment & Ecosystem Partners

### CTA
"Power Bharat's grassroots commerce" — Buttons: Onboard producer networks · Explore Amazing India Swadeshi

**Disparity vs. reference doc:** Doc's 7th What's-Latest bullet ("Growing digital demand for locally-made and regional Indian products") is dropped. Doc's flat 3-bullet challenge list is expanded/restructured into 5 titled cards, adding a new "Hard onboarding journeys" challenge not explicitly named that way in the doc. Doc's CTA has 4 items; only 2 ("Onboard producer networks," "Explore Amazing India Swadeshi") ship — "Enable Digital Market Access" and "Power Fulfilment Infrastructure" are missing. Internal site inconsistency: the "For Fulfilment & Ecosystem Partners" audience row's badge/alt text reads "For Fulfilment Partners," dropping "& Ecosystem," while the visible title keeps the full phrase.

---

## Food & Beverages (`pages/food-and-beverages.html`)

### Hero
- H1: "Better margins for restaurants, better prices for customers"
- Sub: "Helping restaurants and food brands grow digitally through better margins, multiple demand channels and interoperable delivery infrastructure."

### By the numbers
100K+ active restaurants · Up to 20% lower commissions · ~31 min avg delivery time · 95–98% fill rate · ~89% on-time delivery · Fair, transparent pricing

### Structural Reality
- H2: "Food delivery has grown rapidly, but many restaurants operate under high commissions and rising costs."
- **Key challenges:** High platform commissions · Limited pricing flexibility · Dependence on a few platforms · Fragmented delivery operations · Rising customer acquisition costs

### How It Works
Lower Commission Structures · Multiple Commerce Apps · Integrated Logistics · Better Customer Pricing · Interoperable Restaurant Network · Operational Quality & Reliability

### Why Join
For Restaurants · For Independent & Regional Food Brands · For Customers · For Technology & Ecosystem Participants

### CTA
"Join the food commerce network" — Buttons: List your restaurant · Explore the network

**Disparity vs. reference doc:** Doc's commission-reduction claim ("reduced upto 20%") is significantly more aggressive on the live site ("~25–35% down to ~8–11%") — a materially different, unsourced figure. Doc's customer pain points ("Offline menu prices rarely available online," "hidden charges added at cart level") and its closing summary sentence are dropped. Three of the six live "How It Works" cards (Integrated Logistics, Interoperable Restaurant Network, Operational Quality & Reliability) have no doc counterpart at all. The entire "For Independent & Regional Food Brands" audience segment is a site-only addition — doc only defines 3 audiences, site ships 4. Doc's "For Technology & Ecosystem Participants" bullets are completely rewritten (doc: "Access entire ONDC res supply from day 1," etc. — none of these ship). CTA "Integrate Your Services →" from the doc does not appear anywhere live.

---

## Hyperlocal Logistics (`pages/hyperlocal-logistics.html`)

### Hero
- H1: "One integration. Multiple delivery partners."
- Sub: "Open Delivery Protocol (ODP) enables sellers, brands, marketplaces and platforms to seamlessly access and manage multiple last-mile delivery providers through a single integration."

### By the numbers
50K+ riders · 150+ cities · 22+ small fleet operators · 70+ LSPs · 150K+ sellers supported · 50+ brands using the fleet

### Structural Reality
- H2: "Logistics in India operates through a distributed and fragmented ecosystem."
- **Key challenges:** Limited integrations and partnerships · Underutilised fleets · Inconsistent service levels · High last-mile cost pressures · Limited growth for regional operators

### How It Works — "One network. Many fleets. Better fulfilment."
Multiple Logistics Partners · Dynamic Routing & Allocation · Interoperable Network · Execution at Scale (FIFO — ~25% of orders, pickup time cut from ~15 min to under 6)

### Why Join
For Brands & Enterprises · For Logistics Operators · For Regional Delivery Operators · For Technology & Orchestration Players

### CTA
Buttons: Join as logistics partner · Explore the network

**Disparity vs. reference doc:** This is one of the most heavily rewritten pages. Doc's entire "The Result" subsection ("High integration costs. Operational complexity. Limited scalability.") is missing. Doc's "How Delivery Works on ONDC" section (Open Delivery Protocol framing, standardized-APIs bullet) is replaced wholesale by an unrelated 4-card "How It Works" built around FIFO routing/allocation — none of that content, including the FIFO stats, exists in the doc. Doc defines exactly 3 "Why Join" audiences with specific taglines ("Access a network, not a vendor," etc.) — none of those taglines survive; site adds a 4th audience ("For Regional Delivery Operators") not in the doc at all. Doc's CTA lists 4 distinct role-specific options; site collapses to one generic button.

---

## Public Transport (`pages/public-transport.html`)

### Hero
- H1: "Accelerating the adoption of public transport and sustainable mobility across India" *(doc's "fuel conservation" phrase is dropped)*
- Sub: "Making public transport more accessible and digitally connected by enabling metro and bus ticketing across multiple consumer apps through the open network."

### By the numbers
300K+ tickets/day · 9 metros · 10K+ buses across 20+ cities · 30+ apps · 25+ cities integrated · Multi-modal journey planning

### Structural Reality
- H2: "India moves millions of commuters daily, yet digital access to transport remains fragmented."
- **Key challenges:** Disconnected systems · Inconsistent ticketing UX · High integration overhead · Limited discoverability · Dependence on physical ticketing

### How It Works — "One integration. Many apps. Multi-modal journeys."
Integrated Public Transport Access · Single Integration, Many Apps · Multi-Modal Journey Enablement · Operational Efficiency for Authorities

### Why Join
For Metro & Bus Authorities · For Mobility & Consumer Applications · For Commuters

### CTA
Buttons: Join as authority · Explore the network

**Disparity vs. reference doc:** The doc's entire **"Connected Urban Mobility Ecosystem" subsection is missing**, including the Mumbai three-metro-lines callout and the closing "By enabling open public mobility infrastructure…" paragraph — notably, the file's own dev comment (`subtitle="Public Transport + Mumbai feature"`) signals a Mumbai feature was planned but never built into the copy. Doc names all 9 metros explicitly including "all three Mumbai Metro lines"; site's card copy drops that detail. Each "Why Join" audience is missing its doc's final bullet (5→4, 4→3, etc.). Doc's 4-item CTA bullet list is flattened into prose + 2 buttons.

---

## Shared Mobility (`pages/shared-mobility.html`)

### Hero
- H1: "Improving driver livelihoods through open mobility infrastructure"
- Sub: "Creating open mobility networks that improve driver earnings, reduce platform dependency, and make ride-hailing more accessible, transparent, and sustainable."

### By the numbers
~900K drivers across 55+ cities · 20–50% earnings increase · ~15K rides/day via Bharat Taxi · 7 cities live with Bharat Taxi · Multi-app discovery · Fair pricing

### Structural Reality
- H2: "India's ride-hailing has grown rapidly, but remains concentrated around closed, commission-led platforms."
- **Key challenges:** High commission structures · Fluctuating driver incomes · Platform dependency · Opaque pricing · Limited regional scale

### How It Works — "Interoperable, driver-first mobility models at scale"
Open Mobility Infrastructure · Subscription-Led Models · Cooperative & Decentralised Networks · Network-Led Demand Distribution

### Why Join
For Mobility Platforms & Operators · For Drivers & Fleet Owners · For Regional Mobility Networks · For Technology & Mobility Enablers

### CTA
Buttons: Join as mobility operator · Explore the network

**Disparity vs. reference doc — largest structural gap found in the audit:** The doc's entire standalone **"Bharat Taxi on ONDC" section is missing from the live page** — the "Bharat's First Cooperative Taxi Network" headline, both descriptive paragraphs, and the full "Key Outcomes" list (~15,000 rides/day, driver-first operating model, fair pricing, reduced commission dependency, multi-city expansion) do not exist anywhere live. The doc's named city list (Delhi, Noida, Gurugram, Ahmedabad, Rajkot, Dwarka, Somnath) is **never published** — the live page only shows a generic "7 cities" stat with no names. Bharat Taxi is reduced to two stat-card mentions and a partner-logo chip.

---

## Tourism / Travel Experiences (`pages/tourism.html`)

### Hero
- H1: "Digitising travel experiences across India" *(doc's second sentence — "Digitise every Tourism Experience In India... to accelerate domestic tourism and digital bookings" — is dropped)*
- Sub: "Making tourism, cultural and travel experiences more discoverable and digitally accessible by enabling experience discovery and booking across multiple consumer applications through the open network."

### By the numbers
850+ experiences · 170+ ASI monuments · 13+ museums (20 more in progress) · Multi-state tours/events · Varanasi live · Multi-app availability

### Structural Reality
- H2: "India's tourism ecosystem is one of the richest in the world, but much of it remains digitally inaccessible."
- **Key challenges:** Low discoverability · Fragmented inventory · Public and private silos · Inconsistent discovery and booking · Limited digital participation

### How It Works
Digitised Tourism & Cultural Access · Single Integration, Many Apps · Seamless Experience Discovery · Enabling Digital Tourism Growth

### Why Join
For Tourism & Cultural Institutions · For Tour & Experience Providers · For Travel & Consumer Applications · For Travellers

### CTA
Buttons: Onboard experiences · Explore the network

**Disparity vs. reference doc:** Doc structures "How It Works" as 6 subsections; live ships only 4 generic cards. Three entire doc subsections are **missing outright**: "Connected Travel Ecosystem" (including the full Varanasi narrative paragraph — only a bare "Varanasi live" stat chip survives), "Better Customer Pricing & Value," and "Operational Quality & Reliability." Doc's buyer-app list for the logo strip (Highway Delite, OneTicket, DMRC Saarthi, WhatsApp, Mondee, Staybook, TAG) barely overlaps with what's actually shown (EaseMyTrip, ixigo, redBus, Highway Delite) — only one name matches. Every "Why Join" audience is missing its 4th doc bullet. Doc CTA "Integrate Your Services →" has no live counterpart. Internal site inconsistency: stat strip says "13+" museums, the How-It-Works card says "12+" for the same fact.

---

## Credit (`pages/credit.html`)

### Hero
- H1: "Expanding credit access for India's next generation of borrowers." *(matches doc verbatim)*
- Sub: "Helping individuals, merchants and businesses access formal credit through an open, interoperable lending ecosystem." *(doc's alternate subhead option not used, as expected)*

### By the numbers
₹3B+ disbursed *(doc: ₹300 Cr+ — same magnitude, different unit style)* · 11 lenders · 11 LSPs · Unsecured/Gold loans available · Business loans, credit cards, LAMF in pipeline · 9 additional lenders in pipeline

### Structural Reality / How It Works / Why Join
Bullet-level content (barriers, 4 "How Credit Works" categories, 3 "Why Join" audiences) **matches the doc verbatim** — the closest match of any category page.

### CTA
"Participate in the Credit network" — Buttons: Access Credit → · Explore Lending Opportunities →

**Disparity vs. reference doc:** Mostly cosmetic — this page is the most faithful to its doc source. Real disparities: several section **headings** are reworded/replaced with new invented headlines ("Credit on ONDC, by the numbers," "One network. Many lenders. Broader access to formal credit," "Open credit rails, for every kind of participant") rather than using the doc's literal headers ("What's Latest?", "How Credit Works on ONDC," "Why Join ONDC"). The doc's closing summary sentence for Structural Reality is moved from the end of the section to a pull-quote at the top (reordered, not reworded). "The Structural Reality" survives only as an image `alt` attribute, not as visible text. A logo/partner strip (Appreciate, Blinkmoney, Elefin Money, etc.) is a site-only addition not in the doc.

---

## Investments (`pages/investments.html`)

### Hero
- H1/Sub match the doc verbatim.

### By the numbers — biggest area of numeric drift on this page
- 1M+ purchase transactions *(not in doc)*
- ₹1.16B AUM *(doc: ₹118 Cr+ — roughly consistent but reformatted)*
- 29 AMCs *(matches)*
- 81 distributors *(doc: "70+ small distributors onboarded" — different number/framing)*
- 58K+ unique investors *(doc: "9,000 first-time mutual fund investors" — different metric entirely)*
- 12%+ first-time MF investors *(matches)* · 70% gig-worker participation *(matches)* · ₹100 7-day SIP *(matches)*
- ~74% Tier 2+ investors *(not in doc)*
- **Missing:** doc's "Monetisation launched in April 2026" stat does not appear anywhere live.

### Structural Reality / How It Works / Why Join
Bullet-level content matches the doc almost verbatim (the doc's internal editorial asides — "? is it not as low as 10", "This is too surface level for me please help" — correctly do not appear live, as expected).

### CTA
"Participate in the Investments network" *(heading not in doc)* — Buttons: Start Investing → · Explore Investment Opportunities →

**Disparity vs. reference doc:** Concentrated almost entirely in the stats strip — several headline numbers (AUM, distributor count, investor count) diverge from the doc's figures rather than merely rewording them, and one doc stat (April 2026 monetisation) has been dropped. Section headings again replaced with new copy not in the doc ("Open investment rails, for every kind of participant").

---

## Insurance — not yet a standalone page; lives at `pages/coming-soon.html#insurance`

The doc describes a full landing page (headline, subheadline, What's Latest, Structural Reality, a 4-part "How Insurance Works" section, a 3-audience "Why Join," dual CTAs). **None of that has been built.** The live site only has a generic "not live yet" template shared across 9 unrelated capabilities (DigiCatalog, Registry, Discovery & Search, Reconciliation & Payments, Dispute Resolution, Shared Commerce Services, Verifiable Credentials, Bharat Tourism Stack, Insurance), with three fields swapped per vertical:

- Status: "Pilot stage"
- Headline: "Insurance on ONDC isn't live yet"
- Blurb: "A marine and logistics insurance pilot is running on the network, and sachet-sized cover for gig workers, small retailers and other underserved users is being designed with insurers. Open participation is not there yet."
- Generic CTAs: "See what's already live →" · "Read the network policy" *(doc's insurance-specific CTAs — "Protect Your Business →", "Explore Insurance Solutions →" — do not exist live)*

**Disparity vs. reference doc:** Effectively total. The doc's insurer names (Bajaj, Kotak), the June 2026 launch date, the monetisation timeline, the full "Structural Reality" underinsurance framing, all four "How Insurance Works" subsections, and all three "Why Join" audience blocks are **entirely absent**. Only the general "pilot" framing survives in one blurb sentence.

---

## About Us (`pages/about-us.html`)

### What's live
- **"Our Journey" interactive timeline** (2021–2026, year-by-year milestones from the first coriander order in Bengaluru to 500M+ transactions) — **entirely new content, not in the doc at all.**
- Hero: headline/subheadline/supporting copy closely match the doc.
- **Why ONDC Matters**: new heading ("One of the world's fastest-growing digital economies, with room to include many more"); challenge bullets match the doc's first draft variant almost exactly, opportunity bullets match the doc's second draft variant ("Copy of About us page") almost exactly — i.e. the live page is a **hybrid of both doc drafts**, not a clean match to either.
- Detailed, fully built-out **Investor Relations, Board of Directors, Rewards & Recognition, Careers panel, and Newsletters** sections — the doc only has bare section-heading placeholders annotated "(on existing website)" for these, so this is expected reuse rather than a true gap.

### What's in the doc but missing live
- **"What is ONDC?"** section (heading "An Open Network Built for Scale, Inclusion and Innovation," full "About ONDC" prose, "OUR FOCUS" 4-column grid)
- **"India's Digital Infrastructure Journey"** (Aadhaar/UPI/DigiLocker/FASTag narrative)
- **"Scale & Progress"** metrics band (220M+ transactions, 250+ cities, 150,000+ sellers, 50,000+ delivery executives, etc.)
- **"Our Mission"** — no mission statement appears anywhere on the live page
- **"Our Vision"** — no vision statement appears anywhere on the live page
- **"Our Ecosystem"** (Buyer apps / Seller apps / Logistics / Payments / TSPs / Enterprise / MSMEs)
- **"Join the Network"** call-to-action section
- **"Our Impact"** paragraph and bullet list

**Disparity vs. reference doc:** Roughly two-thirds of the doc's drafted About Us content has no live counterpart at all — confirmed via source inspection: the CSS classes for these missing sections (`.whatis`, `.mv`/`.mv-grid`, `.journey`, `.scale`, `.impact`, `.inclusion`) still exist in the page's stylesheet but are never referenced by any element in the actual `<body>`, meaning the sections were drafted/styled and then never wired up. In their place, the live page ships an original "Our Journey" timeline the doc never specifies.

---

## Buyer Network Participants (`pages/buyer-network-participants.html`)
*(no reference-doc section — extraction only)*

- Hero H1: "Buyer Network Participant's Role on ONDC" — connects buyers to the network via a buyer application; buyer-facing responsibilities (support, seamless shopping, single checkout across categories).
- "Eligible buyer applications must fulfil the following feature requirements" — 7-card carousel: Parse & Match Search Requests · Ranked Search Results · Aggregated Catalogue Data · Multi-Seller Cart · Delivery Options · Checkout & Payment · Order Confirmation.
- CTA: "Take your digital commerce to the next level" — Join as a Buyer NP →

## Seller Network Participants (`pages/seller-network-participants.html`)
*(no reference-doc section — extraction only)*

- Hero H1: "Seller Network Participant's Role on ONDC" — connects sellers via a seller application; digitizes seller catalogue, disperses payments, trains sellers on e-commerce best practices.
- **The two seller node types**: Marketplace Seller Node (MSN) — no own inventory, acts as marketplace; Inventory Seller Node (ISN) — produces/manufactures and sells own inventory only.
- CTA: "Bring your catalogue onto the ONDC network" — Join as a Seller NP →

## Gateway (`pages/gateway.html`)
*(no reference-doc section — extraction only)*

- Hero H1: "Gateway's Role on ONDC" — technology providers ensuring all sellers can be discovered; facilitate multicasting of search requests per ONDC Network Policies.
- "This lets you": Connect seamlessly · Increase your reach & visibility · Get relevant product/service information.
- CTA: "Become a Gateway on the ONDC network" →

## Technology Service Provider (`pages/technology-service-provider.html`)
*(no reference-doc section — extraction only)*

- Hero H1: "Technology Service Provider" — standalone or cloud-based software providers enabling seamless business operations without in-house tech.
- "This lets you": Streamline your business operations · Slash in-house tech hassles · Scale & succeed effectively.
- CTA: "Become a Technology Service Provider" →

## How to Shop (`pages/how-to-shop.html`)
*(no reference-doc section — extraction only)*

- Hero H1: "Shop on ONDC through any buyer app"
- **How shopping works** (4 steps): Pick a category → Choose a buyer app → Browse and order → Get confirmation and delivery updates.
- **Buyer apps on the network**, grouped: Shopping (6 apps) · Mobility, Travel & Tourism (19 apps) · Financial Services (7 apps).
- CTA: "There is a place for you on the network" — Find your place on the network.

## Network Participants (`pages/network-participants.html`) & Ecosystem Participants (`pages/ecosystem-participants.html`)
*(no reference-doc section — extraction only)*

Both pages share the same template: Hero "Building a strong ecosystem!" → filterable/searchable participant directory (dynamically loaded from live ondc.org JSON with a bundled snapshot fallback; role/category filters, CSV export, pagination) → "ONDC Participant Portal" CTA banner. Network Participants additionally filters by stage (Live / Advance Stage / Initiated) and certification; Ecosystem Participants filters by role (TSP, RSF 2.0, Settlement Agency, ODR, Account Providers, Service Enablers, e-Gift Card, Certification Agencies, Credentials Service Providers). Table row data is not static copy.

---

## Careers (`pages/careers.html`)
*(no reference-doc section — extraction only)*

Placeholder / "coming soon" page (`noindex`): "Coming soon — We're rebuilding this page. In the meantime, reach us directly if you'd like to explore opportunities at ONDC." — Back to home.

## Contact Us (`pages/contact-us.html`)
*(no reference-doc section — extraction only)*

Hero "Always listening to you!" → contact form (name/email/phone/interest dropdown/message, mailto-based submit with Gmail/Outlook/default-mail options) → Address (New Delhi HQ) and team@ondc.org.

## Cookie Policy, Privacy Policy, Terms and Conditions (`pages/cookie-policy.html`, `pages/privacy-policy.html`, `pages/terms-and-conditions.html`)
*(no reference-doc section — full legal text extracted, omitted here for length; see the audit transcript for the complete verbatim text of all clauses)*

Standard legal boilerplate pages with a table-of-contents hero pattern ("Legal" tag). Privacy Policy names the DPO (Tushar Hassija, dpo@ondc.org); Terms of Use governs under Delhi jurisdiction and references the IT Act 2000 / E-commerce Rules 2020.

## Complaint (`pages/complaint.html`)
*(no reference-doc section — extraction only)*

Hero "Empowering customers through effective grievance resolution" → 5-step "How to get help" path (file with Buyer App → get ticket number → network resolves → send evidence if asked → escalate to ONDC if stalled) → escalation triggers (48hr no response / broken promise / 30-day unresolved) → searchable/paginated Buyer App directory → 6-item FAQ → live "Status of complaints" stats panel (2024: 1,254 · 2025: 1,584 · 2026: 200 · Total: 3,038; work-in-progress/pending/resolved breakdown).

## RFP/RFQ (`pages/rfp.html`)
*(no reference-doc section — extraction only)*

Hero "Unlock Business Opportunities" → tabs (Open / Closed / Empanelled Agencies) with searchable, dynamically-populated tables → "ONDC Participant Portal" CTA.

## Resources (`pages/resources.html` + category sub-pages)
*(no reference-doc section — extraction only)*

Hub page: "Deep dive into the ONDC Network and Protocol" → global search (Ctrl-K) → Knowledge Base category grid (dynamic) → "ONDC Participant Portal" CTA.

Sub-pages extracted (each shares navbar/footer/CTA and a hero tag/H1/subhead + dynamic filterable document list):
- **Advisories** — "Stay current with network advisories"
- **Compliance Handbook** — "Compliance, consolidated"
- **Disclosures** — "Transparency by design"
- **Financial Services** — "Financial services for a billion Indians"
- **ONDC Policies** — "Policies & terms"
- **Tech Resources** — "Build on the open network"
- **Guidance on Tax** — "Tax, clarified"

Ten further sub-pages share the identical chrome (navbar/sidebar/breadcrumb/CTA/footer as above) with their own hero tag/H1/subhead and a document listing sourced live from `public/data/resources.json`:

- **Mobility** — "Movement on the open network" — MTT specifications (on-demand/scheduled/rental/outstation rides, Metro, Intercity/Intracity Bus BRDs, API specs, Swagger, IGMP), NP Agreement e-sign procedure, GitHub discussions link, business contacts.
- **Services** — "Services go open" — Skilled Services BRD/API specs, onboarding call schedule, GitHub discussions, business contact.
- **Investor Corner** — "For our shareholders" — AGM/EGM notices (2022–2025), quarterly investor newsletters, CSR/Whistle Blower policies, annual returns (Form MGT-7), shareholding pattern, MOA/AOA (several password-protected).
- **Marketing Resources** — "The ONDC brand, ready to use" — logo packs, brand guidelines, Play Store brand policy, "Fleet on Street" seller-onboarding flyer in 11 languages, "Online Business Made Simple & Easy" handbook in 12 languages.
- **ONDC Network Policy** — "The rulebook of the open network" — legal-relationships explainer, guiding principles, and Chapters 1–9 (Onboarding, Business Rules, Commercial Model, Code of Conduct, Branding Guidelines, Issue & Grievance Management, Data Governance, Technology Governance, Governance & Disciplinary Policy) plus a taxonomy document.
- **Network Participant Agreement** — "One agreement, one network" — the NP Agreement PDF and its FAQ.
- **Publications** — "Ideas behind the open network" — strategy papers, the ONDC–McKinsey joint industry report (12 sector sub-reports), RSF 2.0 documentation, seller checklists/handbooks in up to 12 languages, Network Insights editions (with narrative customer vignettes — "Aisha," "Sandhya"), Elevate NP newsletters, Success Stories newsletters, and a very long run of seasonal/regional FPO produce catalogues (Amazing India, festive, state-wise). Two live typos noted: "ONDC Network Suggessions" and "Amazing India - Sareers."
- **Guidance** — "Practical guidance for network participants" — regulatory-compliance guidance framing, links out to Guidance on Tax, seller/NP checklists, the Seller NP Handbook, edge-case resolution guidance, fraud-risk guidance, and the Network Observability Playbook + videos.
- **Governance and Policy** — "How the open network governs itself" — hub page linking to Network Policy, Advisories, Compliance Handbook, Guidance, and Disclosures sub-categories (with live resource counts), plus links to Notifications and Committees & Councils pages.
- **ONDC Academy** — "Learn the network, get certified" — intro videos in English/Hindi/Kannada plus a link out to the ONDC Academy YouTube channel and external site.

None of these 10 sub-pages are covered by the reference doc, so they carry no disparity findings — they're included here purely for completeness of the current-copy snapshot.

---

## Shared Site Chrome (repeats on every page)

**Navbar:** Home · About · ONDC Participants (dropdown: Network Participants, Ecosystem Participants) · Roles You Can Play · How To Join · Resources · Complaints · RFPs/RFQs · Contact · "Back to home" · page-specific primary CTA button.

**"Explore other sectors" pill nav** (footer area, category pages): D2C Retail · DigiDukaan · Food & Beverages · Amazing India · Hyperlocal Logistics · Public Transport · Shared Mobility · Tourism · Credit · Investments · Insurance · About ONDC · Life@ONDC.

**Footer:**
- Tagline: "India's open network for commerce — not an app, not a platform. Infrastructure for everyone."
- **About ONDC** — Overview · Board Of Directors · Download the Strategy Paper · Download the Public Consultation Paper · Annual Newsletter — FY25-26 in Focus · Quarterly Newsletter — ONDC Pulse FY26-27 Q1
- **ONDC Participants** — Network Participants · Ecosystem Participants
- **Roles you can play** — Buyer Network Participant · Seller Network Participant · Gateway · Technology Service Provider
- **Help & Support** — Resources · Contact Us · Complaint · RFPs/RFQs · Privacy Policy · Cookie Policy · Terms and Conditions
- Copyright: © 2026 ONDC

---

## Summary of disparity patterns across the whole site

1. **Section headings are almost never used verbatim.** Every category page replaces the doc's literal headers ("What's Latest?", "The Structural Reality", "How X Works on ONDC", "Why Join ONDC") with newly-written, more editorial headlines. This is systematic, not incidental.
2. **Stats drift, sometimes numerically, not just cosmetically.** Investments (AUM, distributor count, investor count), D2C Retail (all six indicator stats are explicitly flagged unverified in the HTML itself), and Credit (unit reformatting) all show figures that don't trace back cleanly to the doc.
3. **Granular stakeholder-specific pain-point lists are consistently dropped** in favor of shorter, generic "Key challenges" card grids — this happens on Logistics, Shared Mobility, Public Transport, Tourism, DigiDukaan, Impact Retail, and Food & Beverages.
4. **Whole subsections are missing outright**, not just reworded: Bharat Taxi (Shared Mobility), the Mumbai/Connected Urban Mobility Ecosystem section (Public Transport), Connected Travel Ecosystem + Better Pricing + Operational Quality (Tourism), the entire Insurance landing page, and roughly two-thirds of the About Us doc (What is ONDC, DPI Journey, Scale & Progress, Mission, Vision, Ecosystem, Join the Network, Impact).
5. **CTA lists are consistently collapsed.** Nearly every page's doc-specified 3–4 distinct CTA options (e.g. "Join as brand" / "Join as logistics service provider" / "Integrate as a tech orchestrator") are reduced to 2 generic buttons live.
6. **"Why Join" audience bullets frequently lose their last item** (Public Transport, Tourism) or gain an audience the doc never defined (Shared Mobility's "Regional Delivery Operators," Impact Retail's implicit split, Food & Beverages' "Independent & Regional Food Brands").

Credit and DigiDukaan are the most faithful to their doc sections at the bullet level; Shared Mobility, Public Transport, and Insurance show the largest structural gaps.

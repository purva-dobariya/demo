# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The D2C Retail category page primarily serves founders, operators, and teams at established, emerging, and regional brands evaluating ONDC as a sustainable commerce channel. It also routes shoppers and organisations that want to build or enable commerce on the network.

## Product Purpose

ONDC is open digital commerce infrastructure, not a marketplace or consumer app. The D2C Retail surface explains how brands can participate once, reach customers across multiple commerce applications, use connected logistics, reduce dependence on individual marketplaces, and choose the appropriate path into the network.

Success on this surface means a brand or seller understands the mechanism and opens the seller onboarding flow; a shopper finds the shopping path; or a builder/enabler reaches the correct participant path.

## Positioning

One ONDC integration connects brands to multiple independent commerce applications and shared ecosystem services instead of concentrating discovery, operations, and customer access inside a single marketplace.

## Operating Context

Visitors are comparing digital distribution channels, customer acquisition economics, marketplace dependence, fulfilment reach, onboarding effort, and opportunities to participate in India's open commerce network.

## Capabilities and Constraints

- The existing D2C route is `pages/d2c-retail.html` in a static HTML site.
- Seller conversion uses the existing `ONDCSignup.open('seller')` flow from `src/scripts/signup.js`.
- The closing conversion model has three top-level paths: Sell, Shop, and Build / Enable.
- Build / Enable progressively reveals buyer network participant, seller network participant, gateway, logistics/network participation, and technology service provider destinations.
- Existing factual D2C copy is preserved verbatim except the entire “Built for every participant in the commerce ecosystem” section, which is removed.
- Existing D2C visual styling, layout structures, components, and product imagery are not design authority for the replacement surface.
- Current statistics and commercial claims may be retained but no new metrics, customers, capabilities, benchmarks, or endorsements may be invented.

## Brand Commitments

- Preserve the ONDC name and logo.
- Preserve truthful identity, required navigation destinations, legal copy, and working links.
- The D2C page may establish an independent visual world, including a completely reinvented header and footer.
- Beckn and Networks for Humanity are reference inputs, not templates to reproduce.

## Evidence on Hand

- Current D2C copy and functional destinations in `pages/d2c-retail.html`.
- User-supplied reference screenshots in `docs/d2c-design-ref-images/`.
- External references: `https://beckn.io/` and `https://networksforhumanity.org/`.
- Current D2C statistics include 2x+ monthly growth, 75K+ sellers, 30%+ lower pricing, 5–10% lower channel commission, shared warehousing/logistics, and 20x+ demand growth. Source provenance is not present in the page and must not be fabricated.

## Product Principles

- Lead with the brand and seller's decision, then provide clear paths for every other participant.
- Demonstrate the network mechanism instead of describing ONDC as another marketplace.
- Make complexity legible without flattening the scale or ambition of open commerce.
- Preserve factual integrity and working participation paths.
- Treat accessibility, responsive behavior, and reduced-motion support as part of the design.

## Accessibility & Inclusion

The page must support keyboard navigation, semantic landmarks, visible focus, reduced motion, high zoom, mobile reflow, readable contrast, and content availability without animation or JavaScript enhancement.
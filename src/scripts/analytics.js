/* Google Analytics (GA4). One measurement ID, one place to edit it — every
   page loads this file instead of carrying its own copy of the gtag snippet. */
(function () {
  'use strict';
  var GA_MEASUREMENT_ID = 'G-HL3PQFNWBC';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  // Core Web Vitals (real-user load performance) -> GA4 events
  import('https://unpkg.com/web-vitals@4?module').then(function (wv) {
    function sendToGA(m) {
      gtag('event', m.name, {
        metric_value: Math.round(m.name === 'CLS' ? m.value * 1000 : m.value),
        metric_id: m.id,
        metric_rating: m.rating,
        non_interaction: true
      });
    }
    wv.onLCP(sendToGA);
    wv.onINP(sendToGA);
    wv.onCLS(sendToGA);
    wv.onTTFB(sendToGA);
  }).catch(function () { /* CDN blocked: skip silently */ });
})();

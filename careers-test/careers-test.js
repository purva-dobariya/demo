(function () {
  'use strict';

  var bar = document.getElementById('progBar');
  var ledger = document.querySelector('[data-careers-ledger]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lets static visual regression captures show below-the-fold reveal content
  // without changing the visitor-facing scroll behavior.
  if (window.location.search.indexOf('capture=1') !== -1) {
    document.querySelectorAll('.bk-rv').forEach(function (item) { item.classList.add('bk-in'); });
  }

  function updateProgress() {
    var root = document.documentElement;
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
    if (!ledger || reduced) return;
    var box = ledger.getBoundingClientRect();
    var progress = Math.max(0, Math.min(1, (window.innerHeight * .7 - box.top) / Math.max(1, box.height)));
    ledger.style.setProperty('--ct-ledger-progress', progress.toFixed(3));
  }

  var queued = false;
  function scheduleProgress() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; updateProgress(); });
  }

  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress);
  updateProgress();
}());

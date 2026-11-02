/* YDK Agency — interactions */
(function () {
  var doc = document.documentElement;

  /* Parallaxe de secours (navigateurs sans animation-timeline, ex. Safari/Firefox) */
  var noTimeline = !(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'));
  if (noTimeline) {
    var bar = document.querySelector('.progress');
    var ups = document.querySelectorAll('.par-up'), downs = document.querySelectorAll('.par-down'), dots = document.querySelector('.hero-dots');
    var drifts = document.querySelectorAll('.drift');
    if (bar) bar.style.display = 'block';
    var ticking = false;
    var onScroll = function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY, h = doc.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
        var p = Math.min(y, 900);
        ups.forEach(function (el) { el.style.transform = 'translateY(' + (-p * 0.12) + 'px)'; });
        downs.forEach(function (el) { el.style.transform = 'translateY(' + (p * 0.09) + 'px)'; });
        if (dots) dots.style.transform = 'translateY(' + (Math.min(y, 1000) * 0.16) + 'px)';
        drifts.forEach(function (el) {
          var r = el.getBoundingClientRect(), vh = window.innerHeight;
          var t = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
          el.style.transform = 'translateX(' + (5 - 10 * t) + '%)';
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Apparitions au défilement + compteurs */
  var count = function (el) {
    var end = parseFloat(el.getAttribute('data-count')), start = performance.now(), dur = 1400;
    var step = function (now) {
      var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(end * e);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    doc.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        e.target.querySelectorAll('[data-count]').forEach(count);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  }

  /* Profondeur du hero à la souris */
  var hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer: fine)').matches) {
    var raf = 0, mx = 0, my = 0;
    hero.addEventListener('pointermove', function (ev) {
      var r = hero.getBoundingClientRect();
      mx = (ev.clientX - r.left) / r.width - 0.5;
      my = (ev.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () {
        hero.style.setProperty('--mx', mx.toFixed(3));
        hero.style.setProperty('--my', my.toFixed(3));
        raf = 0;
      });
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--mx', '0'); hero.style.setProperty('--my', '0');
    });
  }
})();

(() => {
  const menu = document.querySelector('[data-ai-menu]');
  const links = document.querySelector('[data-ai-links]');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('[data-loop-video]').forEach(stage => {
    const id = stage.dataset.videoId;
    const poster = stage.querySelector('.case-video-poster');
    if (!id || !poster) return;
    poster.style.backgroundImage = `url(${stage.dataset.poster || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`})`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.tabIndex = -1;
    frame.title = "Sama's Sleepytime Stories — finished episode";

    let pingTimer;
    const reveal = () => {
      stage.classList.add('ready');
      clearInterval(pingTimer);
    };
    window.addEventListener('message', event => {
      if (!/youtube/.test(event.origin)) return;
      try {
        const data = JSON.parse(event.data);
        const state = data.event === 'onStateChange' ? data.info : data.info && data.info.playerState;
        if (state === 1) reveal();
      } catch {}
    });
    frame.addEventListener('load', () => {
      const ping = () => frame.contentWindow && frame.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*');
      ping();
      pingTimer = setInterval(ping, 1000);
      setTimeout(() => clearInterval(pingTimer), 15000);
    });
    stage.insertBefore(frame, stage.querySelector('.case-video-caption'));
  });
})();

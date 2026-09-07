(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ── parse a video url into {kind,id}
  function parse(url) {
    let m;
    if ((m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/))) return { kind: "yt", id: m[1] };
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { kind: "vimeo", id: m[1] };
    if ((m = url.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/))) return { kind: "ig", id: m[1] };
    return { kind: "link", id: url };
  }
  const embedSrc = v => v.kind === "yt" ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`
    : v.kind === "vimeo" ? `https://player.vimeo.com/video/${v.id}?autoplay=1&title=0&byline=0&portrait=0`
    : v.kind === "ig" ? `https://www.instagram.com/p/${v.id}/embed` : null;

  // ── thumbnails (YouTube direct, Vimeo via oEmbed, cached)
  const vimeoCache = {};
  async function vimeoThumb(id) {
    if (vimeoCache[id]) return vimeoCache[id];
    try {
      const r = await fetch(`https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F${id}&width=960`);
      const j = await r.json();
      return (vimeoCache[id] = (j.thumbnail_url || "").replace(/_\d+x\d+/, "_960x540"));
    } catch { return null; }
  }
  function setThumb(img, v) {
    img.addEventListener("load", () => { if (img.naturalWidth > 200) img.classList.add("ok"); });
    if (v.kind === "yt") {
      img.src = `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`;
      img.onload = () => { if (img.naturalWidth < 200) img.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; };
      img.onerror = () => { img.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; img.onerror = null; };
    } else if (v.kind === "vimeo") {
      vimeoThumb(v.id).then(u => { if (u) img.src = u; });
    }
  }

  // ── card factory
  const CAT = { film: "Film", motion: "Motion Graphics", video: "Video", reel: "Reel" };
  function card(item, catLabel) {
    const v = parse(item.url);
    const c = el("article", "card" + (item.featured ? " wide" : ""));
    c.dataset.cat = item.cat || "reel";
    c.innerHTML = `<div class="ph"></div><img alt="${esc(item.title)}" loading="lazy">
      <div class="play">▶</div>
      <div class="info"><div class="cat">${esc(catLabel || CAT[item.cat] || "")}</div><h3>${esc(item.title)}</h3>${item.note ? `<p class="note">${esc(item.note)}</p>` : ""}</div>`;
    setThumb($("img", c), v);
    c.addEventListener("click", () => openLB(item, v));
    return c;
  }

  // ── hero background video
  (function hero() {
    const bg = $("#heroBg");
    const poster = el("div", "poster");
    poster.style.backgroundImage = `url(https://img.youtube.com/vi/${S.heroVideo}/${S.heroPoster || "hq2.jpg"})`; // hq1/hq2/hq3 = frames at 25/50/75%
    bg.appendChild(poster);
    if (window.matchMedia("(max-width:640px)").matches || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const f = el("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${S.heroVideo}?autoplay=1&mute=1&controls=0&loop=1&playlist=${S.heroVideo}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
    f.allow = "autoplay; encrypted-media"; f.tabIndex = -1; f.title = "Background reel";
    // Only reveal the video once YouTube reports it is actually playing (state 1);
    // if autoplay is blocked we keep the poster instead of showing a dead player.
    let timer;
    const reveal = () => { bg.classList.add("ready"); clearTimeout(timer); };
    window.addEventListener("message", e => {
      if (!/youtube/.test(e.origin)) return;
      try {
        const d = JSON.parse(e.data);
        const st = d.event === "onStateChange" ? d.info : d.info && d.info.playerState;
        if (st === 1) reveal();
      } catch {}
    });
    f.addEventListener("load", () => {
      const ping = () => f.contentWindow && f.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
      ping(); timer = setInterval(ping, 1000);
      setTimeout(() => clearInterval(timer), 15000);
    });
    bg.appendChild(f);
  })();

  // ── marquee
  (function marquee() {
    const t = $("#marquee");
    const items = [...S.clients, "Film", "Motion Graphics", "Video Editing", "Short Form"];
    const html = items.map(x => `<span>${esc(x)}</span><i>✦</i>`).join("");
    t.innerHTML = html + html;
  })();

  // ── work grid + filters
  (function work() {
    const g = $("#grid");
    S.work.forEach(w => g.appendChild(card(w)));
    $("#filters").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      [...$("#filters").children].forEach(x => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      [...g.children].forEach(c => c.classList.toggle("hide", f !== "all" && c.dataset.cat !== f));
    });
  })();

  // ── reels
  S.reels.forEach(r => $("#reelGrid").appendChild(card(r, "Reel")));

  // ── shorts (Instagram embeds)
  (function shorts() {
    const g = $("#shortsGrid");
    S.shorts.forEach(s => {
      const v = parse(s.url);
      const d = el("div", "short");
      d.innerHTML = `<iframe loading="lazy" src="${embedSrc(v)}" allowtransparency="true" title="Instagram post by ${esc(s.by)}"></iframe>
        <div class="by"><span>${esc(s.by)}</span><a href="${esc(s.url)}" target="_blank" rel="noopener">Open ↗</a></div>`;
      g.appendChild(d);
    });
  })();

  // ── about / contact
  $("#bio").innerHTML = S.bio.map(p => `<p>${esc(p)}</p>`).join("");
  $("#services").innerHTML = S.services.map(s => `<li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join("");
  const em = $("#emailLink"); em.href = `mailto:${S.email}`; em.textContent = S.email;
  const ICONS = {
    linkedin: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.9h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V22h-4.6v-6.7c0-1.6 0-3.7-2.2-3.7s-2.6 1.7-2.6 3.6V22H7.8V8z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12a12 12 0 10-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0024 12z"/></svg>'
  };
  $("#socials").innerHTML = Object.entries(S.social).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${ICONS[k] || ""}${k}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  // ── lightbox
  const lb = $("#lightbox"), fr = $("#lbFrame");
  function openLB(item, v) {
    const src = embedSrc(v);
    if (!src) { window.open(item.url, "_blank"); return; }
    fr.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="${esc(item.title)}"></iframe>`;
    $("#lbTitle").textContent = item.title; $("#lbNote").textContent = item.note || "";
    lb.hidden = false; document.body.classList.add("locked");
  }
  function closeLB() { lb.hidden = true; fr.innerHTML = ""; document.body.classList.remove("locked"); }
  $("#lbClose").addEventListener("click", closeLB);
  lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLB(); });

  // ── nav behaviour
  const nav = $("#nav"), links = $(".links"), burger = $("#burger");
  addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 40), { passive: true });
  burger.addEventListener("click", () => { links.classList.toggle("open"); burger.classList.toggle("x"); });
  links.addEventListener("click", () => { links.classList.remove("open"); burger.classList.remove("x"); });

  // ── scroll reveal
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
  document.querySelectorAll(".card,.short,.stat,.section-head,.about-copy").forEach((n, i) => { n.classList.add("io"); n.style.transitionDelay = `${(i % 6) * 60}ms`; io.observe(n); });
})();

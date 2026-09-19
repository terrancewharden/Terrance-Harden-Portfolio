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
})();

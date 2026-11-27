const themeButton = document.querySelector('.theme-toggle');
const page = document.documentElement;
function updateThemeLabel() {
  const dark = page.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
updateThemeLabel();
themeButton.addEventListener('click', () => {
  page.dataset.theme = page.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('lingzhi-color-theme', page.dataset.theme); } catch (_) {}
  updateThemeLabel();
});
const sections = [...document.querySelectorAll('main > section')];
const navigation = [...document.querySelectorAll('.nav-links a')];
const portfolioTabs = document.querySelector('.portfolio-tabs');
const panels = [...document.querySelectorAll('.portfolio-panel')];
let activePanel = 'highlights';
function markSection(id) {
  navigation.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function updateActiveSection() {
  if (portfolioTabs) {
    markSection(portfolioTabs.getBoundingClientRect().top <= 120 ? activePanel : 'about');
    return;
  }
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 120) active = section;
  }
  if (active) markSection(active.id);
}
if (portfolioTabs) {
  const tabs = [...portfolioTabs.querySelectorAll('a')];
  history.scrollRestoration = 'manual';
  portfolioTabs.setAttribute('role', 'tablist');
  document.body.classList.add('has-portfolio-tabs');
  tabs.forEach(tab => tab.setAttribute('role', 'tab'));
  panels.forEach(panel => panel.setAttribute('role', 'tabpanel'));

  function panelForHash(hash) {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch (_) { return null; }
    if (id === 'projects') return 'highlights';
    return document.getElementById(id)?.closest('.portfolio-panel')?.id || null;
  }

  function activatePanel(id) {
    activePanel = id;
    panels.forEach(panel => { panel.hidden = panel.id !== id; });
    tabs.forEach(tab => {
      const selected = tab.hash === `#${id}`;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    updateActiveSection();
  }

  function updateHash(hash) {
    if (location.hash !== hash) history.pushState(null, '', hash);
  }

  function scrollToHash(hash) {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch (_) { return; }
    const target = id === 'projects' || panels.some(panel => panel.id === id)
      ? portfolioTabs : document.getElementById(id);
    target?.scrollIntoView({ block: 'start' });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      activatePanel(tab.hash.slice(1));
      updateHash(tab.hash);
      scrollToHash(tab.hash);
    });
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key === ' ') { event.preventDefault(); tab.click(); return; }
      else return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
  });

  navigation.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const panel = panelForHash(link.hash);
    if (!panel && link.hash !== '#about') return;
    event.preventDefault();
    if (panel) activatePanel(panel);
    updateHash(link.hash);
    scrollToHash(link.hash);
  }));

  function restoreLocation() {
    activatePanel(panelForHash(location.hash) || (location.hash === '#about' ? activePanel : 'highlights'));
    scrollToHash(location.hash);
  }
  activatePanel(panelForHash(location.hash) || 'highlights');
  if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash));
  window.addEventListener('popstate', restoreLocation);
  window.addEventListener('hashchange', restoreLocation);
}
window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();

// Keep full author names available without JavaScript and in print.
document.querySelectorAll('.author-group').forEach(group => {
  const button = group.querySelector('.more-authors');
  const names = group.querySelector('.more-author-names');
  button.hidden = false;
  names.hidden = true;
  button.title = `Click to view ${button.dataset.label}`;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? button.dataset.names : button.dataset.label;
    button.title = expanded ? 'Click to collapse author names' : `Click to view ${button.dataset.label}`;
  });
});

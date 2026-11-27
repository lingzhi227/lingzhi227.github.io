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
function markSection(id) {
  navigation.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function updateActiveSection() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 120) active = section;
  }
  markSection(active.id);
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

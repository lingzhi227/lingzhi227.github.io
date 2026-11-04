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
  try { localStorage.setItem('lingzhi-theme', page.dataset.theme); } catch (_) {}
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

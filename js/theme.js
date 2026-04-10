const Theme = {
  init() {
    const db = DB.get();
    const theme = db.company.theme || 'dark';
    document.body.className = `${theme}-theme`;
    Theme.applyColors(db.company.primaryColor || { h: 210, s: 100, l: 50 });
    Theme.setupListeners();
  },
  toggle() {
    const isDark = document.body.classList.contains('dark-theme');
    const next = isDark ? 'light' : 'dark';
    document.body.className = `${next}-theme`;
    const data = DB.get();
    data.company.theme = next;
    DB.save(data);
  },
  applyColors(hsl) {
    const root = document.documentElement;
    root.style.setProperty('--h', hsl.h);
    root.style.setProperty('--s', `${hsl.s}%`);
    root.style.setProperty('--l', `${hsl.l}%`);
    root.style.setProperty('--p-primary', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    root.style.setProperty('--p-primary-glow', `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 0.30)`);
    root.style.setProperty('--p-text-on-primary', Theme.textOnHsl(hsl));
  },
  textOnHsl(hsl) {
    return hsl.l > 67 ? '#111827' : '#ffffff';
  },
  setupListeners() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'theme-toggle') Theme.toggle();
    });
  }
};

const Auth = {
    login: (email, password) => {
        const db = DB.get();
        const user = db.users.find(u => u.email === email && u.password === password);
        if (user) {
            sessionStorage.setItem('N1_USER', JSON.stringify(user));
            Router.navigate('dashboard');
            return true;
        }
        return false;
    },
    logout: () => {
        sessionStorage.removeItem('N1_USER');
        Router.navigate('login');
    },
    getUser: () => {
        const user = sessionStorage.getItem('N1_USER');
        return user ? JSON.parse(user) : null;
    }
};

const Theme = {
    init: () => {
        const db = DB.get();
        const theme = db.company.theme || 'dark';
        document.body.className = `${theme}-theme`;
        Theme.applyColors(db.company.primaryColor);
        Theme.setupListeners();
    },
    toggle: () => {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        document.body.className = `${newTheme}-theme`;
        
        const data = DB.get();
        data.company.theme = newTheme;
        DB.save(data);
    },
    applyColors: (hsl) => {
        const root = document.documentElement;
        root.style.setProperty('--h', hsl.h);
        root.style.setProperty('--s', hsl.s + '%');
        root.style.setProperty('--p-primary', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
        root.style.setProperty('--p-primary-glow', `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 0.3)`);
        
        // Auto-contrast rule: if lightness > 70%, text in primary buttons should be dark
        const textOnPrimary = hsl.l > 70 ? 'black' : 'white';
        root.style.setProperty('--p-text-on-primary', textOnPrimary);
    },
    setupListeners: () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'theme-toggle') {
                Theme.toggle();
            }
        });
    }
};

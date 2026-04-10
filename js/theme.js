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
        return JSON.parse(sessionStorage.getItem('N1_USER')) || null;
    },
    canEdit: () => {
        const user = Auth.getUser();
        if (!user) return false;
        if (user.role === 'Admin') return true;
        const db = DB.get();
        if (user.role === 'Manager' && db.company.config.allowManagerEdit) return true;
        return false;
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
        const db = DB.get();
        db.company.theme = db.company.theme === 'dark' ? 'light' : 'dark';
        DB.save(db);
        Theme.init();
    },
    applyColors: (hsl) => {
        const root = document.documentElement;
        root.style.setProperty('--h', hsl.h);
        root.style.setProperty('--s', hsl.s + '%');
        root.style.setProperty('--p-primary', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
        root.style.setProperty('--p-primary-glow', `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 0.3)`);
        
        // Advanced contrast protection
        const luminance = hsl.l;
        const textOnPrimary = luminance > 65 ? '#000000' : '#ffffff';
        root.style.setProperty('--p-text-on-primary', textOnPrimary);
        
        // Body text contrast for light theme
        if (document.body.classList.contains('light-theme')) {
            root.style.setProperty('--p-text', '#1a202c');
            root.style.setProperty('--p-text-muted', '#4a5568');
        } else {
            root.style.setProperty('--p-text', '#f7fafc');
            root.style.setProperty('--p-text-muted', '#a0aec0');
        }
    },
    setupListeners: () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'theme-toggle' || e.target.closest('#theme-toggle')) {
                Theme.toggle();
            }
        });
    }
};

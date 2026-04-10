/**
 * N1NEGOCIOSV2 - CORE STATE & DB LAYER
 * Exclusive virtual database implementation.
 */

const DB_STRUCTURE = {
    company: {
        name: 'N1 NEGÓCIOS V2',
        slogan: 'Liderança e Gestão de Alto Impacto',
        logo: 'assets/logo.png',
        primaryColor: { h: 220, s: 100, l: 50 },
        theme: 'dark',
        settings: {
            allowManagerEdit: true,
            requiredVideoForExam: true
        }
    },
    roles: {
        ADMIN: 'Admin',
        MANAGER: 'Gerente',
        SUPERVISOR: 'Supervisor',
        STUDENT: 'Aluno',
        SUPPORT: 'Suporte'
    },
    users: [
        { id: 1, name: 'Diretoria N1', email: 'admin@n1.com', password: 'admin', role: 'Admin' },
        { id: 2, name: 'Carlos Gerente', email: 'gerente@n1.com', password: '123', role: 'Gerente' },
        { id: 3, name: 'Ricardo Aluno', email: 'aluno@n1.com', password: '123', role: 'Aluno' }
    ],
    modules: [
        {
            id: 'm1',
            title: 'Estratégia Corporativa',
            desc: 'Fundamentos da liderança moderna e visão de mercado.',
            icon: '📊',
            lessons: [
                { id: 'l1', title: 'Visão 2026', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:00' },
                { id: 'l2', title: 'Cultura de Alta Performance', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '18:00' }
            ],
            exam: {
                id: 'e1',
                questions: [
                    { q: 'Qual o foco da cultura N1?', options: ['Lucro', 'Pessoas', 'Ambos'], correct: 2 }
                ]
            }
        }
    ],
    progress: {},
    chatHistory: [],
    customTexts: {} // For the pencil icons
};

class StateManager {
    constructor() {
        this.data = this.load();
        this.currentUser = JSON.parse(sessionStorage.getItem('N1_SESSION')) || null;
    }

    load() {
        const local = localStorage.getItem('N1V2_SYSTEM_DB');
        return local ? JSON.parse(local) : DB_STRUCTURE;
    }

    save() {
        localStorage.setItem('N1V2_SYSTEM_DB', JSON.stringify(this.data));
        window.dispatchEvent(new CustomEvent('state-change', { detail: this.data }));
    }

    // AUTH
    async login(email, pass) {
        const user = this.data.users.find(u => u.email === email && u.password === pass);
        if (user) {
            this.currentUser = user;
            sessionStorage.setItem('N1_SESSION', JSON.stringify(user));
            return user;
        }
        throw new Error('Credenciais Inválidas');
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('N1_SESSION');
        location.reload();
    }

    // PERMISSIONS
    canEdit() {
        if (!this.currentUser) return false;
        if (this.currentUser.role === 'Admin') return true;
        if (this.currentUser.role === 'Gerente' && this.data.company.settings.allowManagerEdit) return true;
        return false;
    }

    // TEXT UPDATER (Pencil)
    updateText(key, value) {
        if (!this.canEdit()) return;
        this.data.customTexts[key] = value;
        this.save();
    }

    getText(key, fallback) {
        return this.data.customTexts[key] || fallback;
    }
}

const N1 = new StateManager();

const DB_KEY = 'N1NEGOCIOSV2_DATA';

const initialDB = {
    company: {
        name: 'N1 NEGÓCIOS V2',
        slogan: 'Liderança e Gestão de Alto Impacto',
        logo: 'https://cdn-icons-png.flaticon.com/512/3061/3061341.png',
        primaryColor: { h: 210, s: 100, l: 50 },
        theme: 'dark'
    },
    users: [
        {
            id: 1,
            name: 'Administrador Tech',
            email: 'admin@n1.com',
            password: 'admin',
            role: 'Admin'
        },
        {
            id: 2,
            name: 'João Aluno',
            email: 'aluno@n1.com',
            password: '123',
            role: 'Operator'
        }
    ],
    modules: [
        {
            id: 1,
            title: 'Mindset de Elite',
            description: 'Como configurar sua mente para resultados extraordinários.',
            image: 'assets/mod_placeholder.png',
            status: 'available',
            progress: 0,
            lessons: [
                { id: 101, title: 'Introdução ao Mindset', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10 min', completed: false },
                { id: 102, title: 'Padrões de Pensamento', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15 min', completed: false }
            ],
            quiz: {
                required: true,
                questions: [
                    { id: 1, text: 'O que é mindset fixo?', options: ['Não muda', 'Sempre cresce', 'Indiferente'], correct: 0 }
                ]
            }
        },
        {
            id: 2,
            title: 'Gestão de Tempo Pro',
            description: 'Aprenda a dominar sua agenda e dobrar sua produtividade.',
            image: 'assets/mod_placeholder.png',
            status: 'locked',
            progress: 0,
            lessons: []
        }
    ],
    chatMessages: [],
    progress: []
};

// Database utility
const DB = {
    get: () => {
        const data = localStorage.getItem(DB_KEY);
        return data ? JSON.parse(data) : initialDB;
    },
    save: (data) => {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        // Disparar evento para componentes atualizarem
        window.dispatchEvent(new Event('db-updated'));
    },
    reset: () => {
        localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
        location.reload();
    }
};

// Initialize if empty
if (!localStorage.getItem(DB_KEY)) {
    DB.save(initialDB);
}

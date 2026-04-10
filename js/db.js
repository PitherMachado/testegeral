const DB_KEY = 'N1NEGOCIOSV2_DATA';

const initialDB = {
    company: {
        name: 'N1 NEGÓCIOS V2',
        slogan: 'Liderança e Gestão de Alto Impacto',
        logo: 'assets/logo.png',
        primaryColor: { h: 210, s: 100, l: 50 },
        theme: 'dark',
        config: {
            allowManagerEdit: true,
            requiredVideo: true
        }
    },
    users: [
        { id: 1, name: 'Administrador Tech', email: 'admin@n1.com', password: 'admin', role: 'Admin' },
        { id: 2, name: 'Marcos Gerente', email: 'gerente@n1.com', password: '123', role: 'Manager' },
        { id: 3, name: 'João Aluno', email: 'aluno@n1.com', password: '123', role: 'Operator' }
    ],
    modules: [
        {
            id: 1,
            title: 'Mindset de Elite',
            description: 'Como configurar sua mente para resultados extraordinários.',
            image: 'assets/mod_placeholder.png',
            status: 'available',
            progress: 15,
            lessons: [
                { id: 101, title: 'Introdução ao Mindset', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:00', completed: true },
                { id: 102, title: 'Padrões de Pensamento', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15:30', completed: false }
            ],
            quiz: {
                id: 'q1',
                required: true,
                questions: [
                    { id: 1, text: 'Qual o principal pilar do N1?', options: ['Foco', 'Disciplina', 'Ambos'], correct: 2 }
                ]
            }
        },
        {
            id: 2,
            title: 'Gestão de Tempo Pro',
            description: 'Domine sua agenda e dobre sua produtividade.',
            image: 'assets/mod_placeholder.png',
            status: 'locked',
            progress: 0,
            lessons: []
        }
    ],
    chat: {
        channels: [
            { id: 'sup', name: 'Supervisor', type: 'private', messages: [{ sender: 'System', text: 'Bem-vindo ao canal do Supervisor.' }] },
            { id: 'group', name: 'Grupo da Equipe', type: 'group', messages: [] },
            { id: 'support', name: 'Suporte Técnico', type: 'support', messages: [] }
        ]
    },
    customTexts: {} // Store for pencil edits
};

const DB = {
    get: () => {
        const data = localStorage.getItem(DB_KEY);
        return data ? JSON.parse(data) : initialDB;
    },
    save: (data) => {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        window.dispatchEvent(new Event('db-updated'));
    },
    reset: () => {
        localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
        location.reload();
    }
};

if (!localStorage.getItem(DB_KEY)) {
    DB.save(initialDB);
}

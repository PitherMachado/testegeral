const DB_KEY = 'N1NEGOCIOSV2_DATA';

const initialDB = {
  company: {
    name: 'N1 NEGÓCIOS V2',
    slogan: 'Liderança e Gestão de Alto Impacto',
    logo: 'https://cdn-icons-png.flaticon.com/512/3061/3061341.png',
    primaryColor: { h: 210, s: 100, l: 50 },
    theme: 'dark',
    home_title: 'Alcance o Próximo Nível de Gestão',
    home_subtitle: 'Uma plataforma desenvolvida para líderes que não aceitam o comum. Estude, evolua e conquiste resultados extraordinários.',
    footer_text: 'Identidade Premium | V.2.1.0'
  },
  permissions: {
    managerCanEdit: false
  },
  users: [
    { id: 1, name: 'Administrador Tech', email: 'admin@n1.com', password: 'admin', role: 'Admin' },
    { id: 2, name: 'João Aluno', email: 'aluno@n1.com', password: '123', role: 'Operator' },
    { id: 3, name: 'Gerente Regional', email: 'gerente@n1.com', password: '123', role: 'Manager' }
  ],
  modules: [
    {
      id: 1,
      title: 'Mindset de Elite',
      description: 'Como configurar sua mente para resultados extraordinários.',
      image: 'assets/mod_placeholder.png',
      status: 'available',
      progress: 68,
      materials: [{ name: 'Guia Mindset.pdf', url: '#' }],
      lessons: [
        { id: 101, title: 'Introdução ao Mindset', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10 min', completed: true },
        { id: 102, title: 'Padrões de Pensamento', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15 min', completed: false }
      ],
      quiz: { required: true, questions: [{ id: 1, text: 'O que é mindset fixo?', options: ['Não muda', 'Sempre cresce', 'Indiferente'], correct: 0 }] }
    },
    {
      id: 2,
      title: 'Gestão de Tempo Pro',
      description: 'Aprenda a dominar sua agenda e dobrar sua produtividade.',
      image: 'assets/mod_placeholder.png',
      status: 'locked',
      progress: 0,
      materials: [],
      lessons: [],
      quiz: null
    }
  ],
  chats: {
    supervisor: [
      { sender: 'Supervisor Norte', direction: 'in', text: 'Bom dia. Foque no módulo atual e me chame se travar em objeções.' },
      { sender: 'Você', direction: 'out', text: 'Perfeito. Estou revisando a aula 02 agora.' }
    ],
    equipe: [
      { sender: 'Equipe Norte', direction: 'in', text: 'Pessoal, prova liberada para quem concluir a aula 02 hoje.' }
    ],
    suporte: [
      { sender: 'Suporte', direction: 'in', text: 'Olá. Posso ajudar com acesso, conteúdo ou navegação.' }
    ]
  }
};

const DB = {
  get() {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : structuredClone(initialDB);
  },
  save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('db-updated'));
  },
  reset() {
    localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
    window.dispatchEvent(new Event('db-updated'));
  }
};

if (!localStorage.getItem(DB_KEY)) DB.save(initialDB);

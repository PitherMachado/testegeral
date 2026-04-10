const Pages = {
    Home: () => {
        const user = Auth.getUser();
        const db = DB.get();
        return `
            ${Components.Header(user)}
            <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; background: url('assets/hero_bg.png') center/cover;">
                <div style="position: absolute; top: -10%; left: -10%; width: 40%; height: 40%; background: var(--p-primary); filter: blur(150px); opacity: 0.15;"></div>
                <div class="fade-in" style="text-align: center; max-width: 800px; z-index: 1;">
                    <span class="glass" style="padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--p-primary); margin-bottom: 2rem; display: inline-block;">Exclusividade & Performance</span>
                    ${Components.EditableText('h1', 'home_title', 'Alcance o Próximo Nível de Gestão', user?.role)}
                    <p style="font-size: 1.2rem; opacity: 0.8; margin: 1.5rem 0 2.5rem;">Uma plataforma desenvolvida para líderes que não aceitam o comum. Estude, evolua e conquiste resultados extraordinários.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="Router.navigate('${user ? 'dashboard' : 'login'}')" class="btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem;">Começar Agora</button>
                        <button class="glass" style="padding: 1rem 2rem; border-radius: var(--p-radius);">Saber Mais</button>
                    </div>
                </div>
            </main>
            ${Components.Footer()}
        `;
    },

    Login: () => {
        return `
            <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--p-surface-2);">
                <div class="premium-card fade-in" style="width: 400px; padding: 2.5rem;">
                    <h2 style="margin-bottom: 0.5rem;">Bem-vindo</h2>
                    <p style="opacity: 0.6; font-size: 0.9rem; margin-bottom: 2rem;">Acesse sua área exclusiva de aprendizado.</p>
                    
                    <form onsubmit="event.preventDefault(); Auth.login(this.email.value, this.password.value)" style="display: flex; flex-direction: column; gap: 1.2rem;">
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label style="font-size: 0.8rem; font-weight: 600;">E-mail</label>
                            <input type="email" name="email" class="glass" style="padding: 0.8rem; border-radius: 8px; color: white;" required value="admin@n1.com">
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label style="font-size: 0.8rem; font-weight: 600;">Senha</label>
                            <input type="password" name="password" class="glass" style="padding: 0.8rem; border-radius: 8px; color: white;" required value="admin">
                        </div>
                        <button type="submit" class="btn-primary" style="justify-content: center; margin-top: 1rem;">Entrar na Plataforma</button>
                        <p style="font-size: 0.75rem; text-align: center; opacity: 0.5;">Acesso restrito a membros autorizados.</p>
                    </form>
                </div>
            </div>
        `;
    },

    Dashboard: () => {
        const user = Auth.getUser();
        if (!user) return Router.navigate('login');
        const db = DB.get();

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 3rem 5%;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
                    <div>
                        <h2 style="font-size: 2rem;">Seu Progresso</h2>
                        <p style="opacity: 0.7;">Você concluiu 15% da jornada total.</p>
                    </div>
                    ${user.role === 'Admin' ? '<button onclick="Router.navigate(\'admin\')" class="glass" style="padding: 0.6rem 1.2rem; border-radius: 8px;">Área Administrativa</button>' : ''}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                    ${db.modules.map(mod => `
                        <div class="premium-card fade-in" style="padding: 0; cursor: pointer;" onclick="Router.navigate('module', ${mod.id})">
                            <div style="height: 180px; background: url('${mod.image}') center/cover;"></div>
                            <div style="padding: 1.5rem;">
                                <span style="font-size: 0.7rem; font-weight: 700; color: var(--p-primary); text-transform: uppercase;">Módulo ${mod.id}</span>
                                <h3 style="margin: 0.5rem 0;">${mod.title}</h3>
                                <p style="font-size: 0.85rem; opacity: 0.7; height: 40px; overflow: hidden; margin-bottom: 1rem;">${mod.description}</p>
                                ${Components.ProgressBar(mod.progress)}
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                    <span style="font-size: 0.8rem; font-weight: 600;">${mod.status === 'available' ? 'Disponível' : 'Bloqueado'}</span>
                                    <button class="glass" style="padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.75rem;">Acessar</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ${Components.FloatingChat(user)}
            ${Components.FloatingHelp(user)}
            ${Components.Footer()}
        `;
    },

    Module: (id) => {
        const user = Auth.getUser();
        const db = DB.get();
        const mod = db.modules.find(m => m.id == id);
        
        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 3rem 5%;">
                <button onclick="Router.navigate('dashboard')" style="background: none; color: var(--p-text); opacity: 0.6; margin-bottom: 2rem;">← Voltar ao Catálogo</button>
                
                <div style="display: grid; grid-template-columns: 1fr 350px; gap: 3rem;">
                    <div>
                        <div class="premium-card" style="padding: 0; height: 300px; background: url('${mod.image}') center/cover; margin-bottom: 2rem; position: relative;">
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                                <h1 style="font-size: 2.5rem; color: white;">${mod.title}</h1>
                            </div>
                        </div>
                        <h3 style="margin-bottom: 1rem;">Sobre este módulo</h3>
                        <p style="line-height: 1.6; opacity: 0.8;">${mod.description}</p>
                    </div>

                    <div class="glass" style="border-radius: var(--p-radius); padding: 2rem;">
                        <h4 style="margin-bottom: 1.5rem;">Lista de Aulas</h4>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${mod.lessons.map(less => `
                                <div onclick="Router.navigate('lesson', ${less.id})" class="glass" style="padding: 1rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: var(--transition);">
                                    <span style="width: 30px; height: 30px; border-radius: 50%; background: var(--p-surface-2); display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">▶</span>
                                    <div style="flex: 1;">
                                        <p style="font-size: 0.9rem; font-weight: 500;">${less.title}</p>
                                        <span style="font-size: 0.7rem; opacity: 0.5;">${less.duration}</span>
                                    </div>
                                    ${less.completed ? '✅' : ''}
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn-primary" style="width: 100%; margin-top: 2rem; justify-content: center;">Continuar de onde parei</button>
                    </div>
                </div>
            </div>
            ${Components.FloatingChat(user)}
            ${Components.Footer()}
        `;
    },

    Lesson: (id) => {
        const user = Auth.getUser();
        const db = DB.get();
        // find lesson
        let lesson = null;
        let parentMod = null;
        db.modules.forEach(m => {
            const l = m.lessons.find(less => less.id == id);
            if (l) { lesson = l; parentMod = m; }
        });

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 2rem 5%;">
                <div style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem;">
                    <div>
                        <div class="premium-card" style="padding: 0; aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center;">
                            <iframe width="100%" height="100%" src="${lesson.video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div style="margin-top: 2rem;">
                            <h2>${lesson.title}</h2>
                            <p style="margin-top: 1rem; opacity: 0.7; line-height: 1.6;">Nesta aula vamos aprofundar nos conceitos fundamentais apresentados no tópico anterior. Assista até o final para liberar o checklist.</p>
                        </div>
                    </div>

                    <div class="glass" style="border-radius: var(--p-radius); padding: 1.5rem;">
                        <h4 style="margin-bottom: 1.5rem;">Status da Aula</h4>
                        <div class="premium-card" style="background: var(--p-surface-2); margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
                                <input type="checkbox" id="check-comp" ${lesson.completed ? 'checked' : ''} style="width: 18px; height: 18px;">
                                <label for="check-comp">Concluí esta aula</label>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <button class="glass" style="padding: 1rem; text-align: left; font-size: 0.9rem;">📥 Download Material PDF</button>
                            <button class="glass" style="padding: 1rem; text-align: left; font-size: 0.9rem;">📝 Resumo da Aula</button>
                        </div>

                        ${parentMod.quiz ? `
                            <div style="margin-top: 2rem; padding: 1rem; background: var(--p-primary-glow); border-radius: 8px;">
                                <p style="font-size: 0.8rem; font-weight: 700; margin-bottom: 0.5rem;">PRÓXIMO PASSO:</p>
                                <button onclick="alert('Prova iniciada!')" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.8rem;">Realizar Prova do Módulo</button>
                            </div>
                        ` : ''}

                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button class="glass" style="flex: 1; padding: 0.8rem;">Aula Anterior</button>
                            <button class="glass" style="flex: 1; padding: 0.8rem;">Próxima Aula</button>
                        </div>
                    </div>
                </div>
            </div>
            ${Components.FloatingChat(user)}
             ${Components.Footer()}
        `;
    },

    Admin: () => {
        const user = Auth.getUser();
        if (user?.role !== 'Admin') return Router.navigate('dashboard');
        const db = DB.get();

        return `
            ${Components.Header(user)}
            <div style="flex: 1; display: grid; grid-template-columns: 250px 1fr; min-height: calc(100vh - 80px);">
                <div class="glass" style="padding: 2rem; border-right: 1px solid var(--p-border);">
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
                        <li style="font-weight: 700; color: var(--p-primary);">Dashboard Admin</li>
                        <li>Gestão de Usuários</li>
                        <li>Gestão de Conteúdo</li>
                        <li>Cargos e Permissões</li>
                        <li>Configurações de Identidade</li>
                    </ul>
                </div>
                
                <div style="padding: 3rem;">
                    <h2 style="margin-bottom: 2rem;">Configurações Globais</h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                        <div class="premium-card">
                            <h4>Identidade Visual</h4>
                            <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                                <div>
                                    <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem;">Cor Principal</label>
                                    <input type="color" value="#007bff" onchange="Theme.applyColors({h: 210, s: 100, l: 50})" style="width: 100%; height: 40px; border-radius: 6px; border: none; background: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem;">Logo (URL)</label>
                                    <input type="text" class="glass" style="width: 100%; padding: 0.6rem; color: white;" value="${db.company.logo}">
                                </div>
                            </div>
                        </div>

                        <div class="premium-card">
                            <h4>Permissões de Acesso</h4>
                            <div style="margin-top: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--p-border);">
                                    <span>Gerentes podem editar</span>
                                    <input type="checkbox" checked>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--p-border);">
                                    <span>Liberar prova sem vídeo</span>
                                    <input type="checkbox" checked>
                                </div>
                            </div>
                        </div>

                        <div class="premium-card" style="grid-column: span 2;">
                            <h4>Usuários Cadastrados</h4>
                            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                                <thead>
                                    <tr style="text-align: left; opacity: 0.5; font-size: 0.8rem;">
                                        <th style="padding: 10px;">ID</th>
                                        <th style="padding: 10px;">Nome</th>
                                        <th style="padding: 10px;">Cargo</th>
                                        <th style="padding: 10px;">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${db.users.map(u => `
                                        <tr style="border-bottom: 1px solid var(--p-border);">
                                            <td style="padding: 10px;">${u.id}</td>
                                            <td style="padding: 10px;">${u.name}</td>
                                            <td style="padding: 10px;"><span class="glass" style="padding: 2px 8px; border-radius: 4px; font-size: 0.7rem;">${u.role}</span></td>
                                            <td style="padding: 10px;"><button class="glass" style="font-size: 0.7rem; padding: 4px 8px;">Editar</button></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Main App Initialization
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Router.init();
    
    // Global listener for DB updates to re-render the current route
    window.addEventListener('db-updated', () => {
        Router.handleRoute();
    });
});

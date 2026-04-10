const Pages = {
    Home: () => {
        const user = Auth.getUser();
        const db = DB.get();
        return `
            ${Components.Header(user)}
            <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; background: url('assets/hero_bg.png') center/cover;">
                <div style="position: absolute; top: -10%; left: -10%; width: 40%; height: 40%; background: var(--p-primary); filter: blur(150px); opacity: 0.15;"></div>
                <div class="fade-in" style="text-align: center; max-width: 800px; z-index: 1;">
                    <span class="glass" style="padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--p-primary); margin-bottom: 2rem; display: inline-block;">
                        ${Components.Editable('span', 'home_badge', 'Exclusividade & Performance')}
                    </span>
                    ${Components.Editable('h1', 'home_title', 'Alcance o Próximo Nível de Gestão')}
                    <p style="font-size: 1.2rem; opacity: 0.8; margin: 1.5rem 0 2.5rem;">
                        ${Components.Editable('p', 'home_desc', 'Desenvolvida para líderes que não aceitam o comum. Estude e conquiste resultados extraordinários.')}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="Router.navigate('${user ? 'dashboard' : 'login'}')" class="btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem;">
                            ${Components.Editable('span', 'home_btn_1', 'Começar Agora')}
                        </button>
                        <button onclick="alert('Funcionalidade Extra: Catálogo Completo')" class="glass" style="padding: 1rem 2rem; border-radius: var(--p-radius);">
                            ${Components.Editable('span', 'home_btn_2', 'Saber Mais')}
                        </button>
                    </div>
                </div>
            </main>
            ${Components.Footer()}
        `;
    },

    Login: () => {
        return `
            <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--p-surface-2);">
                <div class="premium-card fade-in" style="width: 420px; padding: 3rem;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <img src="${DB.get().company.logo}" style="height: 50px; margin-bottom: 1rem;">
                        <h2>Acesso ao Portal</h2>
                        <p style="opacity: 0.6; font-size: 0.9rem;">Identifique-se para continuar.</p>
                    </div>
                    
                    <form onsubmit="event.preventDefault(); Auth.login(this.email.value, this.password.value)" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; opacity: 0.8;">E-mail Corporativo</label>
                            <input type="email" name="email" class="glass" style="padding: 1rem; border-radius: 8px; color: white; border: 1px solid var(--p-border);" required value="admin@n1.com">
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; opacity: 0.8;">Senha</label>
                            <input type="password" name="password" class="glass" style="padding: 1rem; border-radius: 8px; color: white; border: 1px solid var(--p-border);" required value="admin">
                        </div>
                        <button type="submit" class="btn-primary" style="justify-content: center; margin-top: 1rem; padding: 1rem;">Entrar na Plataforma</button>
                        <p style="font-size: 0.75rem; text-align: center; opacity: 0.5; cursor: pointer;" onclick="Router.navigate('home')">Voltar ao início</p>
                    </form>
                </div>
            </div>
        `;
    },

    Dashboard: () => {
        const user = Auth.getUser();
        const db = DB.get();

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 3rem 5%;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
                    <div>
                        <h2 style="font-size: 2.2rem;">Sua Jornada</h2>
                        <p style="opacity: 0.7;">Olá, ${user.name}. Continue de onde parou para evoluir.</p>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="Router.navigate('configuracoes')" class="glass" style="padding: 0.6rem 1.2rem; border-radius: 8px;">Configurações</button>
                        ${user.role === 'Admin' ? '<button onclick="Router.navigate(\'admin\')" class="btn-primary" style="padding: 0.6rem 1.2rem; border-radius: 8px;">Admin</button>' : ''}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
                    ${db.modules.map(mod => `
                        <div class="premium-card fade-in" style="padding: 0; cursor: pointer;" onclick="Router.navigate('module', ${mod.id})">
                            <div style="height: 180px; background: url('${mod.image}') center/cover;"></div>
                            <div style="padding: 1.5rem;">
                                <span style="font-size: 0.7rem; font-weight: 700; color: var(--p-primary); text-transform: uppercase;">Módulo ${mod.id}</span>
                                <h3 style="margin: 0.5rem 0;">${mod.title}</h3>
                                <p style="font-size: 0.85rem; opacity: 0.7; height: 38px; overflow: hidden; margin-bottom: 1.5rem;">${mod.description}</p>
                                ${Components.ProgressBar(mod.progress)}
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                    <span style="font-size: 0.8rem; font-weight: 600; opacity: 0.6;">${mod.status === 'available' ? 'Ativo' : 'Aguarde...'}</span>
                                    <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.75rem;">Acessar</button>
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
                <button onclick="Router.navigate('dashboard')" style="background: none; border: none; color: var(--p-text); opacity: 0.5; margin-bottom: 2rem; cursor: pointer;">← Voltar</button>
                
                <div style="display: grid; grid-template-columns: 1fr 380px; gap: 3rem;">
                    <div>
                        <div class="premium-card" style="padding: 0; height: 320px; background: url('${mod.image}') center/cover; margin-bottom: 2.5rem; border-radius: 20px;">
                            <div style="height: 100%; width: 100%; padding: 3rem; background: linear-gradient(transparent, rgba(0,0,0,0.9)); display: flex; flex-direction: column; justify-content: flex-end;">
                                <h1 style="font-size: 3rem; color: white;">${mod.title}</h1>
                                <p style="opacity: 0.8; font-size: 1.1rem; max-width: 600px;">${mod.description}</p>
                            </div>
                        </div>
                        <h3 style="margin-bottom: 1.5rem;">Ementa Completa</h3>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${mod.lessons.map(less => `
                                <div onclick="Router.navigate('lesson', ${less.id})" class="glass" style="padding: 1.2rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 1.5rem; transition: var(--transition);">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--p-surface-2); display: flex; align-items: center; justify-content: center; font-weight: 800;">
                                        ${less.completed ? '✅' : '▶'}
                                    </div>
                                    <div style="flex: 1;">
                                        <p style="font-size: 1rem; font-weight: 600;">${less.title}</p>
                                        <span style="font-size: 0.75rem; opacity: 0.5;">Vídeo Aula • ${less.duration}</span>
                                    </div>
                                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--p-primary);">${less.completed ? 'CONCLUÍDO' : 'ESTUDAR'}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="glass" style="border-radius: 20px; padding: 2.5rem; align-self: start; position: sticky; top: 120px;">
                        <h4 style="margin-bottom: 2rem; border-bottom: 1px solid var(--p-border); padding-bottom: 1rem;">Seu Avanço</h4>
                        <div style="margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem;">
                                <span>Progresso Geral</span>
                                <span>${mod.progress}%</span>
                            </div>
                            ${Components.ProgressBar(mod.progress)}
                        </div>
                        <button onclick="alert('Funcionalidade: Retomar do ponto exato de interrupção.')" class="btn-primary" style="width: 100%; justify-content: center; padding: 1rem;">Continuar de onde parei</button>
                        <p style="font-size: 0.75rem; text-align: center; opacity: 0.5; margin-top: 1.5rem;">Aperfeiçoe suas habilidades com conteúdo exclusivo N1.</p>
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
        let lesson = null;
        let parentMod = null;
        db.modules.forEach(m => {
            const l = m.lessons.find(less => less.id == id);
            if (l) { lesson = l; parentMod = m; }
        });

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 2rem 5%;">
                <button onclick="Router.navigate('module', ${parentMod.id})" style="background: none; border: none; color: var(--p-text); opacity: 0.5; margin-bottom: 1.5rem; cursor: pointer;">← Voltar ao Módulo</button>
                <div style="display: grid; grid-template-columns: 1fr 360px; gap: 2.5rem;">
                    <div>
                        <div class="premium-card" style="padding: 0; aspect-ratio: 16/9; background: #000; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                            <iframe width="100%" height="100%" src="${lesson.video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div style="margin-top: 2.5rem; display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="flex: 1;">
                                <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">${lesson.title}</h1>
                                <p style="opacity: 0.7; line-height: 1.6; max-width: 800px;">
                                    ${Components.Editable('p', 'lesson_desc_placeholder', 'Nesta aula estratégica, mergulhamos nos fundamentos de alta gestão utilizados pelas maiores companhias do mundo.')}
                                </p>
                            </div>
                            <div style="display: flex; gap: 1rem; flex-shrink: 0;">
                                <button onclick="alert('Navegando: Anterior')" class="glass" style="padding: 0.8rem 1.2rem; border-radius: 8px;">Anterior</button>
                                <button onclick="alert('Navegando: Próxima')" class="btn-primary" style="padding: 0.8rem 1.2rem; border-radius: 8px;">Próxima</button>
                            </div>
                        </div>
                    </div>

                    <div class="glass" style="border-radius: 20px; padding: 2rem; align-self: start;">
                        <h4 style="margin-bottom: 1.5rem;">Checklist de Estudos</h4>
                        <div class="premium-card" style="background: var(--p-surface-2); margin-bottom: 2rem; border: none;">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <input type="checkbox" id="check-comp" ${lesson.completed ? 'checked' : ''} style="width: 22px; height: 22px; cursor: pointer;">
                                <label for="check-comp" style="font-weight: 600; cursor: pointer;">Marcar como Concluída</label>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <button onclick="alert('Download Iniciado: Material de Apoio N1')" class="glass" style="padding: 1.2rem; text-align: left; font-size: 0.9rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem;">
                                <span style="font-size: 1.2rem;">📥</span> Download Material PDF
                            </button>
                            <button onclick="alert('Abrindo Resumo Estruturado da Aula')" class="glass" style="padding: 1.2rem; text-align: left; font-size: 0.9rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem;">
                                <span style="font-size: 1.2rem;">📝</span> Resumo do Conteúdo
                            </button>
                        </div>

                        ${parentMod.quiz ? `
                            <div style="margin-top: 3rem; padding: 1.5rem; background: var(--p-primary-glow); border-radius: 15px; border-left: 4px solid var(--p-primary);">
                                <p style="font-size: 0.75rem; font-weight: 800; margin-bottom: 0.5rem; text-transform: uppercase;">Próxima Etapa:</p>
                                <button onclick="alert('Iniciando Prova de Certificação... Prepare-se!')" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 0.8rem;">REALIZAR PROVA</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            ${Components.FloatingChat(user)}
             ${Components.Footer()}
        `;
    },

    Chat: (channelId) => {
        const user = Auth.getUser();
        const db = DB.get();
        const channel = db.chat.channels.find(c => c.id === channelId) || db.chat.channels[0];

        return `
            ${Components.Header(user)}
            <div style="flex: 1; display: grid; grid-template-columns: 320px 1fr; background: var(--p-surface-2); min-height: calc(100vh - 80px);">
                <!-- Lista de Conversas -->
                <div class="glass" style="border-right: 1px solid var(--p-border); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                    <h3 style="margin-bottom: 1rem;">Canais N1</h3>
                    ${db.chat.channels.map(c => `
                        <div onclick="Router.navigate('chat', '${c.id}')" class="${c.id === channelId ? 'btn-primary' : 'glass'}" style="padding: 1.2rem; border-radius: 12px; cursor: pointer; transition: 0.2s;">
                            <p style="font-weight: 700;">${c.name}</p>
                            <span style="font-size: 0.7rem; opacity: 0.6;">${c.type === 'private' ? 'Protegido' : 'Canal Aberto'}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Chat Ativo -->
                <div style="display: flex; flex-direction: column; height: 100%; position: relative; background: var(--p-bg); border-radius: 30px 0 0 0;">
                    <div class="glass" style="padding: 1.5rem 3rem; display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h4 style="margin: 0;">${channel.name}</h4>
                            <span style="font-size: 0.7rem; color: #4ade80;">● Online agora</span>
                        </div>
                        <button class="glass" style="padding: 0.5rem 1rem; border-radius: 8px;">Arquivos</button>
                    </div>

                    <div id="chat-messages" style="flex: 1; padding: 3rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem;">
                        ${channel.messages.map(m => `
                            <div style="align-self: ${m.sender === 'System' ? 'center' : 'flex-start'}; max-width: 80%;">
                                <div class="glass" style="padding: 1rem 1.5rem; border-radius: 15px; border-bottom-left-radius: 0;">
                                    <p style="font-size: 0.9rem;">${m.text}</p>
                                    <span style="font-size: 0.6rem; opacity: 0.4; display: block; margin-top: 0.5rem;">14:30</span>
                                </div>
                            </div>
                        `).join('')}
                        <div style="text-align: center; opacity: 0.3; font-size: 0.8rem; margin: 2rem 0;">Fim da conversa segura</div>
                    </div>

                    <div style="padding: 2rem 3rem; background: var(--p-surface); display: flex; gap: 1rem; align-items: center;">
                        <button class="glass" style="width: 45px; height: 45px; border-radius: 50%; font-size: 1.2rem;">+</button>
                        <input type="text" placeholder="Escreva sua mensagem profissional..." class="glass" style="flex: 1; padding: 1rem 1.5rem; border-radius: 25px; color: white;">
                        <button class="btn-primary" style="padding: 1rem 2rem; border-radius: 25px;">Enviar</button>
                    </div>
                </div>
            </div>
        `;
    },

    Configuracoes: () => {
        const user = Auth.getUser();
        const db = DB.get();
        if (user.role !== 'Admin' && user.role !== 'Manager') return Router.navigate('dashboard');

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 4rem 10%;">
                <h1 style="margin-bottom: 3rem;">Configurações Estratégicas</h1>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem;">
                    <!-- Branding -->
                    <div class="premium-card" style="padding: 2.5rem;">
                        <h4 style="margin-bottom: 2rem; border-bottom: 1px solid var(--p-border); padding-bottom: 1rem;">Identidade Corporativa</h4>
                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <div>
                                <label style="display: block; font-size: 0.75rem; font-weight: 800; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">Nome da Empresa</label>
                                <input type="text" class="glass" value="${db.company.name}" onchange="const d=DB.get(); d.company.name=this.value; DB.save(d)" style="width: 100%; padding: 0.8rem; color: white; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.75rem; font-weight: 800; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">URL da Logo</label>
                                <input type="text" class="glass" value="${db.company.logo}" onchange="const d=DB.get(); d.company.logo=this.value; DB.save(d)" style="width: 100%; padding: 0.8rem; color: white; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.75rem; font-weight: 800; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">Cor Primária (Matiz H)</label>
                                <input type="range" min="0" max="360" value="${db.company.primaryColor.h}" onchange="const d=DB.get(); d.company.primaryColor.h=this.value; DB.save(d)" style="width: 100%;">
                            </div>
                        </div>
                    </div>

                    <!-- Regras -->
                    <div class="premium-card" style="padding: 2.5rem;">
                        <h4 style="margin-bottom: 2rem; border-bottom: 1px solid var(--p-border); padding-bottom: 1rem;">Regras & Permissões</h4>
                        <div style="display: flex; flex-direction: column; gap: 2rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="font-weight: 700;">Edição para Gerentes</p>
                                    <span style="font-size: 0.7rem; opacity: 0.5;">Liberar os "lápis" de edição para o perfil gerente.</span>
                                </div>
                                <input type="checkbox" ${db.company.config.allowManagerEdit ? 'checked' : ''} onchange="const d=DB.get(); d.company.config.allowManagerEdit=this.checked; DB.save(d)" style="width: 20px; height: 20px;">
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="font-weight: 700;">Vídeo Obrigatório</p>
                                    <span style="font-size: 0.7rem; opacity: 0.5;">Exigir conclusão do vídeo para liberar a prova.</span>
                                </div>
                                <input type="checkbox" checked style="width: 20px; height: 20px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="premium-card" style="margin-top: 3rem; padding: 2.5rem; border: 1px solid var(--p-primary-glow);">
                    <h4 style="margin-bottom: 1.5rem;">Persistência de Dados</h4>
                    <p style="opacity: 0.6; font-size: 0.9rem; margin-bottom: 2rem;">As alterações realizadas nesta tela afetam globalmente o sistema para todos os usuários.</p>
                    <button onclick="DB.reset()" class="glass" style="color: #ff5555; border-color: #ff5555; padding: 0.8rem 1.5rem; border-radius: 8px;">Resetar para Padrão de Fábrica</button>
                </div>
            </div>
            ${Components.Footer()}
        `;
    },

    Admin: () => {
        const user = Auth.getUser();
        const db = DB.get();
        if (user.role !== 'Admin') return Router.navigate('dashboard');

        return `
            ${Components.Header(user)}
            <div style="flex: 1; padding: 4rem 10%;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <h1>Painel Administrativo</h1>
                    <button class="btn-primary" style="padding: 0.8rem 1.5rem;">+ Novo Usuário</button>
                </div>

                <div class="premium-card" style="padding: 0; overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="text-align: left; opacity: 0.5; font-size: 0.8rem; background: var(--p-surface-2); border-bottom: 1px solid var(--p-border);">
                            <th style="padding: 1.5rem;">ID</th>
                            <th style="padding: 1.5rem;">NOME</th>
                            <th style="padding: 1.5rem;">E-MAIL</th>
                            <th style="padding: 1.5rem;">PERFIL</th>
                            <th style="padding: 1.5rem;">AÇÕES</th>
                        </tr>
                        ${db.users.map(u => `
                            <tr style="border-bottom: 1px solid var(--p-border);">
                                <td style="padding: 1.5rem;">#${u.id}</td>
                                <td style="padding: 1.5rem; font-weight: 700;">${u.name}</td>
                                <td style="padding: 1.5rem;">${u.email}</td>
                                <td style="padding: 1.5rem;"><span style="background: var(--p-primary-glow); color: var(--p-primary); padding: 5px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800;">${u.role}</span></td>
                                <td style="padding: 1.5rem;"><button class="glass" style="padding: 0.5rem 1rem; border-radius: 8px;">Editar</button></td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            ${Components.Footer()}
        `;
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Router.init();
    window.addEventListener('db-updated', () => {
        Router.handleRoute();
    });
});

const Pages = {
    // LAYOUT WRAPPERS
    Header: () => {
        const u = N1.currentUser;
        return `
            <header class="glass" style="padding: 1rem 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000;">
                <div onclick="Router.navigate('home')" style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
                    <img src="${N1.data.company.logo}" style="height: 40px; border-radius: 8px;">
                    <div>
                        ${UI.editable('comp_name', N1.data.company.name, 'h4')}
                        <p style="font-size: 0.7rem; opacity: 0.6;">${UI.editable('comp_slogan', N1.data.company.slogan)}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1.5rem; align-items: center;">
                    ${u ? `
                        <div style="text-align: right;">
                            <p style="font-size: 0.8rem; font-weight: 700;">${u.name}</p>
                            <p style="font-size: 0.65rem; opacity: 0.6;">${u.role}</p>
                        </div>
                        <button onclick="N1.logout()" class="btn-p btn-p-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Sair</button>
                    ` : `
                        <button onclick="Router.navigate('login')" class="btn-p btn-p-primary">Área do Aluno</button>
                    `}
                    <button id="theme-toggle" class="glass" style="width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🌓</button>
                </div>
            </header>
        `;
    },

    Footer: () => `
        <footer style="padding: 4rem 5% 2rem; border-top: 1px solid var(--border-color); margin-top: auto;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; opacity: 0.7; font-size: 0.8rem;">
                <div>
                    ${UI.editable('footer_text', N1.data.company.name + ' - Plataforma de Estudos Premium')}
                    <p style="margin-top: 0.5rem;">Versão 2.1.0 | Auditoria Completa 2026</p>
                </div>
                <div style="display: flex; gap: 2rem;">
                    <span>Privacidade</span>
                    <span>Termos</span>
                    <span>Suporte</span>
                </div>
            </div>
        </footer>
    `,

    // PAGES
    Home: () => `
        ${Pages.Header()}
        <main style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 5%; text-align: center; background: radial-gradient(circle at top right, var(--color-primary-glow), transparent 40%);">
            <span class="glass" style="padding: 0.5rem 1.5rem; border-radius: 30px; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-primary); margin-bottom: 2rem;">${UI.editable('hero_badge', 'Exclusivo para Colaboradores')}</span>
            ${UI.editable('hero_title', 'A Nova Era da Gestão Corporativa', 'h1', 'hero-title')}
            <style>.hero-title h1 { font-size: 4rem; line-height: 1.1; margin-bottom: 1.5rem; max-width: 900px; }</style>
            <p style="font-size: 1.25rem; opacity: 0.7; max-width: 700px; margin-bottom: 3rem;">${UI.editable('hero_desc', 'Acesse o conteúdo estratégico da companhia e eleve seu patamar profissional com a trilha de alta performance.')}</p>
            <div style="display: flex; gap: 1.5rem;">
                <button onclick="Router.navigate('login')" class="btn-p btn-p-primary" style="padding: 1rem 3rem; font-size: 1.1rem;">${UI.editable('btn_cta_1', 'Começar Jornada')}</button>
                <button class="btn-p btn-p-secondary" style="padding: 1rem 2.5rem; font-size: 1.1rem;">${UI.editable('btn_cta_2', 'Saber Mais')}</button>
            </div>
        </main>
        ${Pages.Footer()}
    `,

    Login: () => `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-surface-elevated);">
            <div class="p-card animate-slide-in" style="width: 420px; padding: 3rem;">
                <img src="${N1.data.company.logo}" style="height: 50px; margin-bottom: 2rem;">
                <h2 style="margin-bottom: 0.5rem;">Acesso Restrito</h2>
                <p style="opacity: 0.6; font-size: 0.9rem; margin-bottom: 2.5rem;">Identifique-se para acessar seu ambiente.</p>
                
                <form onsubmit="event.preventDefault(); N1.login(this.email.value, this.password.value).then(() => Router.navigate('dashboard')).catch(e => alert(e.message))" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div>
                        <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; opacity: 0.8;">E-mail Corporativo</label>
                        <input type="email" name="email" class="glass" style="width: 100%; padding: 1rem; border-radius: 8px; color: var(--text-primary); font-size: 1rem;" required value="admin@n1.com">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; opacity: 0.8;">Senha de Acesso</label>
                        <input type="password" name="password" class="glass" style="width: 100%; padding: 1rem; border-radius: 8px; color: var(--text-primary); font-size: 1rem;" required value="admin">
                    </div>
                    <button type="submit" class="btn-p btn-p-primary" style="padding: 1.2rem; margin-top: 1rem;">Autenticar agora</button>
                    <button type="button" onclick="Router.navigate('home')" class="btn-p btn-p-secondary" style="font-size: 0.8rem;">Voltar ao portal</button>
                </form>
            </div>
        </div>
    `,

    Dashboard: () => {
        const u = N1.currentUser;
        if (!u) return Router.navigate('login');
        
        return `
            ${Pages.Header()}
            <main style="padding: 3rem 5%; flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <div>
                        <h2 style="font-size: 2.2rem;">Bem-vindo, ${u.name.split(' ')[0]}</h2>
                        <p style="opacity: 0.6;">Sua trilha de conhecimentos está te esperando.</p>
                    </div>
                    ${N1.canEdit() ? `<button onclick="Router.navigate('admin')" class="btn-p btn-p-secondary" style="gap: 0.8rem;">⚙️ Gestão Administrativa</button>` : ''}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
                    ${N1.data.modules.map(m => `
                        <div class="p-card" style="padding: 0; overflow: hidden; height: auto; cursor: pointer;" onclick="Router.navigate('module', {id: '${m.id}'})">
                            <div style="height: 180px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: center; font-size: 4rem;">${m.icon}</div>
                            <div style="padding: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                    <h3 style="flex: 1;">${m.title}</h3>
                                    <span class="glass" style="font-size: 0.6rem; padding: 2px 8px; border-radius: 10px; color: var(--color-primary);">${m.lessons.length} Aulas</span>
                                </div>
                                <p style="font-size: 0.85rem; opacity: 0.6; line-height: 1.5; margin-bottom: 1.5rem;">${m.desc}</p>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <button class="btn-p btn-p-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Estudar agora</button>
                                    <div style="font-size: 0.7rem; font-weight: 700; opacity: 0.4;">0% COMPLETO</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </main>
            ${Pages.Footer()}
            ${Pages.FloatingElements()}
        `;
    },

    Module: (id) => {
        const m = N1.data.modules.find(mod => mod.id === id);
        return `
            ${Pages.Header()}
            <main style="padding: 3rem 5%; flex: 1;">
                <button onclick="Router.navigate('dashboard')" style="background: none; border: none; color: var(--text-primary); opacity: 0.5; margin-bottom: 2rem; cursor: pointer;">← Voltar ao Dashboard</button>
                <div style="display: grid; grid-template-columns: 1fr 380px; gap: 3rem;">
                    <div>
                        <div class="p-card" style="padding: 3rem; background: var(--bg-surface-elevated); margin-bottom: 2.5rem; text-align: center;">
                            <div style="font-size: 5rem; margin-bottom: 1rem;">${m.icon}</div>
                            <h1 style="font-size: 3rem;">${m.title}</h1>
                            <p style="font-size: 1.1rem; opacity: 0.7; max-width: 600px; margin: 1rem auto;">${m.desc}</p>
                        </div>
                        <h3 style="margin-bottom: 1.5rem;">Ementa do Módulo</h3>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${m.lessons.map((l, i) => `
                                <div onclick="Router.navigate('lesson', {id: '${l.id}'})" class="p-card" style="padding: 1.25rem; display: flex; align-items: center; gap: 1.5rem; cursor: pointer;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">${i+1}</div>
                                    <div style="flex: 1;">
                                        <h4 style="margin-bottom: 0.2rem;">${l.title}</h4>
                                        <p style="font-size: 0.75rem; opacity: 0.5;">Vídeo aula • ${l.duration}</p>
                                    </div>
                                    <div style="color: var(--color-primary); font-size: 0.8rem; font-weight: 700;">▶ ASSISTIR</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="glass" style="padding: 2rem; border-radius: var(--radius-lg); align-self: start; position: sticky; top: 120px;">
                        <h4 style="margin-bottom: 1.5rem;">Progresso do Módulo</h4>
                        <div style="height: 10px; background: var(--bg-surface-elevated); border-radius: 5px; margin-bottom: 1rem; overflow: hidden;">
                            <div style="width: 0%; height: 100%; background: var(--color-primary);"></div>
                        </div>
                        <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 2rem;">Assista todas as aulas para liberar a prova final e obter o certificado de proficiência.</p>
                        <button class="btn-p btn-p-primary" style="width: 100%; justify-content: center; opacity: 0.4; cursor: not-allowed;">Continuar de onde parei</button>
                    </div>
                </div>
            </main>
            ${Pages.Footer()}
            ${Pages.FloatingElements()}
        `;
    },

    Lesson: (id) => {
        let lesson, mod;
        N1.data.modules.forEach(m => {
            const l = m.lessons.find(less => less.id === id);
            if (l) { lesson = l; mod = m; }
        });

        return `
            ${Pages.Header()}
            <main style="padding: 2rem 5%; flex: 1;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <button onclick="Router.navigate('module', {id: '${mod.id}'})" style="background: none; border: none; color: var(--text-primary); opacity: 0.5; margin-bottom: 1.5rem; cursor: pointer;">← Voltar ao Módulo</button>
                    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 2rem;">
                        <div>
                            <div class="p-card" style="padding: 0; aspect-ratio: 16/9; background: #000; overflow: hidden; margin-bottom: 2rem; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
                                <iframe width="100%" height="100%" src="${lesson.video}" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div style="flex: 1;">
                                    <h1 style="margin-bottom: 0.5rem;">${lesson.title}</h1>
                                    <p style="opacity: 0.6; line-height: 1.6;">${mod.title} • Aula Selecionada</p>
                                </div>
                                <div style="display: flex; gap: 1rem;">
                                    <button class="btn-p btn-p-secondary">Aula Anterior</button>
                                    <button class="btn-p btn-p-primary">Próxima Aula</button>
                                </div>
                            </div>
                        </div>
                        <div class="glass" style="padding: 1.5rem; border-radius: var(--radius-lg); align-self: start;">
                            <h4 style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem;">Estudo Dirigido</h4>
                            <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                                <div style="display: flex; align-items: start; gap: 0.8rem;">
                                    <input type="checkbox" style="width: 20px; height: 20px; margin-top: 3px;">
                                    <div>
                                        <p style="font-size: 0.9rem; font-weight: 600;">Marcar como concluída</p>
                                        <p style="font-size: 0.7rem; opacity: 0.5;">Sinaliza progresso no portal.</p>
                                    </div>
                                </div>
                                <hr style="border: none; border-top: 1px solid var(--border-color);">
                                <button class="btn-p btn-p-secondary" style="width: 100%; border-color: var(--color-primary-glow); color: var(--color-primary);" onclick="alert('Iniciando Download do Material...')">📥 Material de Apoio PDF</button>
                                <button class="btn-p btn-p-secondary" style="width: 100%;" onclick="alert('Abrindo Resumo Estruturado...')">📝 Resumo da Aula</button>
                            </div>
                            <div style="margin-top: 2.5rem; padding: 1rem; background: var(--color-primary-glow); border-radius: 8px; border-left: 4px solid var(--color-primary);">
                                <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">Prova do Módulo</p>
                                <p style="font-size: 0.7rem; margin: 0.5rem 0 1rem; opacity: 0.8;">Disponível após conclusão de todas as aulas do módulo.</p>
                                <button class="btn-p btn-p-primary" style="width: 100%; font-size: 0.8rem;" disabled>Fazer Prova AGORA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ${Pages.Footer()}
            ${Pages.FloatingElements()}
        `;
    },

    Admin: () => {
        const u = N1.currentUser;
        if (u?.role !== 'Admin') return Router.navigate('dashboard');
        
        return `
            ${Pages.Header()}
            <main style="display: grid; grid-template-columns: 280px 1fr; min-height: calc(100vh - 80px);">
                <aside class="glass" style="padding: 2.5rem; border-right: 1px solid var(--border-color);">
                    <h5 style="text-transform: uppercase; font-size: 0.7rem; opacity: 0.5; margin-bottom: 1.5rem; letter-spacing: 1px;">Gestão Estratégica</h5>
                    <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <button class="btn-p btn-p-primary" style="width: 100%; justify-content: start; background: var(--color-primary-glow); color: var(--color-primary);">🏢 Identidade Empresa</button>
                        <button class="btn-p btn-p-secondary" style="width: 100%; justify-content: start; border: none;">👥 Usuários & Perfis</button>
                        <button class="btn-p btn-p-secondary" style="width: 100%; justify-content: start; border: none;">📚 Módulos & Conteúdo</button>
                        <button class="btn-p btn-p-secondary" style="width: 100%; justify-content: start; border: none;">📑 Relatórios de Provas</button>
                        <button class="btn-p btn-p-secondary" style="width: 100%; justify-content: start; border: none;">💬 Fluxos de Chat</button>
                    </nav>
                </aside>

                <div style="padding: 3rem 5%;">
                    <h2 style="margin-bottom: 2.5rem;">Configurações Multiempresa</h2>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                        <div class="p-card" style="padding: 2rem;">
                            <h4 style="margin-bottom: 1.5rem;">Visual & Branding</h4>
                            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                                <div>
                                    <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">Cor Primária do Sistema</label>
                                    <div style="display: flex; gap: 1rem;">
                                        <input type="color" onchange="N1.data.company.primaryColor.h = 220; N1.save(); Router.renderCurrent();" style="width: 50px; height: 50px; border: none; background: none; cursor: pointer;">
                                        <p style="font-size: 0.8rem; opacity: 0.6;">A cor primária afeta botões, glows, gráficos e indicadores de progresso.</p>
                                    </div>
                                </div>
                                <hr style="border: none; border-top: 1px solid var(--border-color);">
                                <div>
                                    <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">URL do Logotipo</label>
                                    <input type="text" class="glass" style="width: 100%; padding: 0.75rem; color: var(--text-primary);" value="${N1.data.company.logo}">
                                </div>
                            </div>
                        </div>

                        <div class="p-card" style="padding: 2rem;">
                            <h4 style="margin-bottom: 1.5rem;">Regras & Permissões</h4>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>Gerentes podem editar textos</span>
                                    <input type="checkbox" ${N1.data.company.settings.allowManagerEdit ? 'checked' : ''} onchange="N1.data.company.settings.allowManagerEdit = this.checked; N1.save();">
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>Obrigatório assistir vídeo p/ prova</span>
                                    <input type="checkbox" checked>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>Exportação p/ Sheets Ativa</span>
                                    <input type="checkbox" checked>
                                </div>
                            </div>
                        </div>

                        <div class="p-card" style="grid-column: span 2; padding: 2.5rem;">
                            <h4 style="margin-bottom: 1.5rem;">Usuários do Sistema</h4>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="text-align: left; opacity: 0.5; font-size: 0.75rem; border-bottom: 1px solid var(--border-color);">
                                    <th style="padding: 1rem;">COLABORADOR</th>
                                    <th style="padding: 1rem;">E-MAIL</th>
                                    <th style="padding: 1rem;">CARGO</th>
                                    <th style="padding: 1rem;">AÇÕES</th>
                                </tr>
                                ${N1.data.users.map(u => `
                                    <tr style="border-bottom: 1px solid var(--border-color);">
                                        <td style="padding: 1rem; font-weight: 600;">${u.name}</td>
                                        <td style="padding: 1rem; opacity: 0.7;">${u.email}</td>
                                        <td style="padding: 1rem;"><span class="glass" style="padding: 3px 10px; border-radius: 20px; font-size: 0.65rem; color: var(--color-primary);">${u.role}</span></td>
                                        <td style="padding: 1rem;"><button class="btn-p btn-p-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">Editar Permissões</button></td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            ${Pages.Footer()}
        `;
    },

    // GLOBAL ELEMENTS
    FloatingElements: () => `
        <div id="floating-chat-container">
            <div id="chat-bubble" class="floating-bubble">💬</div>
            <div id="chat-popup" class="chat-popup animate-slide-in">
                <div style="background: var(--color-primary); color: white; padding: 1.5rem;">
                    <h3>Conexão N1</h3>
                    <p style="font-size: 0.8rem; opacity: 0.8;">Selecione o canal de atendimento</p>
                </div>
                <div class="chat-channel-item" onclick="UI_INTERACTIONS.openChatChannel('Supervisor Direto')">
                    <p style="font-weight: 700;">1 – Falar com Supervisor</p>
                    <p style="font-size: 0.7rem; opacity: 0.5;">Dúvidas operacionais e rotina.</p>
                </div>
                <div class="chat-channel-item" onclick="UI_INTERACTIONS.openChatChannel('Grupo da Equipe')">
                    <p style="font-weight: 700;">2 – Falar com Grupo da Equipe</p>
                    <p style="font-size: 0.7rem; opacity: 0.5;">Comunicação interna e avisos.</p>
                </div>
                <div class="chat-channel-item" onclick="UI_INTERACTIONS.openChatChannel('Suporte Técnico')">
                    <p style="font-weight: 700;">3 – Falar com Suporte</p>
                    <p style="font-size: 0.7rem; opacity: 0.5;">Problemas técnicos e acessos.</p>
                </div>
            </div>
        </div>

        <div id="floating-help-container">
            <div id="help-bubble" class="floating-bubble">?</div>
            <div id="help-popup" class="chat-popup animate-slide-in" style="bottom: 175px;">
                <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <h4>Guia Rápido N1</h4>
                    <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 0.5rem;">Aprenda a utilizar a plataforma para máxima performance.</p>
                </div>
                <div style="padding: 1.5rem;">
                    <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.85rem;">
                        <p>✅ <b>Módulos:</b> Organize seu tempo por temas.</p>
                        <p>✅ <b>Progresso:</b> Sempre marque o checklist após concluir uma aula.</p>
                        <p>✅ <b>Provas:</b> Realize as provas para obter certificação.</p>
                    </div>
                    <button class="btn-p btn-p-primary" style="width: 100%; margin-top: 1.5rem; font-size: 0.8rem;" onclick="alert('Gerando Resumo Executivo...')">Ver Resumo do Programa</button>
                </div>
            </div>
        </div>
    `
};

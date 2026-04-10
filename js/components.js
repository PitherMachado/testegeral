const Components = {
    // Wrapper for any text that can be edited by authorized users
    Editable: (tag, key, defaultContent, className = "") => {
        const db = DB.get();
        const content = db.customTexts[key] || defaultContent;
        const canEdit = Auth.canEdit();
        
        return `
            <div class="editable-container ${canEdit ? 'can-edit' : ''} ${className}" data-key="${key}">
                <${tag}>${content}</${tag}>
                ${canEdit ? `<span class="edit-pencil" title="Editar" onclick="Components.handleEdit('${key}', \`${content}\`)">✏️</span>` : ''}
            </div>
        `;
    },

    handleEdit: (key, currentContent) => {
        const newValue = prompt(`Editar conteúdo:`, currentContent);
        if (newValue !== null) {
            const data = DB.get();
            data.customTexts[key] = newValue;
            DB.save(data);
        }
    },

    Header: (user) => {
        const company = DB.get().company;
        return `
            <header class="glass" style="padding: 1rem 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
                <div onclick="Router.navigate('home')" style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
                    <img src="${company.logo}" style="height: 40px; border-radius: 8px;" alt="Logo"/>
                    <div>
                        ${Components.Editable('h3', 'header_name', company.name)}
                        <p style="font-size: 0.7rem; opacity: 0.7;">${Components.Editable('header_slogan', company.slogan)}</p>
                    </div>
                </div>
                <nav style="display: flex; gap: 1.5rem; align-items: center;">
                    ${user ? `
                        <div style="text-align: right;">
                            <p style="font-size: 0.8rem; font-weight: 700;">${user.name}</p>
                            <span style="font-size: 0.65rem; opacity: 0.6;">${user.role}</span>
                        </div>
                        <button onclick="Auth.logout()" class="glass" style="padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem;">Sair</button>
                    ` : `
                        <button onclick="Router.navigate('login')" class="btn-primary" style="padding: 0.5rem 1.5rem;">Entrar</button>
                    `}
                    <button id="theme-toggle" class="glass" style="width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🌓</button>
                </nav>
            </header>
        `;
    },

    Footer: () => {
        const company = DB.get().company;
        return `
            <footer class="glass" style="margin-top: auto; padding: 2.5rem 5%; text-align: center;">
                <p style="opacity: 0.6; font-size: 0.9rem;">&copy; 2026 ${Components.Editable('footer_name', company.name)} - Todos os direitos reservados.</p>
                <div style="margin-top: 1rem; font-size: 0.75rem; opacity: 0.5;">
                    ${Components.Editable('footer_badge', 'Sistema N1 - BV2 Edition')}
                </div>
            </footer>
        `;
    },

    ProgressBar: (percent) => `
        <div style="width: 100%; height: 6px; background: var(--p-surface-2); border-radius: 10px; margin: 10px 0; overflow: hidden;">
            <div style="width: ${percent}%; height: 100%; background: var(--p-primary); transition: width 0.5s ease;"></div>
        </div>
    `,

    FloatingChat: (user) => {
        if (!user) return '';
        return `
            <div id="floating-chat" class="floating-chat-container">
                <button id="chat-bubble" class="glow" style="width: 60px; height: 60px; border-radius: 50%; background: var(--p-primary); color: white; border: none; font-size: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.3); z-index: 10001; cursor: grab; display: flex; align-items: center; justify-content: center;">
                    💬
                </button>
                <div id="chat-options" class="glass premium-card animate-slide-in" style="display: none; position: absolute; bottom: 75px; right: 0; width: 300px; padding: 0; overflow: hidden; border-radius: 16px;">
                    <div style="background: var(--p-primary); color: white; padding: 1.2rem;">
                        <h4 style="margin: 0;">Canais de Comunicação</h4>
                    </div>
                    <div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                        <button onclick="Router.navigate('chat', 'sup')" class="glass" style="padding: 12px; border-radius: 8px; text-align: left; width: 100%; font-size: 0.9rem; font-weight: 600;">1 – Falar com Supervisor</button>
                        <button onclick="Router.navigate('chat', 'group')" class="glass" style="padding: 12px; border-radius: 8px; text-align: left; width: 100%; font-size: 0.9rem; font-weight: 600;">2 – Falar com Grupo da Equipe</button>
                        <button onclick="Router.navigate('chat', 'support')" class="glass" style="padding: 12px; border-radius: 8px; text-align: left; width: 100%; font-size: 0.9rem; font-weight: 600;">3 – Falar com Suporte</button>
                    </div>
                </div>
            </div>
        `;
    },

    FloatingHelp: (user) => {
        if (!user) return '';
        return `
            <div id="floating-help" class="floating-help-container">
                <button id="help-bubble" class="glass" style="width: 50px; height: 50px; border-radius: 50%; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; border: 1px solid var(--p-border); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    ?
                </button>
                <div id="help-content" class="glass premium-card animate-slide-in" style="display: none; position: absolute; bottom: 65px; right: 0; width: 320px; padding: 2rem; border-radius: 20px;">
                    <h4 style="border-bottom: 2px solid var(--p-primary); padding-bottom: 0.5rem; margin-bottom: 1rem;">Guia Rápido N1</h4>
                    <p style="font-size: 0.85rem; opacity: 0.8; line-height: 1.6;">
                        • <b>Módulos:</b> Organize seu tempo por temas estratégicos.<br>
                        • <b>Checklist:</b> Sempre marque ao concluir para liberar a prova.<br>
                        • <b>Provas:</b> Certifique seus conhecimentos em 1 clique.
                    </p>
                    <hr style="border: 0; border-top: 1px solid var(--p-border); margin: 1.5rem 0;">
                    <button class="btn-primary" style="width: 100%; font-size: 0.8rem;" onclick="alert('Gerando Resumo Executivo...')">Ver Resumo do Programa</button>
                </div>
            </div>
        `;
    }
};

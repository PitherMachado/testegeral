const Components = {
    // Wrapper for any text that can be edited by admins
    EditableText: (tag, key, defaultContent, role) => {
        const canEdit = (role === 'Admin' || role === 'Manager');
        const content = DB.get().company[key] || defaultContent;
        
        return `
            <div class="editable-container ${canEdit ? 'can-edit' : ''}" data-key="${key}">
                <${tag}>${content}</${tag}>
                ${canEdit ? `<span class="edit-pencil" title="Editar texto" onclick="Components.handleEdit('${key}', '${content}')">✏️</span>` : ''}
            </div>
        `;
    },

    handleEdit: (key, currentContent) => {
        const newValue = prompt(`Editar conteúdo:`, currentContent);
        if (newValue !== null) {
            const data = DB.get();
            data.company[key] = newValue;
            DB.save(data);
        }
    },

    Header: (user) => {
        const company = DB.get().company;
        return `
            <header class="glass" style="padding: 1rem 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${company.logo}" style="height: 40px; border-radius: 8px;" alt="Logo"/>
                    <div>
                        ${Components.EditableText('h3', 'name', company.name, user?.role)}
                        <p style="font-size: 0.8rem; opacity: 0.7;">${company.slogan}</p>
                    </div>
                </div>
                <nav style="display: flex; gap: 2rem; align-items: center;">
                    ${user ? `
                        <span style="font-weight: 500;">Olá, ${user.name}</span>
                        <button onclick="Auth.logout()" class="glass" style="padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem;">Sair</button>
                    ` : `
                        <button onclick="Router.navigate('login')" class="btn-primary">Entrar</button>
                    `}
                    <button id="theme-toggle" class="glass" style="padding: 0.5rem; border-radius: 50%;" title="Trocar Tema">🌓</button>
                </nav>
            </header>
        `;
    },

    Footer: () => {
        const company = DB.get().company;
        return `
            <footer class="glass" style="margin-top: auto; padding: 2rem 5%; text-align: center;">
                <p style="opacity: 0.6;">&copy; 2026 ${company.name} - Todos os direitos reservados.</p>
                <div style="margin-top: 1rem; font-size: 0.8rem;">
                    Identidade Premium | V.2.0.0
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
                <button id="chat-bubble" class="glow" style="width: 60px; height: 60px; border-radius: 50%; background: var(--p-primary); color: white; border: none; font-size: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.3); z-index: 10001; cursor: grab;">
                    💬
                </button>
                <div id="chat-options" class="glass premium-card" style="display: none; position: absolute; bottom: 70px; right: 0; width: 280px; padding: 1rem; animation: fadeIn 0.3s forwards;">
                    <h4 style="margin-bottom: 1rem; border-bottom: 1px solid var(--p-border); padding-bottom: 0.5rem;">Canais de Comunicação</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <button class="glass" style="padding: 10px; border-radius: 8px; text-align: left; width: 100%;">1 – Falar com Supervisor</button>
                        <button class="glass" style="padding: 10px; border-radius: 8px; text-align: left; width: 100%;">2 – Falar com Grupo da Equipe</button>
                        <button class="glass" style="padding: 10px; border-radius: 8px; text-align: left; width: 100%;">3 – Falar com Suporte</button>
                    </div>
                </div>
            </div>
        `;
    },

    FloatingHelp: (user) => {
        if (!user) return '';
        return `
            <div id="floating-help" class="floating-help-container">
                <button id="help-bubble" class="glass" style="width: 50px; height: 50px; border-radius: 50%; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; border: 1px solid var(--p-border);">
                    ?
                </button>
                <div id="help-content" class="glass premium-card" style="display: none; position: absolute; bottom: 60px; right: 0; width: 300px; padding: 1.5rem; animation: fadeIn 0.3s forwards;">
                    <h4>Guia Rápido de Estudo</h4>
                    <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 0.5rem;">
                        1. Assista aos vídeos completos.<br>
                        2. Marque o checklist de cada aula.<br>
                        3. Realize a prova final para liberar o certificado.
                    </p>
                    <hr style="border: 0; border-top: 1px solid var(--p-border); margin: 1rem 0;">
                    <button class="btn-primary" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">Ver Resumo do Programa</button>
                </div>
            </div>
        `;
    }
};

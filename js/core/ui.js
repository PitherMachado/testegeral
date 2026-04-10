const UI = {
    // Premium Modal/Panel for editing
    openEditor: (key, currentLabel, initialValue) => {
        const panel = document.getElementById('edit-panel');
        panel.innerHTML = `
            <div style="padding: 2rem;">
                <h3 style="margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">Editar Conteúdo</h3>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Etiqueta: ${currentLabel}</p>
                <textarea id="edit-field" class="glass" style="width: 100%; height: 200px; padding: 1rem; color: var(--text-primary); border-radius: 8px; margin-bottom: 2rem;">${initialValue}</textarea>
                <div style="display: flex; gap: 1rem;">
                    <button onclick="UI.saveEdit('${key}')" class="btn-p btn-p-primary" style="flex: 1;">Salvar Alteração</button>
                    <button onclick="UI.closeEditor()" class="btn-p btn-p-secondary">Cancelar</button>
                </div>
            </div>
        `;
        panel.classList.add('open');
    },

    saveEdit: (key) => {
        const value = document.getElementById('edit-field').value;
        N1.updateText(key, value);
        UI.closeEditor();
        Router.renderCurrent(); // Reload view
    },

    closeEditor: () => {
        document.getElementById('edit-panel').classList.remove('open');
    },

    // Editable text wrapper
    editable: (key, text, tag = 'span', className = '') => {
        const content = N1.getText(key, text);
        if (!N1.canEdit()) return `<${tag} class="${className}">${content}</${tag}>`;
        
        return `
            <div class="editable-wrapper ${className}">
                <${tag}>${content}</${tag}>
                <div class="pencil-btn" onclick="UI.openEditor('${key}', '${key}', \`${content}\`)">✏️</div>
            </div>
        `;
    },

    // Dynamic contrast calculator
    applyThemeParams: () => {
        const c = N1.data.company;
        const root = document.documentElement;
        root.style.setProperty('--h', c.primaryColor.h);
        root.style.setProperty('--s', c.primaryColor.s + '%');
        root.style.setProperty('--l', c.primaryColor.l + '%');
        
        document.body.setAttribute('data-theme', c.theme);
        
        // Auto-contrast for primary buttons
        const textOnPrimary = c.primaryColor.l > 65 ? '#000000' : '#ffffff';
        root.style.setProperty('--text-on-primary', textOnPrimary);
    }
};

const Router = {
    current: 'home',
    params: {},

    init: () => {
        window.addEventListener('hashchange', () => {
            Router.current = window.location.hash.slice(1) || 'home';
            Router.renderCurrent();
        });
        Router.current = window.location.hash.slice(1) || 'home';
    },

    navigate: (route, params = {}) => {
        Router.current = route;
        Router.params = params;
        window.location.hash = route;
        Router.renderCurrent();
    },

    renderCurrent: () => {
        const app = document.getElementById('app');
        UI.applyThemeParams();
        
        // Role Protection
        if (Router.current === 'admin' && N1.currentUser?.role !== 'Admin') {
            Router.current = 'dashboard';
        }

        switch(Router.current) {
            case 'home': app.innerHTML = Pages.Home(); break;
            case 'login': app.innerHTML = Pages.Login(); break;
            case 'dashboard': app.innerHTML = Pages.Dashboard(); break;
            case 'module': app.innerHTML = Pages.Module(Router.params.id); break;
            case 'lesson': app.innerHTML = Pages.Lesson(Router.params.id); break;
            case 'admin': app.innerHTML = Pages.Admin(); break;
            default: app.innerHTML = Pages.Home();
        }
        
        window.scrollTo(0,0);
        UI_INTERACTIONS.init();
    }
};

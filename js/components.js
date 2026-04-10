const Components = {
  canEdit(role) {
    const db = DB.get();
    return role === 'Admin' || (role === 'Manager' && db.permissions.managerCanEdit);
  },

  EditableText(tag, key, fallback, role, extra = '') {
    const db = DB.get();
    const content = db.company[key] || fallback;
    const canEdit = Components.canEdit(role);
    return `
      <div class="editable-container ${canEdit ? 'can-edit' : ''}" data-key="${key}">
        <${tag} ${extra}>${content}</${tag}>
        ${canEdit ? `<span class="edit-pencil always-visible" title="Editar" onclick="Components.handleEdit('${key}', ${JSON.stringify(content)})">✏️</span>` : ''}
      </div>
    `;
  },

  EditableButton(labelKey, fallback, role, onclick, klass = 'btn-secondary') {
    const db = DB.get();
    const label = db.company[labelKey] || fallback;
    const canEdit = Components.canEdit(role);
    return `
      <span class="editable-container ${canEdit ? 'can-edit' : ''}">
        <button onclick="${onclick}" class="${klass}">${label}</button>
        ${canEdit ? `<span class="edit-pencil always-visible" title="Editar botão" onclick="event.stopPropagation(); Components.handleEdit('${labelKey}', ${JSON.stringify(label)})">✏️</span>` : ''}
      </span>
    `;
  },

  handleEdit(key, currentContent) {
    const value = prompt('Editar conteúdo:', currentContent ?? '');
    if (value === null) return;
    const data = DB.get();
    data.company[key] = value;
    DB.save(data);
  },

  Header(user) {
    const company = DB.get().company;
    return `
      <header class="header-shell glass">
        <div class="brand-link" onclick="Router.navigate('home')" title="Ir para o início">
          <img src="${company.logo}" alt="Logo">
          <div class="brand-meta">
            ${Components.EditableText('h3', 'name', company.name, user?.role)}
            ${Components.EditableText('p', 'slogan', company.slogan, user?.role)}
          </div>
        </div>
        <nav class="nav-actions">
          ${user ? `<span>Olá, ${user.name}</span><button onclick="Auth.logout()" class="btn-pill">Sair</button>` : `<button onclick="Router.navigate('login')" class="btn-primary">Entrar</button>`}
          <button id="theme-toggle" class="btn-pill" title="Trocar tema">🌓</button>
        </nav>
      </header>
    `;
  },

  Footer() {
    const company = DB.get().company;
    return `
      <footer class="footer-shell glass">
        <p style="color: var(--p-text-soft);">&copy; 2026 ${company.name} - Todos os direitos reservados.</p>
        <div style="margin-top:.75rem; font-size:.85rem; color: var(--p-text-muted);">${company.footer_text || 'Identidade Premium | V.2.1.0'}</div>
      </footer>
    `;
  },

  ProgressBar(percent) {
    return `
      <div style="width:100%; height:8px; background: var(--p-surface-3); border-radius:999px; overflow:hidden; border:1px solid var(--p-border);">
        <div style="width:${percent}%; height:100%; background: var(--p-primary);"></div>
      </div>
    `;
  },

  FloatingChat(user) {
    if (!user) return '';
    return `
      <div id="floating-chat" class="floating-chat-container">
        <button id="chat-bubble" class="glow" style="width:60px;height:60px;border-radius:50%;background:var(--p-primary);color:var(--p-text-on-primary);font-size:1.5rem;cursor:grab;">💬</button>
        <div id="chat-options" class="floating-panel premium-card glass">
          <h4 style="margin-bottom:1rem;">Canais de Comunicação</h4>
          <button onclick="Router.navigate('chat','supervisor')" class="btn-secondary chat-action">1 – Falar com Supervisor</button>
          <button onclick="Router.navigate('chat','equipe')" class="btn-secondary chat-action">2 – Falar com Grupo da Equipe</button>
          <button onclick="Router.navigate('chat','suporte')" class="btn-secondary chat-action">3 – Falar com Suporte</button>
        </div>
      </div>
    `;
  },

  FloatingHelp(user) {
    if (!user) return '';
    return `
      <div id="floating-help" class="floating-help-container">
        <button id="help-bubble" class="btn-pill" style="width:50px;height:50px;border-radius:50%;font-size:1.2rem;">?</button>
        <div id="help-content" class="floating-panel premium-card glass">
          <h4>Guia Rápido de Estudo</h4>
          <p style="font-size:.9rem; color: var(--p-text-soft); margin-top:.6rem;">1. Assista aos vídeos completos.<br>2. Marque o checklist.<br>3. Realize a prova quando liberada.</p>
          <hr style="border:0;border-top:1px solid var(--p-border); margin: 1rem 0;">
          <button onclick="Router.navigate('summary')" class="btn-primary" style="width:100%;">Ver Resumo do Programa</button>
        </div>
      </div>
    `;
  }
};

const Pages = {
  Home() {
    const user = Auth.getUser();
    const db = DB.get();
    return `
      ${Components.Header(user)}
      <main class="page-wrap">
        <section class="hero premium-card fade-in">
          <div class="hero-content">
            <span class="badge">Exclusividade & Performance</span>
            ${Components.EditableText('h1', 'home_title', 'Alcance o Próximo Nível de Gestão', user?.role, 'style="font-size:clamp(2rem,4vw,3.7rem); color:white;"')}
            ${Components.EditableText('p', 'home_subtitle', 'Uma plataforma desenvolvida para líderes que não aceitam o comum. Estude, evolua e conquiste resultados extraordinários.', user?.role, 'style="font-size:1.15rem; color:rgba(255,255,255,.88); margin:1.5rem 0 2rem; line-height:1.6;"')}
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
              <button onclick="Router.navigate('${user ? 'dashboard' : 'login'}')" class="btn-primary">Começar Agora</button>
              <button onclick="Router.navigate('summary')" class="btn-secondary">Saber Mais</button>
            </div>
          </div>
        </section>
      </main>
      ${Components.Footer()}
    `;
  },

  Login() {
    return `
      <div class="page-wrap" style="min-height:100vh; display:flex; align-items:center; justify-content:center;">
        <div class="premium-card fade-in" style="width:min(420px,100%);">
          <h2 style="margin-bottom:.5rem;">Bem-vindo</h2>
          <p style="color:var(--p-text-muted); margin-bottom:2rem;">Acesse sua área exclusiva de aprendizado.</p>
          <form onsubmit="event.preventDefault(); Auth.login(this.email.value, this.password.value)" class="stack">
            <div class="stack" style="gap:.45rem;">
              <label>E-mail</label>
              <input type="email" name="email" required value="admin@n1.com">
            </div>
            <div class="stack" style="gap:.45rem;">
              <label>Senha</label>
              <input type="password" name="password" required value="admin">
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Entrar na Plataforma</button>
            <small style="color:var(--p-text-muted); text-align:center;">Admin: admin@n1.com / admin · Gerente: gerente@n1.com / 123 · Aluno: aluno@n1.com / 123</small>
          </form>
        </div>
      </div>
    `;
  },

  Dashboard() {
    const user = Auth.getUser();
    if (!user) { Router.navigate('login'); return ''; }
    const db = DB.get();
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:1rem; margin-bottom:2rem; flex-wrap:wrap;">
          <div>
            <h2 style="font-size:2rem;">Seu Progresso</h2>
            <p style="color:var(--p-text-muted);">Você concluiu 15% da jornada total.</p>
          </div>
          <div style="display:flex; gap:.75rem; flex-wrap:wrap;">
            ${(user.role === 'Admin' || user.role === 'Manager') ? `<button onclick="Router.navigate('users')" class="btn-secondary">Usuários</button><button onclick="Router.navigate('settings')" class="btn-secondary">Configurações</button><button onclick="Router.navigate('admin')" class="btn-primary">Área Administrativa</button>` : ''}
          </div>
        </div>
        <div class="grid-auto">
          ${db.modules.map(mod => `
            <div class="premium-card fade-in" style="padding:0; cursor:pointer;" onclick="Router.navigate('module', ${mod.id})">
              <div class="module-cover" style="background-image:url('${mod.image}')"></div>
              <div style="padding:1.5rem;">
                <span style="font-size:.72rem; font-weight:800; color:var(--p-primary); text-transform:uppercase;">Módulo ${mod.id}</span>
                <h3 style="margin:.5rem 0;">${mod.title}</h3>
                <p style="font-size:.92rem; color:var(--p-text-muted); min-height:44px;">${mod.description}</p>
                ${Components.ProgressBar(mod.progress)}
                <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-top:1rem;">
                  <span style="font-size:.85rem; font-weight:700; color:${mod.status === 'available' ? 'var(--p-primary)' : 'var(--p-text-muted)'};">${mod.status === 'available' ? 'Disponível' : 'Bloqueado'}</span>
                  <button onclick="event.stopPropagation(); Router.navigate('module', ${mod.id})" class="btn-secondary">Acessar</button>
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

  Module(id) {
    const user = Auth.getUser();
    if (!user) { Router.navigate('login'); return ''; }
    const mod = DB.get().modules.find(m => String(m.id) === String(id));
    if (!mod) { Router.navigate('dashboard'); return ''; }
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <button onclick="Router.navigate('dashboard')" class="action-link" style="margin-bottom:1.2rem;">← Voltar ao Catálogo</button>
        <div style="display:grid; grid-template-columns:1fr 360px; gap:2rem;">
          <div>
            <div class="premium-card" style="padding:0; height:300px; background:url('${mod.image}') center/cover; position:relative; margin-bottom:1.5rem;">
              <div style="position:absolute; inset:auto 0 0 0; padding:2rem; background:linear-gradient(transparent, rgba(0,0,0,.8));"><h1 style="color:#fff; font-size:2.4rem;">${mod.title}</h1></div>
            </div>
            <h3 style="margin-bottom:.8rem;">Sobre este módulo</h3>
            <p style="line-height:1.7; color:var(--p-text-muted);">${mod.description}</p>
          </div>
          <div class="premium-card stack">
            <h4>Lista de Aulas</h4>
            ${mod.lessons.length ? mod.lessons.map(less => `
              <div onclick="Router.navigate('lesson', ${less.id})" class="glass" style="padding:1rem; border-radius:12px; display:flex; gap:1rem; align-items:center; cursor:pointer;">
                <span style="width:30px; height:30px; border-radius:50%; background:var(--p-surface-3); display:grid; place-items:center;">▶</span>
                <div style="flex:1;">
                  <p style="font-weight:700;">${less.title}</p>
                  <small style="color:var(--p-text-muted);">${less.duration}</small>
                </div>
                ${less.completed ? '✅' : ''}
              </div>
            `).join('') : `<p style="color:var(--p-text-muted);">Nenhuma aula cadastrada neste módulo.</p>`}
            <button onclick="Router.navigate('lesson', ${mod.lessons[0]?.id || ''})" class="btn-primary" style="width:100%;">Continuar de onde parei</button>
          </div>
        </div>
      </div>
      ${Components.FloatingChat(user)}
      ${Components.Footer()}
    `;
  },

  Lesson(id) {
    const user = Auth.getUser();
    if (!user) { Router.navigate('login'); return ''; }
    const db = DB.get();
    let lesson = null, parentMod = null, lessonIndex = -1;
    db.modules.forEach(mod => {
      const idx = mod.lessons.findIndex(l => String(l.id) === String(id));
      if (idx >= 0) { lesson = mod.lessons[idx]; parentMod = mod; lessonIndex = idx; }
    });
    if (!lesson || !parentMod) { Router.navigate('dashboard'); return ''; }
    const prev = parentMod.lessons[lessonIndex - 1];
    const next = parentMod.lessons[lessonIndex + 1];
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:grid; grid-template-columns:1fr 360px; gap:2rem;">
          <div>
            <div class="premium-card" style="padding:0; aspect-ratio:16/9; background:#000; display:flex; align-items:center; justify-content:center; overflow:hidden;">
              <iframe width="100%" height="100%" src="${lesson.video}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div style="margin-top:1.5rem;">
              <h2>${lesson.title}</h2>
              <p style="margin-top:1rem; color:var(--p-text-muted); line-height:1.7;">Nesta aula vamos aprofundar os conceitos fundamentais do módulo. Assista até o final para avançar com segurança e liberar a próxima etapa.</p>
            </div>
          </div>
          <div class="premium-card stack">
            <h4>Status da Aula</h4>
            <div class="premium-card" style="background:var(--p-surface-2); padding:1rem;">
              <label style="display:flex; align-items:center; gap:.75rem; font-weight:600;"><input type="checkbox" ${lesson.completed ? 'checked' : ''} onchange="Pages.toggleLessonComplete(${parentMod.id}, ${lesson.id}, this.checked)"> Concluí esta aula</label>
            </div>
            <button onclick="Pages.downloadMaterial(${parentMod.id})" class="btn-secondary" style="justify-content:flex-start;">📥 Download Material PDF</button>
            <button onclick="Router.navigate('summary')" class="btn-secondary" style="justify-content:flex-start;">📝 Resumo da Aula</button>
            ${parentMod.quiz ? `
              <div class="premium-card" style="background:var(--p-surface-2); padding:1rem;">
                <p style="font-size:.82rem; font-weight:800; margin-bottom:.5rem; color:var(--p-primary);">PRÓXIMO PASSO</p>
                <button onclick="alert('Fluxo de prova iniciado.')" class="btn-primary" style="width:100%;">Realizar Prova do Módulo</button>
              </div>
            ` : ''}
            <div style="display:flex; gap:.75rem;">
              <button ${prev ? `onclick="Router.navigate('lesson', ${prev.id})"` : 'disabled'} class="btn-secondary" style="flex:1; opacity:${prev ? 1 : .5};">Aula Anterior</button>
              <button ${next ? `onclick="Router.navigate('lesson', ${next.id})"` : 'disabled'} class="btn-secondary" style="flex:1; opacity:${next ? 1 : .5};">Próxima Aula</button>
            </div>
          </div>
        </div>
      </div>
      ${Components.FloatingChat(user)}
      ${Components.Footer()}
    `;
  },

  Chat(channel = 'supervisor') {
    const user = Auth.getUser();
    if (!user) { Router.navigate('login'); return ''; }
    const db = DB.get();
    const labels = { supervisor: 'Supervisor', equipe: 'Grupo da Equipe', suporte: 'Suporte' };
    const current = db.chats[channel] || [];
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-end; flex-wrap:wrap; margin-bottom:1.5rem;">
          <div>
            <h2>Chat hierárquico</h2>
            <p style="color:var(--p-text-muted);">Acesso rápido a Supervisor, Grupo da Equipe e Suporte.</p>
          </div>
          <button onclick="Router.navigate('dashboard')" class="btn-secondary">Voltar ao dashboard</button>
        </div>
        <section class="chat-layout">
          <aside class="chat-sidebar">
            <div class="chat-list-item ${channel === 'supervisor' ? 'active' : ''}" onclick="Router.navigate('chat', 'supervisor')"><strong>Supervisor</strong><p style="color:var(--p-text-muted); margin-top:.25rem;">Canal direto</p></div>
            <div class="chat-list-item ${channel === 'equipe' ? 'active' : ''}" onclick="Router.navigate('chat', 'equipe')"><strong>Grupo da Equipe</strong><p style="color:var(--p-text-muted); margin-top:.25rem;">Canal coletivo</p></div>
            <div class="chat-list-item ${channel === 'suporte' ? 'active' : ''}" onclick="Router.navigate('chat', 'suporte')"><strong>Suporte</strong><p style="color:var(--p-text-muted); margin-top:.25rem;">Ajuda institucional</p></div>
          </aside>
          <div class="chat-main">
            <div style="padding:1rem; border-bottom:1px solid var(--p-border);"><h3>${labels[channel]}</h3></div>
            <div class="message-list">
              ${current.map(msg => `<div class="message ${msg.direction}"><strong style="display:block; margin-bottom:.35rem; font-size:.82rem; color:var(--p-primary);">${msg.sender}</strong>${msg.text}</div>`).join('')}
            </div>
            <form class="message-form" onsubmit="event.preventDefault(); Pages.sendChatMessage('${channel}', this.message.value); this.reset();">
              <input name="message" type="text" placeholder="Digite sua mensagem...">
              <button class="btn-primary" type="submit">Enviar</button>
            </form>
          </div>
        </section>
      </div>
      ${Components.Footer()}
    `;
  },

  Settings() {
    const user = Auth.getUser();
    if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) { Router.navigate('dashboard'); return ''; }
    const db = DB.get();
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-end; flex-wrap:wrap; margin-bottom:1.5rem;">
          <div>
            <h2>Configurações globais</h2>
            <p style="color:var(--p-text-muted);">Nome, slogan, paleta e permissões de edição.</p>
          </div>
          <button onclick="Pages.saveSettings()" class="btn-primary">Salvar alterações</button>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
          <div class="premium-card stack">
            <div>
              <label>Nome da empresa</label>
              <input id="settings-name" type="text" value="${db.company.name}">
            </div>
            <div>
              <label>Slogan</label>
              <input id="settings-slogan" type="text" value="${db.company.slogan}">
            </div>
            <div>
              <label>Logo (URL)</label>
              <input id="settings-logo" type="text" value="${db.company.logo}">
            </div>
          </div>
          <div class="premium-card stack">
            <div>
              <label>Cor principal (H)</label>
              <input id="settings-h" type="text" value="${db.company.primaryColor.h}">
            </div>
            <div>
              <label>Cor principal (S)</label>
              <input id="settings-s" type="text" value="${db.company.primaryColor.s}">
            </div>
            <div>
              <label>Cor principal (L)</label>
              <input id="settings-l" type="text" value="${db.company.primaryColor.l}">
            </div>
            <label style="display:flex; align-items:center; gap:.75rem;"><input id="settings-manager-edit" type="checkbox" ${db.permissions.managerCanEdit ? 'checked' : ''}> Gerente pode editar</label>
          </div>
        </div>
      </div>
      ${Components.Footer()}
    `;
  },

  Users() {
    const user = Auth.getUser();
    if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) { Router.navigate('dashboard'); return ''; }
    const db = DB.get();
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-end; flex-wrap:wrap; margin-bottom:1.5rem;">
          <div>
            <h2>Usuários e logins</h2>
            <p style="color:var(--p-text-muted);">Gestão básica de perfis, acessos e cargos.</p>
          </div>
          <button onclick="Pages.addUser()" class="btn-primary">Novo usuário</button>
        </div>
        <div class="premium-card">
          <table class="table-like">
            <thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Cargo</th><th>Ação</th></tr></thead>
            <tbody>
              ${db.users.map(u => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td><button onclick="Pages.editUser(${u.id})" class="btn-secondary">Editar</button></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ${Components.Footer()}
    `;
  },

  Summary() {
    const user = Auth.getUser();
    const modules = DB.get().modules;
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <h2>Resumo do Programa</h2>
        <p style="color:var(--p-text-muted); margin:.75rem 0 1.5rem;">Visão rápida dos módulos e da etapa atual.</p>
        <div class="grid-auto">
          ${modules.map(m => `<div class="premium-card"><h3>${m.title}</h3><p style="margin:.8rem 0; color:var(--p-text-muted);">${m.description}</p><div style="display:flex; justify-content:space-between; gap:1rem;"><span>${m.lessons.length} aulas</span><span>${m.progress}%</span></div></div>`).join('')}
        </div>
      </div>
      ${Components.Footer()}
    `;
  },

  Admin() {
    const user = Auth.getUser();
    if (user?.role !== 'Admin') { Router.navigate('dashboard'); return ''; }
    const db = DB.get();
    return `
      ${Components.Header(user)}
      <div class="page-wrap">
        <div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-end; flex-wrap:wrap; margin-bottom:1.5rem;">
          <div>
            <h2>Área Administrativa</h2>
            <p style="color:var(--p-text-muted);">Controle global de identidade, permissões e usuários.</p>
          </div>
          <div style="display:flex; gap:.75rem; flex-wrap:wrap;">
            <button onclick="Router.navigate('users')" class="btn-secondary">Usuários</button>
            <button onclick="Router.navigate('settings')" class="btn-secondary">Configurações</button>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem;">
          <div class="premium-card stack">
            <h3>Identidade Visual</h3>
            <p style="color:var(--p-text-muted);">Paleta principal configurada em HSL para troca rápida multiempresa.</p>
            <button onclick="Router.navigate('settings')" class="btn-primary">Abrir configurações</button>
          </div>
          <div class="premium-card stack">
            <h3>Permissões</h3>
            <label style="display:flex; align-items:center; gap:.75rem;"><input type="checkbox" ${db.permissions.managerCanEdit ? 'checked' : ''} onchange="Pages.toggleManagerPermission(this.checked)"> Gerentes podem editar</label>
          </div>
        </div>
      </div>
      ${Components.Footer()}
    `;
  },

  toggleLessonComplete(moduleId, lessonId, checked) {
    const db = DB.get();
    const mod = db.modules.find(m => m.id === moduleId);
    if (!mod) return;
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    lesson.completed = checked;
    mod.progress = Math.round((mod.lessons.filter(l => l.completed).length / Math.max(mod.lessons.length, 1)) * 100);
    DB.save(db);
  },

  downloadMaterial(moduleId) {
    alert(`Download do material do módulo ${moduleId} preparado.`);
  },

  sendChatMessage(channel, text) {
    const value = (text || '').trim();
    if (!value) return;
    const db = DB.get();
    db.chats[channel] = db.chats[channel] || [];
    db.chats[channel].push({ sender: 'Você', direction: 'out', text: value });
    DB.save(db);
    Router.navigate('chat', channel);
  },

  saveSettings() {
    const db = DB.get();
    db.company.name = document.getElementById('settings-name').value.trim() || db.company.name;
    db.company.slogan = document.getElementById('settings-slogan').value.trim() || db.company.slogan;
    db.company.logo = document.getElementById('settings-logo').value.trim() || db.company.logo;
    db.company.primaryColor = {
      h: Number(document.getElementById('settings-h').value || db.company.primaryColor.h),
      s: Number(document.getElementById('settings-s').value || db.company.primaryColor.s),
      l: Number(document.getElementById('settings-l').value || db.company.primaryColor.l)
    };
    db.permissions.managerCanEdit = document.getElementById('settings-manager-edit').checked;
    DB.save(db);
    Theme.applyColors(db.company.primaryColor);
    alert('Configurações salvas.');
  },

  addUser() {
    const db = DB.get();
    const id = Math.max(...db.users.map(u => u.id)) + 1;
    db.users.push({ id, name: `Novo Usuário ${id}`, email: `usuario${id}@empresa.com`, password: '123', role: 'Operator' });
    DB.save(db);
    Router.navigate('users');
  },

  editUser(id) {
    const db = DB.get();
    const user = db.users.find(u => u.id === id);
    if (!user) return;
    const name = prompt('Editar nome do usuário:', user.name);
    if (name === null) return;
    user.name = name;
    DB.save(db);
  },

  toggleManagerPermission(checked) {
    const db = DB.get();
    db.permissions.managerCanEdit = checked;
    DB.save(db);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Router.init();
  window.addEventListener('db-updated', () => {
    Theme.applyColors(DB.get().company.primaryColor);
    Router.handleRoute();
  });
});

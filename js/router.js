const Router = {
  routes: {
    home: () => Pages.Home(),
    login: () => Pages.Login(),
    dashboard: () => Pages.Dashboard(),
    module: id => Pages.Module(id),
    lesson: id => Pages.Lesson(id),
    admin: () => Pages.Admin(),
    chat: channel => Pages.Chat(channel),
    settings: () => Pages.Settings(),
    users: () => Pages.Users(),
    summary: () => Pages.Summary()
  },

  navigate(path, id = null) {
    window.location.hash = id ? `${path}/${id}` : path;
  },

  init() {
    window.addEventListener('hashchange', Router.handleRoute);
    Router.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [path, id] = hash.split('/');
    const route = Router.routes[path];
    const app = document.getElementById('app');
    if (!route) {
      app.innerHTML = '<div class="page-wrap"><h1>404</h1></div>';
      return;
    }
    app.innerHTML = route(id);
    Router.afterRender(path, id);
  },

  afterRender(path, id) {
    window.scrollTo(0, 0);
    Router.setupFloatingPanels();
    Router.setupDraggableBubble();
  },

  setupFloatingPanels() {
    const chatBubble = document.getElementById('chat-bubble');
    const chatOptions = document.getElementById('chat-options');
    const helpBubble = document.getElementById('help-bubble');
    const helpContent = document.getElementById('help-content');

    if (chatBubble && chatOptions) {
      chatBubble.onclick = (e) => {
        if (chatBubble.dataset.dragged === '1') { chatBubble.dataset.dragged = '0'; return; }
        e.stopPropagation();
        chatOptions.classList.toggle('open');
        if (helpContent) helpContent.classList.remove('open');
      };
    }

    if (helpBubble && helpContent) {
      helpBubble.onclick = (e) => {
        e.stopPropagation();
        helpContent.classList.toggle('open');
        if (chatOptions) chatOptions.classList.remove('open');
      };
    }

    document.addEventListener('click', (e) => {
      if (chatOptions && !e.target.closest('#floating-chat')) chatOptions.classList.remove('open');
      if (helpContent && !e.target.closest('#floating-help')) helpContent.classList.remove('open');
    }, { once: true });
  },

  setupDraggableBubble() {
    const bubble = document.getElementById('chat-bubble');
    const container = document.getElementById('floating-chat');
    if (!bubble || !container) return;

    let dragging = false;
    let moved = false;
    let startX = 0, startY = 0, originX = 0, originY = 0;

    bubble.onpointerdown = (e) => {
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      const rect = container.getBoundingClientRect();
      originX = rect.left;
      originY = rect.top;
      bubble.setPointerCapture(e.pointerId);
    };

    bubble.onpointermove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
      if (!moved) return;
      container.style.left = `${Math.max(8, originX + dx)}px`;
      container.style.top = `${Math.max(8, originY + dy)}px`;
      container.style.right = 'auto';
      container.style.bottom = 'auto';
      bubble.dataset.dragged = '1';
    };

    bubble.onpointerup = () => {
      dragging = false;
      setTimeout(() => bubble.dataset.dragged = '0', 120);
    };
  }
};

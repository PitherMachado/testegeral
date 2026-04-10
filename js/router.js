const Router = {
    routes: {
        'home': () => Pages.Home(),
        'login': () => Pages.Login(),
        'dashboard': () => Pages.Dashboard(),
        'module': (id) => Pages.Module(id),
        'lesson': (id) => Pages.Lesson(id),
        'admin': () => Pages.Admin(),
    },

    navigate: (path, id = null) => {
        window.location.hash = id ? `${path}/${id}` : path;
    },

    init: () => {
        window.addEventListener('hashchange', Router.handleRoute);
        Router.handleRoute();
    },

    handleRoute: () => {
        const hash = window.location.hash.slice(1) || 'home';
        const [path, id] = hash.split('/');
        const route = Router.routes[path];
        
        const app = document.getElementById('app');
        if (route) {
            app.innerHTML = route(id);
            Router.afterRender(path);
        } else {
            app.innerHTML = '<h1>404 - Not Found</h1>';
        }
    },

    afterRender: (path) => {
        window.scrollTo(0,0);
        
        // Setup Chat Interactions
        const chatBubble = document.getElementById('chat-bubble');
        if (chatBubble) {
            chatBubble.onclick = () => {
                const opt = document.getElementById('chat-options');
                opt.style.display = opt.style.display === 'none' ? 'block' : 'none';
            };
            
            // Simple Draggable implementation
            let isDragging = false;
            chatBubble.onmousedown = (e) => { isDragging = false; };
            chatBubble.onmousemove = (e) => { isDragging = true; };
            chatBubble.onmouseup = (e) => {
                if (!isDragging) return;
                const container = document.getElementById('floating-chat');
                container.style.right = 'auto';
                container.style.bottom = 'auto';
                container.style.left = (e.clientX - 30) + 'px';
                container.style.top = (e.clientY - 30) + 'px';
            };
        }

        const helpBubble = document.getElementById('help-bubble');
        if (helpBubble) {
            helpBubble.onclick = () => {
                const opt = document.getElementById('help-content');
                opt.style.display = opt.style.display === 'none' ? 'block' : 'none';
            };
        }
    }
};

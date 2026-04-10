const Router = {
    routes: {
        'home': () => Pages.Home(),
        'login': () => Pages.Login(),
        'dashboard': () => Pages.Dashboard(),
        'module': (id) => Pages.Module(id),
        'lesson': (id) => Pages.Lesson(id),
        'chat': (channelId) => Pages.Chat(channelId),
        'configuracoes': () => Pages.Configuracoes(),
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
        
        // Protection
        const user = Auth.getUser();
        if (['dashboard', 'module', 'lesson', 'chat', 'configuracoes', 'admin'].includes(path) && !user) {
            return Router.navigate('login');
        }

        const route = Router.routes[path];
        const app = document.getElementById('app');
        if (route) {
            app.innerHTML = route(id);
            Router.afterRender(path);
        } else {
            Router.navigate('home');
        }
    },

    afterRender: (path) => {
        window.scrollTo(0,0);
        
        // Chat Logic
        const chatBubble = document.getElementById('chat-bubble');
        if (chatBubble) {
            let isDragging = false;
            let startPos = { x: 0, y: 0 };

            chatBubble.onmousedown = (e) => {
                isDragging = false;
                startPos = { x: e.clientX, y: e.clientY };
            };

            chatBubble.onmousemove = (e) => {
                const diffX = Math.abs(e.clientX - startPos.x);
                const diffY = Math.abs(e.clientY - startPos.y);
                if (diffX > 5 || diffY > 5) isDragging = true;
                
                if (e.buttons === 1 && isDragging) {
                    const container = document.getElementById('floating-chat');
                    container.style.right = 'auto';
                    container.style.bottom = 'auto';
                    container.style.left = (e.clientX - 30) + 'px';
                    container.style.top = (e.clientY - 30) + 'px';
                }
            };

            chatBubble.onclick = () => {
                if (isDragging) return;
                const opt = document.getElementById('chat-options');
                opt.style.display = opt.style.display === 'none' ? 'block' : 'none';
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

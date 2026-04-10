/**
 * Handling all non-page specific interactions (Chat, Help, Drag)
 */

const UI_INTERACTIONS = {
    init: () => {
        UI_INTERACTIONS.setupChat();
        UI_INTERACTIONS.setupHelp();
        UI_INTERACTIONS.setupThemeToggle();
    },

    setupChat: () => {
        const bubble = document.getElementById('chat-bubble');
        const popup = document.getElementById('chat-popup');
        if (!bubble) return;

        let isDragging = false;
        let startPos = { x: 0, y: 0 };

        bubble.addEventListener('mousedown', (e) => {
            isDragging = false;
            startPos = { x: e.clientX, y: e.clientY };
        });

        bubble.addEventListener('mousemove', (e) => {
            if (Math.abs(e.clientX - startPos.x) > 5 || Math.abs(e.clientY - startPos.y) > 5) {
                isDragging = true;
                // Simple drag logic
                const parent = bubble.parentElement;
                parent.style.right = 'auto';
                parent.style.bottom = 'auto';
                parent.style.left = (e.clientX - 30) + 'px';
                parent.style.top = (e.clientY - 30) + 'px';
            }
        });

        bubble.addEventListener('click', () => {
            if (!isDragging) {
                popup.classList.toggle('open');
            }
        });
    },

    setupHelp: () => {
        const bubble = document.getElementById('help-bubble');
        const popup = document.getElementById('help-popup');
        if (bubble) {
            bubble.onclick = () => popup.classList.toggle('open');
        }
    },

    setupThemeToggle: () => {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.onclick = () => {
                N1.data.company.theme = N1.data.company.theme === 'dark' ? 'light' : 'dark';
                N1.save();
                Router.renderCurrent();
            };
        }
    },

    openChatChannel: (name) => {
        alert(`Iniciando conexão segura com: ${name}...`);
        document.getElementById('chat-popup').classList.remove('open');
    }
};

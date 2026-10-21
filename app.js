// 1. Application State
let chatHistory = JSON.parse(localStorage.getItem('neuralChat_history')) || [
    { role: 'ai', text: 'System initialized. Ready to process queries.' }
];

// 2. DOM Elements
const appRoot = document.getElementById('app-root');

// 3. Application Views (Components)
const views = {
    chat: () => `
        <div class="chat-container" id="chat-display">
            ${chatHistory.map(msg => `
                <div class="message ${msg.role}">${msg.text}</div>
            `).join('')}
        </div>
        <div class="input-area">
            <form id="chat-form">
                <input type="text" id="prompt-input" placeholder="Enter your prompt here..." required autocomplete="off">
                <button type="submit">Send</button>
            </form>
        </div>
    `,
    settings: () => `
        <div class="settings-container">
            <h1>Model Configuration</h1>
            <div class="settings-group">
                <label for="api-key">API Key</label>
                <input type="text" id="api-key" placeholder="Enter API Key">
            </div>
            <div class="settings-group">
                <label for="model-select">Active Model</label>
                <input type="text" id="model-select" value="gemini-1.5-pro" readonly>
            </div>
            <button onclick="alert('Configuration Saved!')">Save Settings</button>
        </div>
    `,
    notFound: () => `<div style="padding: 3rem;"><h1>404 - Interface Not Found</h1></div>`
};

// 4. View Controllers & Event Binders
function bindChatEvents() {
    const chatForm = document.getElementById('chat-form');
    if (!chatForm) return;

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('prompt-input');
        const text = input.value.trim();
        
        if (text) {
            // Add user message to state
            chatHistory.push({ role: 'user', text });
            
            // Mock AI Response
            chatHistory.push({ role: 'ai', text: 'Processing parameters... [Mock API Response]' });
            
            // Save & Re-render
            localStorage.setItem('neuralChat_history', JSON.stringify(chatHistory));
            router();
        }
    });
}

// 5. Client-Side Router
function router() {
    const path = window.location.hash || '#/chat';
    const viewName = path.replace('#/', '');
    
    // Inject corresponding HTML
    appRoot.innerHTML = views[viewName] ? views[viewName]() : views.notFound();
    
    // Bind events after HTML is injected
    if (viewName === 'chat') {
        bindChatEvents();
        // Auto-scroll to bottom of chat
        const display = document.getElementById('chat-display');
        display.scrollTop = display.scrollHeight;
    }
}

// 6. Initialization
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
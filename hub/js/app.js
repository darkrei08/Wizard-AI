// Utility globale per prevenire XSS
window.escapeHtml = function(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

const AppState = {
    user: null, // { name: 'Ema', handle: '@darkrei08' }
    telemetryEnabled: false
};

const Routes = {
    home: `
        <div class="hero-section">
            <h1>Il tuo ecosistema AI locale</h1>
            <p>Un hub centralizzato per installare, usare e monetizzare AI skill senza inviare dati al cloud.</p>
            <div class="flex gap-4" style="justify-content: center;">
                <button class="btn btn-primary" onclick="app.navigate('installer')"><span class="icon">🚀</span> Installa Wizard-AI</button>
                <button class="btn btn-secondary" onclick="app.navigate('chat')"><span class="icon">💬</span> Chatta con l'Assistente</button>
            </div>
        </div>
        <div class="stats-grid" id="home-stats-grid">
            <div class="card stat-card animate-fade-in delay-1">
                <span class="icon">🗜️</span>
                <div class="value" id="stat-active-skills">...</div>
                <div class="label">Skill Attive</div>
            </div>
            <div class="card stat-card animate-fade-in delay-2">
                <span class="icon">🌐</span>
                <div class="value" id="stat-graphs">4</div>
                <div class="label">Grafi di Conoscenza</div>
            </div>
            <div class="card stat-card animate-fade-in delay-3">
                <span class="icon">⚡</span>
                <div class="value" id="stat-tokens-saved">...</div>
                <div class="label">Token Risparmiati</div>
            </div>
        </div>
    `,
    installer: `
        <div class="mb-8">
            <h2>📦 Installazione Guidata</h2>
            <p class="text-secondary">Configura Wizard-AI sul tuo sistema con un click.</p>
        </div>
        <div class="installer-steps" id="installer-steps-container">
            <!-- Injected by installer.js -->
        </div>
    `,
    chat: `
        <div class="mb-4">
            <h2>💬 Chat AI Locale</h2>
            <p class="text-secondary">Assistente basato su LiteLLM. Nessun dato esce dalla tua macchina.</p>
        </div>
        <div class="chat-container">
            <div class="chat-messages" id="chat-messages">
                <div class="message ai">
                    Ciao! Sono l'assistente Wizard-AI. Posso aiutarti a usare le skill, scrivere comandi o spiegarti come pubblicare la tua skill nel marketplace per guadagnare royalties.
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Chiedimi come usare ai-compress..." onkeypress="if(event.key === 'Enter') window.chat.sendMessage()">
                <button class="btn btn-primary" onclick="window.chat.sendMessage()">Invia</button>
            </div>
        </div>
    `,
    marketplace: `
        <div class="flex justify-between items-center mb-8">
            <div>
                <h2>🏪 Skill Marketplace</h2>
                <p class="text-secondary">Esplora skill e tool creati dalla community.</p>
            </div>
            <div id="marketplace-tabs-container"></div>
            <div class="flex gap-4 items-center">
                <input type="text" class="form-control" placeholder="Cerca skill..." style="width: 200px;">
                <button class="btn btn-outline">Filtri</button>
            </div>
        </div>
        <div class="marketplace-grid" id="marketplace-grid">
            <!-- Injected by marketplace.js -->
        </div>
    `,
    dashboard: `
        <div class="mb-8">
            <h2>📊 Dashboard</h2>
            <p class="text-secondary">Monitora i tuoi guadagni e i consumi delle tue AI.</p>
        </div>
        
        <div class="card mb-8">
            <h3 class="mb-4">🔌 Cockpit Tools Status</h3>
            <div id="cockpit-status-container" style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
                <p class="text-muted">Caricamento stato AI Provider...</p>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <h3 class="text-muted mb-2">Totale Guadagnato</h3>
                <div style="font-size: 2rem; font-weight: 700;">€ 247.80</div>
            </div>
            <div class="card">
                <h3 class="text-muted mb-2">Questo Mese</h3>
                <div style="font-size: 2rem; font-weight: 700; color: var(--success);">+ € 38.20</div>
            </div>
            <div class="card">
                <h3 class="text-muted mb-2">Prossimo Payout</h3>
                <div style="font-size: 2rem; font-weight: 700;">€ 52.00</div>
                <div class="text-muted" style="font-size: 0.8rem;">via Stripe Connect il 01/07</div>
            </div>
        </div>
        
        <div class="chart-container">
            <canvas id="revenueChart"></canvas>
        </div>
        
        <div class="card mb-8">
            <h3 class="mb-4">🧩 Le Mie Skill</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Utilizzi (Mese)</th>
                            <th>Revenue (Mese)</th>
                            <th>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>🌐 graphify</td>
                            <td>12,340</td>
                            <td>€ 156.20</td>
                            <td><span class="badge badge-success">Attiva</span></td>
                        </tr>
                        <tr>
                            <td>🔍 flashrank</td>
                            <td>5,890</td>
                            <td>€ 72.40</td>
                            <td><span class="badge badge-success">Attiva</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};

const app = {
    init() {
        this.contentEl = document.getElementById('app-content');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.sidebar = document.querySelector('.sidebar');
        this.mobileToggle = document.getElementById('mobile-nav-toggle');
        
        this.setupNavigation();
        window.auth.init();
        
        // Mobile toggle event
        if (this.mobileToggle && this.sidebar) {
            this.mobileToggle.addEventListener('click', () => {
                this.sidebar.classList.toggle('open');
            });
        }
        
        // Initial route
        this.navigate('home');
    },
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.dataset.route;
                this.navigate(route);
                
                // Close sidebar on mobile after click
                if (window.innerWidth <= 768 && this.sidebar) {
                    this.sidebar.classList.remove('open');
                }
            });
        });
    },
    
    navigate(route) {
        // Prevent XSS/Route injection by checking against whitelist
        if (!Routes.hasOwnProperty(route)) return;
        
        // Check auth for dashboard
        if (route === 'dashboard' && !AppState.user) {
            window.auth.login();
            return;
        }
        
        // Update Active Nav
        this.navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[data-route="${route}"]`);
        if(activeLink) activeLink.classList.add('active');
        
        // Render Content
        this.contentEl.innerHTML = Routes[route];
        
        // Route specific inits
        if (route === 'home') this.loadHomeStats();
        if (route === 'installer') window.installer.init();
        if (route === 'marketplace') window.marketplace.init();
        if (route === 'dashboard') window.dashboard.init();
        if (route === 'chat') {
             setTimeout(() => document.getElementById('chat-input').focus(), 100);
        }
    },
    
    async loadHomeStats() {
        try {
            const res = await fetch('/api/stats');
            const stats = await res.json();
            if (!stats.error) {
                const elSkills = document.getElementById('stat-active-skills');
                const elTokens = document.getElementById('stat-tokens-saved');
                if (elSkills) elSkills.textContent = stats.active_skills;
                if (elTokens) elTokens.textContent = (stats.total_tokens_saved / 1000).toFixed(1) + 'k';
            }
        } catch (e) {
            console.error("Failed to load home stats", e);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());

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
    user: null,
    telemetryEnabled: false,
    tokensSaved: 68420,
    compressionRatio: 78
};

const Routes = {
    home: `
        <div class="hero-section animate-fade-in">
            <span class="badge badge-neon mb-4">Ottimizzazione Contesto & Loop Engine v0.49.0</span>
            <h1>Il tuo Ecosistema AI Locale e Ultra-Leggero</h1>
            <p>Un hub centralizzato per installare skill, gestire i 5 Loop architetturali e ridurre i costi API del 60-90% tramite RTK (Rust Token Killer).</p>
            <div class="flex gap-4 mb-8" style="justify-content: center;">
                <button class="btn btn-primary btn-glow" onclick="app.navigate('rtk-monitor')"><span class="icon">🗜️</span> Apri RTK Monitor</button>
                <button class="btn btn-secondary" onclick="app.navigate('cli-sim')"><span class="icon">💻</span> Simula Comandi CLI</button>
                <button class="btn btn-outline" onclick="app.navigate('installer')"><span class="icon">📦</span> Installa Tool</button>
            </div>
        </div>

        <div class="stats-grid animate-slide-up delay-1" id="home-stats-grid">
            <div class="card stat-card" onclick="app.navigate('rtk-monitor')" style="cursor: pointer;">
                <span class="icon">🗜️</span>
                <div class="value text-accent" id="stat-tokens-saved">68.4k</div>
                <div class="label">Token Risparmiati (RTK)</div>
            </div>
            <div class="card stat-card" onclick="app.navigate('marketplace')" style="cursor: pointer;">
                <span class="icon">⚡</span>
                <div class="value" style="color: #10b981;">193</div>
                <div class="label">AI Skills Integrate</div>
            </div>
            <div class="card stat-card">
                <span class="icon">🔄</span>
                <div class="value" style="color: #a855f7;">5 / 5</div>
                <div class="label">Loop Architetturali Attivi</div>
            </div>
            <div class="card stat-card">
                <span class="icon">🛡️</span>
                <div class="value" style="color: #06b6d4;">100%</div>
                <div class="label">Air-Gapped & Privacy</div>
            </div>
        </div>

        <div class="card animate-slide-up delay-2 mt-6">
            <div class="card-header">
                <h3>🧩 Architettura a 5-Fasi del Context Optimizer</h3>
                <span class="badge badge-success">Live Stack</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; text-align: center;">
                <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 0.75rem; border: 1px solid var(--glass-border);">
                    <div style="color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.25rem;">1. Ingestion</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">markitdown (ai-convert)</div>
                </div>
                <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 0.75rem; border: 1px solid var(--glass-border);">
                    <div style="color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.25rem;">2. Re-ranking</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">flashrank (ai-rerank)</div>
                </div>
                <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 0.75rem; border: 1px solid var(--glass-border);">
                    <div style="color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.25rem;">3. Compression</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">llmlingua / headroom</div>
                </div>
                <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 0.75rem; border: 1px solid var(--glass-border);">
                    <div style="color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.25rem;">4. Guarding</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">lean-ctx / caveman</div>
                </div>
                <div style="padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 0.75rem; border: 1px solid rgba(99, 102, 241, 0.4);">
                    <div style="color: #818cf8; font-weight: 800; margin-bottom: 0.25rem;">5. CLI Output</div>
                    <div style="font-size: 0.8rem; color: #e2e8f0;">RTK (Rust Token Killer)</div>
                </div>
            </div>
        </div>
    `,
    'rtk-monitor': `
        <div class="mb-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div>
                    <h2>🗜️ RTK & Context Optimization Dashboard</h2>
                    <p class="text-secondary">Monitora in tempo reale le performance di compressione dei comandi shell e dei payload.</p>
                </div>
                <div>
                    <span class="badge badge-neon">Rust Token Killer v0.31</span>
                </div>
            </div>
        </div>

        <div class="stats-grid mb-8 animate-slide-up delay-1">
            <div class="card stat-card">
                <span class="icon">📊</span>
                <div class="value text-accent" id="rtk-total-saved">68,420</div>
                <div class="label">Token Complessivi Risparmiati</div>
            </div>
            <div class="card stat-card">
                <span class="icon">⚡</span>
                <div class="value text-success" id="rtk-avg-ratio">78.4%</div>
                <div class="label">Tasso di Compressione Medio</div>
            </div>
            <div class="card stat-card">
                <span class="icon">⏱️</span>
                <div class="value" style="color: #38bdf8;">8.4 ms</div>
                <div class="label">Latenza Binario Rust (< 10ms)</div>
            </div>
            <div class="card stat-card">
                <span class="icon">💰</span>
                <div class="value text-warning" id="rtk-cost-saved">€ 14.28</div>
                <div class="label">Risparmio Costi API Stimatì</div>
            </div>
        </div>

        <div class="card mb-8 animate-slide-up delay-2">
            <div class="card-header">
                <h3>🧪 Simulatore di Ottimizzazione Contesto dal Vivo</h3>
                <span class="badge badge-primary">Test Interattivo</span>
            </div>
            <p class="text-secondary mb-4">Seleziona un'azione per simulare il passaggio dell'output grezzo attraverso i proxy di compressione del sistema:</p>
            
            <div class="flex gap-4 mb-6 flex-wrap">
                <button class="btn btn-primary" onclick="app.simulateRTKWrap()"><span class="icon">⚡</span> Simula: ai-rtk wrap git status</button>
                <button class="btn btn-secondary" onclick="app.simulateSqueeze()"><span class="icon">🗜️</span> Simula: ai-squeeze JSON Log</button>
                <button class="btn btn-outline" onclick="app.simulateHeadroom()"><span class="icon">🌐</span> Simula: ai-headroom proxy</button>
            </div>

            <div class="terminal-box" id="rtk-terminal-output">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <span class="terminal-dot red"></span>
                        <span class="terminal-dot yellow"></span>
                        <span class="terminal-dot green"></span>
                    </div>
                    <span>rtk-engine@wizard-ai:~$</span>
                    <span>Ready</span>
                </div>
                <div id="rtk-terminal-content" style="white-space: pre-wrap; font-family: var(--font-mono);">Premi un pulsante qui sopra per eseguire un test di compressione immediato sul contesto.</div>
            </div>
        </div>

        <div class="card animate-slide-up delay-3">
            <div class="card-header">
                <h3>📈 Ripartizione Risparmio per Tool</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div>
                    <div class="flex justify-between mb-2">
                        <span style="font-weight: 600;">Phase 5: RTK (Rust Token Killer)</span>
                        <span class="text-success font-mono">82% riduzione (44,100 token)</span>
                    </div>
                    <div class="progress"><div class="progress-bar" style="width: 82%;"></div></div>
                </div>
                <div>
                    <div class="flex justify-between mb-2">
                        <span style="font-weight: 600;">Phase 3: ai-headroom (Proxy & Compression)</span>
                        <span class="text-success font-mono">75% riduzione (14,320 token)</span>
                    </div>
                    <div class="progress"><div class="progress-bar" style="width: 75%;"></div></div>
                </div>
                <div>
                    <div class="flex justify-between mb-2">
                        <span style="font-weight: 600;">Phase 4: ai-lean (Lean Context Intelligence)</span>
                        <span class="text-success font-mono">68% riduzione (10,000 token)</span>
                    </div>
                    <div class="progress"><div class="progress-bar" style="width: 68%;"></div></div>
                </div>
            </div>
        </div>
    `,
    'cli-sim': `
        <div class="mb-6 animate-fade-in">
            <h2>💻 Wizard-AI Interactive CLI Simulator</h2>
            <p class="text-secondary">Esegui i comandi del Definitive Autonomous Engine direttamente dal tuo browser.</p>
        </div>

        <div class="card mb-6 animate-slide-up delay-1">
            <div class="terminal-box" style="height: 380px; display: flex; flex-direction: column;">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <span class="terminal-dot red"></span>
                        <span class="terminal-dot yellow"></span>
                        <span class="terminal-dot green"></span>
                    </div>
                    <span>wizard-ai-cli@v0.49.0:~$</span>
                    <span>TTY: pts/0</span>
                </div>
                <div id="cli-sim-output" style="flex-grow: 1; overflow-y: auto; padding-bottom: 1rem; white-space: pre-wrap; font-family: var(--font-mono); font-size: 0.85rem;"><span style="color: #6366f1; font-weight: 700;">🧙 Wizard-AI CLI Shell v0.49.0</span>
Digita un comando o clicca sui suggerimenti qui sotto. Prova: <span style="color: #22d3ee;">ai-optimize status</span> oppure <span style="color: #22d3ee;">ai-rtk info</span>

</div>
                <div style="display: flex; align-items: center; gap: 0.5rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.75rem;">
                    <span style="color: #10b981; font-weight: 700;">➜</span>
                    <span style="color: #38bdf8;">~</span>
                    <input type="text" id="cli-sim-input" class="form-control" placeholder="ai-optimize status..." style="background: transparent; border: none; padding: 0.25rem; font-family: var(--font-mono); color: #fff;" onkeypress="if(event.key === 'Enter') app.runSimCommand(this.value)">
                    <button class="btn btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="app.runSimCommand(document.getElementById('cli-sim-input').value)">Esegui</button>
                </div>
            </div>
        </div>

        <div class="card animate-slide-up delay-2">
            <h4 class="mb-4 text-secondary">💡 Comandi Rapidi Consigliati:</h4>
            <div class="flex gap-4 flex-wrap">
                <button class="btn btn-secondary" onclick="app.runSimCommand('ai-optimize status')">ai-optimize status</button>
                <button class="btn btn-secondary" onclick="app.runSimCommand('ai-rtk info')">ai-rtk info</button>
                <button class="btn btn-secondary" onclick="app.runSimCommand('ai-headroom info')">ai-headroom info</button>
                <button class="btn btn-secondary" onclick="app.runSimCommand('ai-lean help')">ai-lean help</button>
                <button class="btn btn-secondary" onclick="app.runSimCommand('ai-loop-sentinel --prompt test')">ai-loop-sentinel test</button>
            </div>
        </div>
    `,
    installer: `
        <div class="mb-8 animate-fade-in">
            <h2>📦 Installazione Guidata</h2>
            <p class="text-secondary">Configura Wizard-AI e i tool nativi (RTK, Headroom, SQZ) con un click.</p>
        </div>
        <div class="installer-steps animate-slide-up delay-1" id="installer-steps-container">
            <!-- Injected by installer.js -->
        </div>
    `,
    chat: `
        <div class="mb-4 animate-fade-in">
            <h2>💬 Chat AI Locale Air-Gapped</h2>
            <p class="text-secondary">Assistente basato su LiteLLM. Nessun dato esce dalla tua macchina.</p>
        </div>
        <div class="chat-container animate-slide-up delay-1">
            <div class="chat-messages" id="chat-messages">
                <div class="message ai">
                    Ciao! Sono l'assistente Wizard-AI ottimizzato. Posso spiegarti come funziona la compressione RTK, guidarti nei 5 Loop architetturali o aiutarti a pacchettizzare le tue skill per il marketplace.
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Chiedimi come funziona la pipeline di compressione..." onkeypress="if(event.key === 'Enter') window.chat.sendMessage()">
                <button class="btn btn-primary" onclick="window.chat.sendMessage()">Invia</button>
            </div>
        </div>
    `,
    marketplace: `
        <div class="flex justify-between items-center mb-8 animate-fade-in">
            <div>
                <h2>🏪 Skill Marketplace & Integrations</h2>
                <p class="text-secondary">Esplora le 193 skill e i tool creati dalla community per l'agente.</p>
            </div>
            <div id="marketplace-tabs-container"></div>
            <div class="flex gap-4 items-center">
                <input type="text" class="form-control" placeholder="Cerca skill..." style="width: 220px;">
                <button class="btn btn-outline">Filtri</button>
            </div>
        </div>
        <div class="marketplace-grid animate-slide-up delay-1" id="marketplace-grid">
            <!-- Injected by marketplace.js -->
        </div>
    `,
    dashboard: `
        <div class="mb-8 animate-fade-in">
            <h2>📊 Dashboard Operativa</h2>
            <p class="text-secondary">Monitora i tuoi guadagni dal Marketplace e i consumi delle tue AI.</p>
        </div>
        
        <div class="card mb-8 animate-slide-up delay-1">
            <h3 class="mb-4">🔌 Cockpit Tools & Provider Status</h3>
            <div id="cockpit-status-container" style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
                <p class="text-muted">Caricamento stato AI Provider...</p>
            </div>
        </div>

        <div class="dashboard-grid animate-slide-up delay-2">
            <div class="card">
                <h3 class="text-muted mb-2">Totale Guadagnato</h3>
                <div style="font-size: 2.2rem; font-weight: 700;">€ 247.80</div>
            </div>
            <div class="card">
                <h3 class="text-muted mb-2">Questo Mese</h3>
                <div style="font-size: 2.2rem; font-weight: 700; color: var(--success);">+ € 38.20</div>
            </div>
            <div class="card">
                <h3 class="text-muted mb-2">Prossimo Payout</h3>
                <div style="font-size: 2.2rem; font-weight: 700;">€ 52.00</div>
                <div class="text-muted" style="font-size: 0.8rem;">via Stripe Connect il 01/08</div>
            </div>
        </div>
        
        <div class="chart-container animate-slide-up delay-3">
            <canvas id="revenueChart"></canvas>
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
        
        if (this.mobileToggle && this.sidebar) {
            this.mobileToggle.addEventListener('click', () => {
                this.sidebar.classList.toggle('open');
            });
        }
        
        this.navigate('home');
    },
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.dataset.route;
                this.navigate(route);
                
                if (window.innerWidth <= 768 && this.sidebar) {
                    this.sidebar.classList.remove('open');
                }
            });
        });
    },
    
    navigate(route) {
        if (!Routes.hasOwnProperty(route)) return;
        
        if (route === 'dashboard' && !AppState.user) {
            window.auth.login();
            return;
        }
        
        this.navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[data-route="${route}"]`);
        if(activeLink) activeLink.classList.add('active');
        
        this.contentEl.innerHTML = Routes[route];
        
        if (route === 'home') this.loadHomeStats();
        if (route === 'installer') window.installer.init();
        if (route === 'marketplace') window.marketplace.init();
        if (route === 'dashboard') window.dashboard.init();
        if (route === 'chat') {
             setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
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
            // Local mode fallback if no backend server is active
        }
    },

    simulateRTKWrap() {
        const el = document.getElementById('rtk-terminal-content');
        if (!el) return;
        el.innerHTML = `<span style="color: #6366f1;">$ ai-rtk wrap git status</span>
[RTK Interceptor] Intercepting command 'git status' on repository Wizard-AI...
[Raw Output Size]:  4,820 bytes (approx. 1,200 tokens)
[RTK Compressed]:   384 bytes (approx. 96 tokens)
[Savings]:          <strong style="color: #10b981;">92.0% token reduction in 6.2ms</strong>

<span style="color: #a1a1aa;"># Compressed Summary passed to LLM Context:</span>
Branch: main | Status: clean (up-to-date with origin/main)
Modified (3): hub/index.html, hub/css/design-system.css, hub/js/app.js
Untracked (0): none`;
        this.updateStatsCounter(1104);
    },

    simulateSqueeze() {
        const el = document.getElementById('rtk-terminal-content');
        if (!el) return;
        el.innerHTML = `<span style="color: #6366f1;">$ cat server.log | ai-squeeze --mode log</span>
[Squeeze Engine] Analisi e dedup di 450 righe di log verbose...
[Raw Output Size]:  38,400 bytes (9,600 tokens)
[Squeezed Payload]: 5,120 bytes (1,280 tokens)
[Savings]:          <strong style="color: #10b981;">86.6% token reduction</strong>

<span style="color: #a1a1aa;"># Aggregated Log Signatures:</span>
[INFO] HTTP GET /api/v1/skills -> 200 OK (x142 occurrences)
[WARN] Rate limit threshold reached for client 192.168.1.4 (x12 occurrences)
[ERR] Connection reset by peer on socket #44 (x1 occurrence - flagged)`;
        this.updateStatsCounter(8320);
    },

    simulateHeadroom() {
        const el = document.getElementById('rtk-terminal-content');
        if (!el) return;
        el.innerHTML = `<span style="color: #6366f1;">$ ai-headroom compress --ratio 0.35 < context.md</span>
[Headroom AI Proxy] Running semantic token pruning and structural folding...
[Input Tokens]:     14,500 tokens
[Output Tokens]:    3,625 tokens
[Savings]:          <strong style="color: #10b981;">75.0% token reduction</strong>

<span style="color: #a1a1aa;"># Pruned Context Header:</span>
Wizard-AI Ecosystem Core Definitions [Retained: 100% weights on 5 Loop Specs]
AST Signatures & API Contracts [Retained: 100% function headers, stripped function bodies]`;
        this.updateStatsCounter(10875);
    },

    updateStatsCounter(tokensAdded) {
        AppState.tokensSaved += tokensAdded;
        const topEl = document.getElementById('live-top-tokens');
        const dashEl = document.getElementById('rtk-total-saved');
        if (topEl) topEl.textContent = AppState.tokensSaved.toLocaleString();
        if (dashEl) dashEl.textContent = AppState.tokensSaved.toLocaleString();
    },

    runSimCommand(cmd) {
        const out = document.getElementById('cli-sim-output');
        const input = document.getElementById('cli-sim-input');
        if (!out) return;
        if (input && cmd) input.value = '';
        
        out.innerHTML += `\n<span style="color: #10b981;">wizard-ai-cli@v0.49.0:~$</span> ${escapeHtml(cmd)}\n`;
        
        const cleanCmd = (cmd || '').trim().toLowerCase();
        if (cleanCmd === 'ai-optimize status') {
            out.innerHTML += `═══════════════════════════════════════════════════════════
  🗜️  Context Optimization Stack — Live Status
═══════════════════════════════════════════════════════════
Phase 1: Ingestion & Conversion
  ✓ markitdown (ai-convert)    Convert any file → Markdown
Phase 2: RAG Filtering & Re-ranking
  ✓ ai-rerank (flashrank)      CPU-optimized passage re-ranker
Phase 3: Token Compression
  ✓ ai-compress (llmlingua)    Prompt compression up to 20x
  ✓ ai-squeeze (sqz)           CLI output / JSON / log compressor
  ✓ ai-headroom (headroom)     Context compression & API proxy (60-95%)
Phase 4: Context Guarding & Output
  ✓ ai-lean (lean-ctx)         Lean Context Intelligence (60-90%)
  ✓ ai-caveman (caveman)       Output token reduction (~75%)
Phase 5: CLI Output Interception
  ✓ rtk (ai-rtk)               Rust Token Killer — CLI output compression (60-90%)\n`;
        } else if (cleanCmd === 'ai-rtk info') {
            out.innerHTML += `RTK — Rust Token Killer (CLI Output Compression v0.31.0)
Savings:  60-90% on common dev commands (git, npm, ls, grep, kubectl)
Latency:  <10ms overhead (Rust single binary)
Commands: 100+ supported shell commands with smart deduplication.\n`;
        } else if (cleanCmd === 'ai-headroom info') {
            out.innerHTML += `Headroom — Context Compression & API Proxy v0.31.0
Modes: compress (stdin pipe), proxy (HTTP server)
Status: ✓ installed | Token reduction: 60-95% on large tool outputs.\n`;
        } else if (cleanCmd === 'ai-lean help') {
            out.innerHTML += `ai-lean — Lean Context Intelligence for AI Agents
Commands: read <file> [map|signatures], search <query>, status.\n`;
        } else if (cleanCmd.includes('ai-loop-sentinel')) {
            out.innerHTML += `⚖️ MoE Task Weight Classification: HEAVY (Debug & Refactor Chain)
🔀 Active Loop Pipeline: 03. loop-3-debug → 04. loop-4-refactor → 05. loop-5-release\n`;
        } else {
            out.innerHTML += `Comando non trovato in simulazione veloce: '${escapeHtml(cmd)}'. Prova digita: 'ai-optimize status' o 'ai-rtk info'\n`;
        }
        out.scrollTop = out.scrollHeight;
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());


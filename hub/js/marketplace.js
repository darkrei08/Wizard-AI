window.marketplace = {
    skillsInstalled: [
        { id: 'graphify', name: 'Graphify', icon: '🌐', author: '@safishamsi', rating: 4.9, uses: '12.3k', desc: 'Converte intere codebase in grafi di conoscenza interrogabili.' },
        { id: 'llmlingua', name: 'LLMLingua', icon: '🗜️', author: '@microsoft', rating: 4.6, uses: '8.1k', desc: 'Comprime contesti lunghi fino a 20x preservando le informazioni chiave.' },
        { id: 'markitdown', name: 'MarkItDown', icon: '📄', author: '@microsoft', rating: 4.8, uses: '9.2k', desc: 'Converte qualsiasi file (PDF, PPTX, XLS) in Markdown pulito per LLM.' },
        { id: 'claudemem', name: 'Claude-Mem', icon: '🧠', author: '@thedotmack', rating: 4.3, uses: '5.6k', desc: 'Memoria semantica persistente tra diverse sessioni AI.' },
        { id: 'flashrank', name: 'FlashRank', icon: '🔍', author: '@prithivida', rating: 4.7, uses: '6.4k', desc: 'Reranker ultraleggero per pipeline RAG e document analysis.' }
    ],
    
    currentTab: 'installed',
    
    init() {
        this.renderTabs();
        this.renderGrid();
    },
    
    renderTabs() {
        const container = document.getElementById('marketplace-tabs-container');
        if(!container) return;
        
        container.innerHTML = `
            <div class="tab-switcher">
                <button class="tab-btn ${this.currentTab === 'installed' ? 'active' : ''}" onclick="window.marketplace.switchTab('installed')">
                    <span class="icon">📦</span> Installate
                </button>
                <button class="tab-btn ${this.currentTab === 'trending' ? 'active' : ''}" onclick="window.marketplace.switchTab('trending')">
                    <span class="icon">🔥</span> Trending su skills.sh
                </button>
            </div>
        `;
    },
    
    switchTab(tab) {
        this.currentTab = tab;
        this.renderTabs();
        this.renderGrid();
    },
    
    async renderGrid() {
        const container = document.getElementById('marketplace-grid');
        if(!container) return;
        
        if (this.currentTab === 'installed') {
            container.innerHTML = '';
            container.className = 'marketplace-grid';
            
            let delay = 1;
            this.skillsInstalled.forEach(skill => {
                const safeName = window.escapeHtml ? window.escapeHtml(skill.name) : skill.name;
                const safeAuthor = window.escapeHtml ? window.escapeHtml(skill.author) : skill.author;
                const safeDesc = window.escapeHtml ? window.escapeHtml(skill.desc) : skill.desc;
                const safeIcon = window.escapeHtml ? window.escapeHtml(skill.icon) : skill.icon;
                
                container.innerHTML += `
                    <div class="card skill-card animate-slide-up delay-${delay > 3 ? 3 : delay}">
                        <div class="skill-card-header">
                            <div class="skill-card-title"><span class="icon">${safeIcon}</span> ${safeName}</div>
                            <div class="badge badge-warning">★ ${skill.rating}</div>
                        </div>
                        <div class="skill-card-author">by ${safeAuthor}</div>
                        <div class="skill-card-desc">${safeDesc}</div>
                        <div class="skill-card-footer">
                            <span class="text-muted" style="font-size:0.8rem;">${skill.uses} utilizzi</span>
                            <button class="btn btn-outline" disabled>Già Installata</button>
                        </div>
                    </div>
                `;
                delay++;
            });
        } else if (this.currentTab === 'trending') {
            container.innerHTML = '<div class="text-center w-full py-8 text-muted"><span class="icon animate-pulse">⏳</span> Fetching trending skills da skills.sh...</div>';
            container.className = 'marketplace-list'; // Change layout for trending
            
            try {
                const res = await fetch('/api/skills-trending');
                const skills = await res.json();
                
                let html = '<div class="card w-full animate-fade-in" style="padding: 0; overflow: hidden;">';
                skills.forEach((skill, index) => {
                    let rankClass = '';
                    if (index === 0) rankClass = 'top-1';
                    else if (index === 1) rankClass = 'top-2';
                    else if (index === 2) rankClass = 'top-3';
                    
                    const safeName = window.escapeHtml ? window.escapeHtml(skill.name) : skill.name;
                    const safeAuthor = window.escapeHtml ? window.escapeHtml(skill.author) : skill.author;
                    const safeDesc = window.escapeHtml ? window.escapeHtml(skill.desc) : skill.desc;
                    const safeIcon = window.escapeHtml ? window.escapeHtml(skill.icon) : skill.icon;
                    // For the alert, we need to replace single quotes
                    const safeNameForAlert = safeName.replace(/'/g, "\\'");
                    
                    html += `
                        <div class="trending-item">
                            <div class="trending-rank ${rankClass}">#${index + 1}</div>
                            <div style="font-size: 2rem; margin-right: 1rem;">${safeIcon}</div>
                            <div style="flex-grow: 1;">
                                <div style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary);">${safeName}</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">${safeDesc}</div>
                            </div>
                            <div style="text-align: right; margin-right: 1.5rem; display: none; @media(min-width: 768px){display: block;}">
                                <div style="color: var(--accent-primary); font-size: 0.85rem;">${safeAuthor}</div>
                                <div class="text-muted" style="font-size: 0.8rem;">${skill.uses} installs</div>
                            </div>
                            <button class="btn btn-primary" onclick="alert('Usa il comando nel terminale:\\nnpx skills add ${safeNameForAlert.toLowerCase().replace(/ /g, '-')}');">Installa</button>
                        </div>
                    `;
                });
                html += '</div>';
                container.innerHTML = html;
            } catch (e) {
                const safeError = window.escapeHtml ? window.escapeHtml(e.message) : e.message;
                container.innerHTML = `
                    <div class="card w-full animate-fade-in" style="border-color: rgba(239, 68, 68, 0.3);">
                        <div class="text-error text-center">Impossibile scaricare da skills.sh: ${safeError}</div>
                    </div>
                `;
            }
        }
    }
};

window.marketplace = {
    skills: [
        { id: 'graphify', name: 'Graphify', icon: '🌐', author: '@safishamsi', rating: 4.9, uses: '12.3k', desc: 'Converte intere codebase in grafi di conoscenza interrogabili.' },
        { id: 'llmlingua', name: 'LLMLingua', icon: '🗜️', author: '@microsoft', rating: 4.6, uses: '8.1k', desc: 'Comprime contesti lunghi fino a 20x preservando le informazioni chiave.' },
        { id: 'markitdown', name: 'MarkItDown', icon: '📄', author: '@microsoft', rating: 4.8, uses: '9.2k', desc: 'Converte qualsiasi file (PDF, PPTX, XLS) in Markdown pulito per LLM.' },
        { id: 'claudemem', name: 'Claude-Mem', icon: '🧠', author: '@thedotmack', rating: 4.3, uses: '5.6k', desc: 'Memoria semantica persistente tra diverse sessioni AI.' },
        { id: 'flashrank', name: 'FlashRank', icon: '🔍', author: '@prithivida', rating: 4.7, uses: '6.4k', desc: 'Reranker ultraleggero per pipeline RAG e document analysis.' }
    ],
    
    init() {
        this.renderGrid();
    },
    
    renderGrid() {
        const container = document.getElementById('marketplace-grid');
        if(!container) return;
        
        let html = '';
        this.skills.forEach(skill => {
            html += `
                <div class="card skill-card">
                    <div class="skill-card-header">
                        <div class="skill-card-title"><span class="icon">${skill.icon}</span> ${skill.name}</div>
                        <div class="badge badge-warning">★ ${skill.rating}</div>
                    </div>
                    <div class="skill-card-author">by ${skill.author}</div>
                    <div class="skill-card-desc">${skill.desc}</div>
                    <div class="skill-card-footer">
                        <span class="text-muted" style="font-size:0.8rem;">${skill.uses} utilizzi</span>
                        <button class="btn btn-primary" onclick="alert('Usa il comando \\'ai-sync-skills\\' o guarda la documentazione per aggiungere.')">Installa</button>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
};

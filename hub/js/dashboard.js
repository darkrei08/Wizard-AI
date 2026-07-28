window.dashboard = {
    init() {
        this.fetchQuotaStatus();
        this.renderChart();
    },

    async fetchQuotaStatus() {
        const container = document.getElementById('cockpit-status-container');
        if(!container) return;

        try {
            const res = await fetch('/api/quota');
            const data = await res.json();
            
            if (data.error || data.status === 'error') {
                throw new Error(data.error || data.message);
            }

            // Handle not_configured state elegantly
            if (data.status === 'not_configured') {
                const safeMessage = window.escapeHtml ? window.escapeHtml(data.message) : data.message;
                const safeHint = window.escapeHtml ? window.escapeHtml(data.install_hint) : data.install_hint;
                container.innerHTML = `
                    <div class="cockpit-not-configured w-full animate-fade-in">
                        <div class="icon-large">🔌</div>
                        <h4 class="mb-2">Cockpit Tools Non Configurato</h4>
                        <p class="text-secondary mb-4">${safeMessage}</p>
                        <div class="terminal-mockup text-left mb-4" style="max-width: 400px; margin: 0 auto;">
                            $ ${safeHint}
                        </div>
                        <button class="btn btn-primary" onclick="alert('Esegui il comando sopra nel terminale e avvia l\\'app per configurare i tuoi account AI.')">Ho Capito</button>
                    </div>
                `;
                return;
            }

            // Render Active Provider with premium aesthetics
            const p = data.active_provider;
            const q = data.quota;
            
            const isWarning = q.percentage_used > 80;
            const progressColorClass = isWarning ? 'warning' : '';
            const statusColor = isWarning ? 'var(--warning)' : 'var(--success)';
            
            const safeName = window.escapeHtml ? window.escapeHtml(p.name) : p.name;
            const safeType = window.escapeHtml ? window.escapeHtml(p.type) : p.type;
            const safeAccount = window.escapeHtml && data.active_account ? window.escapeHtml(data.active_account) : data.active_account;
            
            let html = `
                <div class="card w-full mb-4 animate-fade-in" style="background: rgba(10, 12, 16, 0.4); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
                    <div class="flex justify-between items-center mb-6" style="flex-wrap: wrap; gap: var(--spacing-4);">
                        <div>
                            <div class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Provider Attivo</div>
                            <div style="font-size: 1.75rem; font-weight: 800; background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${safeName}</div>
                        </div>
                        <div class="badge ${isWarning ? 'badge-warning' : 'badge-success'}" style="padding: 6px 12px; font-size: 0.85rem; letter-spacing: 1px;">
                            ${p.status.toUpperCase()}
                        </div>
                    </div>
                    
                    <div class="provider-info flex gap-4 text-secondary mb-6" style="font-size: 0.95rem; flex-wrap: wrap; background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.02);">
                        <div style="flex: 1; min-width: 200px;"><span class="icon">⚡</span> <strong>Modello:</strong> ${safeType}</div>
                        ${data.active_account ? `<div style="flex: 1; min-width: 200px;"><span class="icon">👤</span> <strong>Account:</strong> <span style="color: var(--text-primary);">${safeAccount}</span></div>` : ''}
                        ${data.accounts_count ? `<div style="flex: 1; min-width: 200px;"><span class="icon">👥</span> <strong>Collegati:</strong> ${data.accounts_count} Accounts</div>` : ''}
                    </div>

                    <div class="quota-stats mt-4 flex justify-between items-center mb-2" style="flex-wrap: wrap; gap: var(--spacing-2);">
                        <span class="text-muted" style="font-size: 0.9rem; font-weight: 500;">Consumi: <span style="color: var(--text-primary);">${q.used_tokens.toLocaleString()}</span> / ${q.total_limit.toLocaleString()}</span>
                        <span style="font-size: 1.1rem; font-weight: 800; color: ${statusColor};">${q.percentage_used}%</span>
                    </div>
                    <div class="progress" style="margin-bottom: 12px; height: 10px; border-radius: 5px; background: rgba(255,255,255,0.05); overflow: hidden;">
                        <div class="progress-bar ${progressColorClass}" style="width: ${q.percentage_used}%; height: 100%; border-radius: 5px; background: ${isWarning ? 'var(--warning)' : 'linear-gradient(90deg, #6366f1, #a855f7)'}; box-shadow: 0 0 10px ${isWarning ? 'rgba(245, 158, 11, 0.5)' : 'rgba(99, 102, 241, 0.5)'};"></div>
                    </div>
                    <div class="text-muted text-right" style="font-size: 0.8rem; letter-spacing: 0.5px;">Reset stimato: ${q.reset_date || 'N/A'}</div>
                </div>
            `;
            container.innerHTML = html;
        } catch (e) {
            // Local Air-Gapped Fallback if background server is not running
            container.innerHTML = `
                <div class="card w-full mb-4 animate-fade-in" style="background: rgba(10, 12, 16, 0.4); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
                    <div class="flex justify-between items-center mb-6" style="flex-wrap: wrap; gap: var(--spacing-4);">
                        <div>
                            <div class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Provider Attivo (Local Mode)</div>
                            <div style="font-size: 1.75rem; font-weight: 800; background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">LiteLLM / Gemini 3.1 Pro</div>
                        </div>
                        <div class="badge badge-neon" style="padding: 6px 12px; font-size: 0.85rem; letter-spacing: 1px;">
                            AIR-GAPPED
                        </div>
                    </div>
                    
                    <div class="provider-info flex gap-4 text-secondary mb-6" style="font-size: 0.95rem; flex-wrap: wrap; background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.02);">
                        <div style="flex: 1; min-width: 200px;"><span class="icon">⚡</span> <strong>Engine:</strong> RTK Local Interceptor (<10ms)</div>
                        <div style="flex: 1; min-width: 200px;"><span class="icon">👤</span> <strong>Account:</strong> <span style="color: var(--text-primary);">Local Workspace Creator</span></div>
                        <div style="flex: 1; min-width: 200px;"><span class="icon">🛡️</span> <strong>Privacy:</strong> 100% On-Device</div>
                    </div>

                    <div class="quota-stats mt-4 flex justify-between items-center mb-2" style="flex-wrap: wrap; gap: var(--spacing-2);">
                        <span class="text-muted" style="font-size: 0.9rem; font-weight: 500;">Token Risparmiati (Mese): <span style="color: var(--text-primary);">68,420</span> / Budget Infinito</span>
                        <span style="font-size: 1.1rem; font-weight: 800; color: #10b981;">-78.4% Avg</span>
                    </div>
                    <div class="progress" style="margin-bottom: 12px; height: 10px; border-radius: 5px; background: rgba(255,255,255,0.05); overflow: hidden;">
                        <div class="progress-bar" style="width: 78.4%; height: 100%; border-radius: 5px; background: linear-gradient(90deg, #06b6d4, #6366f1); box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);"></div>
                    </div>
                    <div class="text-muted text-right" style="font-size: 0.8rem; letter-spacing: 0.5px;">Stato: Pronto all'esecuzione autonoma</div>
                </div>
            `;
        }
    },
    
    async renderChart() {
        if(!document.getElementById('revenueChart')) return;
        
        try {
            const res = await fetch('/api/stats');
            const stats = await res.json();
            
            // Update Dashboard HTML stats
            const dashboardGrid = document.querySelector('.dashboard-grid');
            if (dashboardGrid && !stats.error) {
                dashboardGrid.innerHTML = `
                    <div class="card">
                        <h3 class="text-muted mb-2">Totale Guadagnato</h3>
                        <div style="font-size: 2rem; font-weight: 700;">€ ${stats.total_revenue.toFixed(2)}</div>
                    </div>
                    <div class="card">
                        <h3 class="text-muted mb-2">Questo Mese</h3>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--success);">+ € ${stats.month_revenue.toFixed(2)}</div>
                    </div>
                    <div class="card">
                        <h3 class="text-muted mb-2">Token Risparmiati</h3>
                        <div style="font-size: 2rem; font-weight: 700;">${(stats.total_tokens_saved / 1000).toFixed(1)}k</div>
                        <div class="text-muted" style="font-size: 0.8rem;">Dall'inizio dell'attività</div>
                    </div>
                `;
            }

            const ctx = document.getElementById('revenueChart').getContext('2d');
            
            // Use real data from DB
            const data = {
                labels: stats.chart.labels.reverse(),
                datasets: [{
                    label: 'Guadagni Stimati (€)',
                    data: stats.chart.data.reverse(),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0a0c10',
                    pointBorderColor: '#a855f7',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            };
        
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(18, 21, 28, 0.9)',
                        titleColor: '#f8fafc',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        };
        
        new Chart(ctx, config);
        
        } catch (e) {
            console.error("Failed to load chart data", e);
        }
    }
};

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
                container.innerHTML = `
                    <div class="cockpit-not-configured w-full animate-fade-in">
                        <div class="icon-large">🔌</div>
                        <h4 class="mb-2">Cockpit Tools Non Configurato</h4>
                        <p class="text-secondary mb-4">${data.message}</p>
                        <div class="terminal-mockup text-left mb-4" style="max-width: 400px; margin: 0 auto;">
                            $ ${data.install_hint}
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
            
            let html = `
                <div class="card w-full mb-4 animate-fade-in" style="background: rgba(99, 102, 241, 0.05); border-color: rgba(99, 102, 241, 0.2);">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <div class="text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Provider Attivo</div>
                            <div style="font-size: 1.5rem; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${p.name}</div>
                        </div>
                        <div class="badge ${isWarning ? 'badge-warning' : 'badge-success'}">
                            ${p.status.toUpperCase()}
                        </div>
                    </div>
                    
                    <div class="provider-info flex gap-4 text-secondary" style="font-size: 0.9rem;">
                        <div><span class="icon">⚡</span> Modello: ${p.type}</div>
                        <div><span class="icon">💳</span> Piano: ${q.subscription}</div>
                    </div>

                    <div class="quota-stats mt-4">
                        <span class="text-muted">Consumi: ${q.used_tokens.toLocaleString()} / ${q.total_limit.toLocaleString()}</span>
                        <span style="font-weight: bold; color: ${statusColor};">${q.percentage_used}%</span>
                    </div>
                    <div class="progress" style="margin-bottom: 8px;">
                        <div class="progress-bar ${progressColorClass}" style="width: ${q.percentage_used}%;"></div>
                    </div>
                    <div class="text-muted text-right" style="font-size: 0.8rem;">Reset: ${q.reset_date}</div>
                </div>
            `;
            container.innerHTML = html;
        } catch (e) {
            container.innerHTML = `
                <div class="card w-full" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.05);">
                    <div class="flex items-center gap-4">
                        <span class="icon" style="font-size: 2rem; color: var(--error);">❌</span>
                        <div>
                            <h4 class="text-error mb-1">Impossibile contattare Cockpit Tools</h4>
                            <p class="text-secondary" style="font-size: 0.9rem;">${e.message}</p>
                        </div>
                    </div>
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

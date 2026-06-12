window.dashboard = {
    init() {
        if(!document.getElementById('revenueChart')) return;
        
        const ctx = document.getElementById('revenueChart').getContext('2d');
        
        // Mock data
        const data = {
            labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno'],
            datasets: [{
                label: 'Guadagni (€)',
                data: [12, 19, 35, 50, 42, 89],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        };
        
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
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
    }
};

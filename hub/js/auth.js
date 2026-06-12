window.auth = {
    init() {
        this.updateUI();
        document.getElementById('btn-login')?.addEventListener('click', () => {
            if(AppState.user) this.logout();
            else this.login();
        });
    },
    
    login() {
        // Mocking GitHub OAuth flow
        const btn = document.getElementById('btn-login');
        if(btn) {
            btn.innerHTML = '<span class="icon">🔄</span> Autenticazione...';
            btn.disabled = true;
        }
        
        setTimeout(() => {
            AppState.user = {
                name: 'Ema',
                handle: '@darkrei08',
                avatar: 'https://github.com/darkrei08.png'
            };
            this.updateUI();
            
            // Add dashboard to nav if not there
            this.ensureDashboardNav();
            app.navigate('dashboard');
        }, 800);
    },
    
    logout() {
        AppState.user = null;
        this.updateUI();
        
        const dashLink = document.querySelector('.nav-links a[data-route="dashboard"]');
        if(dashLink) dashLink.parentElement.remove();
        
        app.navigate('home');
    },
    
    updateUI() {
        const container = document.getElementById('user-status-container');
        if(!container) return;
        
        if (AppState.user) {
            container.innerHTML = `
                <div class="flex items-center gap-4 mb-4">
                    <img src="${AppState.user.avatar}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                    <div>
                        <div style="font-weight: 600;">${AppState.user.name}</div>
                        <div class="text-muted" style="font-size: 0.8rem;">${AppState.user.handle}</div>
                    </div>
                </div>
                <button class="btn btn-outline w-full" id="btn-login"><span class="icon">🚪</span> Esci</button>
            `;
        } else {
            container.innerHTML = `
                <button class="btn btn-outline w-full" id="btn-login"><span class="icon">🔒</span> Accedi Creatore</button>
            `;
        }
        
        document.getElementById('btn-login')?.addEventListener('click', () => {
            if(AppState.user) this.logout();
            else this.login();
        });
    },
    
    ensureDashboardNav() {
        if(!document.querySelector('.nav-links a[data-route="dashboard"]')) {
            const ul = document.querySelector('.nav-links');
            const li = document.createElement('li');
            li.innerHTML = '<a href="#" data-route="dashboard"><span class="icon">📊</span> Dashboard</a>';
            ul.appendChild(li);
            li.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                app.navigate('dashboard');
            });
        }
    }
};

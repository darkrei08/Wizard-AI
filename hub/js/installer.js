window.installer = {
    currentStep: 1,
    
    init() {
        this.renderSteps();
    },
    
    steps: [
        { id: 1, title: 'Verifica Prerequisiti', icon: '🔍', content: '<div class="text-success mb-2">Python 3.11 ✅ | uv ✅ | git ✅</div><p>Tutti i prerequisiti di sistema sono soddisfatti.</p>' },
        { id: 2, title: 'Installazione Strumenti Core', icon: '📥', content: 'Copia ed esegui nel tuo terminale per installare l\'ecosistema locale.<div class="terminal-mockup">$ chmod +x setup.sh<br>$ ./setup.sh</div>' },
        { id: 3, title: 'Configurazione Skill', icon: '🧩', content: 'Sincronizzazione delle skill con i tuoi agenti AI locali (Claude, Gemini, ecc...).<button class="btn btn-primary mt-2" onclick="window.installer.complete(3)">Avvia Sincronizzazione</button>' },
        { id: 4, title: 'Pronto all\'uso', icon: '🎉', content: 'Tutto configurato! Prova a eseguire <code style="background:var(--bg-tertiary);padding:2px 6px;border-radius:4px;">ai-help</code> nel terminale.' }
    ],
    
    renderSteps() {
        const container = document.getElementById('installer-steps-container');
        if(!container) return;
        
        let html = '';
        this.steps.forEach(step => {
            let className = 'step';
            if (step.id < this.currentStep) className += ' completed';
            else if (step.id === this.currentStep) className += ' active';
            
            html += `
                <div class="${className}">
                    <div class="step-icon">${step.id < this.currentStep ? '✅' : step.icon}</div>
                    <div class="step-content">
                        <h3>Step ${step.id}: ${step.title}</h3>
                        ${step.id <= this.currentStep ? step.content : '<p class="text-muted">In attesa del completamento degli step precedenti...</p>'}
                        ${step.id === this.currentStep && step.id !== 3 && step.id !== 4 ? `<button class="btn btn-primary mt-4" onclick="window.installer.complete(${step.id})">Ho Fatto, Prosegui →</button>` : ''}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },
    
    complete(stepId) {
        if(stepId === this.currentStep) {
            if(stepId === 3) {
                // mock sync
                const btn = document.querySelector('.step.active .btn');
                if(btn) {
                    btn.innerHTML = '🔄 Sincronizzazione in corso...';
                    btn.disabled = true;
                }
                setTimeout(() => {
                    this.currentStep++;
                    this.renderSteps();
                }, 1500);
            } else {
                this.currentStep++;
                this.renderSteps();
            }
        }
    }
};

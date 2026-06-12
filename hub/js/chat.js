window.chat = {
    sendMessage() {
        const input = document.getElementById('chat-input');
        const container = document.getElementById('chat-messages');
        const text = input.value.trim();
        
        if (!text) return;
        
        // Append user msg
        this.appendMessage(text, 'user');
        input.value = '';
        
        // Simulate thinking
        const thinkingId = 'msg-' + Date.now();
        this.appendMessage('...', 'ai', thinkingId);
        
        // Simulate API response
        setTimeout(() => {
            const el = document.getElementById(thinkingId);
            if(el) {
                if(text.toLowerCase().includes('royalties') || text.toLowerCase().includes('guadagn')) {
                    el.innerHTML = "Le royalties funzionano così: tu crei una skill, apri una PR, e quando viene approvata e usata dagli utenti, ricevi il 60-70% dei ricavi netti in proporzione agli utilizzi. Noi paghiamo trimestralmente tramite Stripe Connect! 💰<br><br>Vuoi che ti mostri la guida per creare una skill?";
                } else {
                    el.innerHTML = "Ottima domanda! Nel contesto di Wizard-AI, tutto avviene in locale per proteggere i tuoi dati. Usa i comandi `ai-*` nel terminale. Posso aiutarti con altro?";
                }
            }
            container.scrollTop = container.scrollHeight;
        }, 1200);
    },
    
    appendMessage(text, type, id = null) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `message ${type}`;
        if(id) div.id = id;
        div.innerHTML = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
};

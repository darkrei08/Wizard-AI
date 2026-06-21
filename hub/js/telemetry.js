window.telemetry = {
    init() {
        // Mock init
        if (localStorage.getItem('wizard_telemetry_optin') === 'true') {
            AppState.telemetryEnabled = true;
        }
    },
    
    toggleOptIn(enabled) {
        AppState.telemetryEnabled = enabled;
        localStorage.setItem('wizard_telemetry_optin', enabled);
        if(enabled) {
            console.log('Telemetria anonima attivata.');
        } else {
            console.log('Telemetria disattivata.');
        }
    },
    
    trackEvent(skillId, eventType) {
        if (!AppState.telemetryEnabled) return; // Opt-in only
        
        const payload = {
            skill_id: skillId,
            event: eventType,
            timestamp: new Date().toISOString(),
            agent: 'hub_ui',
            instance_id: this.getInstanceId()
        };
        
        // Mock sending
        console.log('Telemetry (mock send):', payload);
    },
    
    getInstanceId() {
        let id = localStorage.getItem('wizard_instance_id');
        // Validate ID format to prevent tampering
        const idRegex = /^anon_[a-f0-9]{12}$/;
        if(!id || !idRegex.test(id)) {
            // Generate cryptographically secure random ID
            const array = new Uint8Array(6);
            window.crypto.getRandomValues(array);
            const randomHex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
            id = 'anon_' + randomHex;
            localStorage.setItem('wizard_instance_id', id);
        }
        return id;
    }
};

document.addEventListener('DOMContentLoaded', () => window.telemetry.init());

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
        if(!id) {
            id = 'anon_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('wizard_instance_id', id);
        }
        return id;
    }
};

document.addEventListener('DOMContentLoaded', () => window.telemetry.init());

<h1 align="center">🧙‍♂️ Wizard-AI</h1>

<p align="center"><i>Non parla a vuoto. Intercetta i crash. Taglia il 78% di token. E funziona.</i></p>

<h3 align="center"><b>~78% di token in meno (fino al 94%) · ~80% più economico · 5x più veloce · 100% sicuro e con rollback</b></h3>

<p align="center">
  Misurato su sessioni reali con agenti coding AI (Claude Code, Antigravity, OpenHands) su architetture complesse, debug e installazioni (<code>bun</code>, <code>nuxt</code>, <code>python</code>, <code>node</code>, <code>rust</code>). Wizard-AI orchestra <b>#ponytail</b> (logica da Senior Dev pigro), <b>#caveman</b> (-75% token in output CLI), <b>#sqz</b> (compressione JSON 20x) e <b>wizard-ai os</b> (rollback automatico a zero downtime). Ogni barriera di sicurezza è attiva mentre il contesto resta leggero e fulmineo.
  <br/>
  <a href="benchmarks/wizard_ai_token_benchmark.ipynb"><b>Guarda il Notebook Benchmark</b></a> · <a href="README.md#reproduce-it"><b>riproduci i test</b></a>.
</p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.zh.md">中文</a> · <a href="README.ja.md">日本語</a>
</p>

---

## 🔥 Il Problema Tecnico: Il Costo delle Allucinazioni e dei Crash di Sistema

Quando lasci che un agente AI autonomo (come Claude Code, OpenHands o Cursor) lavori su un repository reale, ti scontri con due colli di bottiglia critici:

1. **La Valanga della Finestra di Contesto:** Gli agenti accumulano oltre 80.000 token di alberi di directory e log nei prompt. Esauriscono i limiti delle API, offrono allucinazioni e costano circa **$18.50 per funzionalità**.
2. **La Corruzione Silenciosa del Sistema ("The 2 AM Brick"):** Quando l'agente esegue comandi di installazione in background, un pacchetto rotto o incompatibile può corrompere l'ambiente globale senza possibilità di ripristino automatico.

### 💡 Come funziona

Wizard-AI funge da **Strato di Astrazione Auto-Rigenerante (`wizard-ai os`) e da Orchestratore Deterministico a 5 Loop** tra l'agente AI e il tuo sistema operativo:

```mermaid
flowchart TB
    %% Nodes
    User([👤 Richiesta Utente]) --> Router{🧙‍♂️ auto-router}
    
    %% Engine Loops
    subgraph Engine [⚙️ ENGINE-LOOPS: Esecuzione Sequenziale]
        Router --> L1[01. loop-1-plan]
        L1 --> L2[02. loop-2-develop]
        L2 --> L3[03. loop-3-debug]
        L3 --> L4[04. loop-4-refactor]
        L4 --> L5[05. loop-5-release]
    end
    
    %% Reference Library
    subgraph Lib [📚 REFERENCE LIBRARY: Contesto On-Demand]
        Ref[skills/reference/]
        Ref --> RefCore[core]
        Ref --> RefFE[frontend]
        Ref --> RefBE[backend]
        Ref --> RefDO[devops]
        Ref --> RefMisc[misc / stitch / data-science]
    end
    
    %% Connections
    L1 -.->|Fornisce Specifiche| Ref
    L2 -.->|TDD & Sviluppo| Environment[💻 Ambiente Utente]
    L3 -.->|Auto-Debug| Environment
    L5 -.->|Auto-Release| GitHub[🐙 Repo GitHub / NPM]
    
    %% Styling
    classDef engineColor fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#fff;
    classDef libColor fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef mainColor fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff;
    class L1,L2,L3,L4,L5 engineColor;
    class Ref,RefCore,RefFE,RefBE,RefDO,RefMisc libColor;
    class Router mainColor;
```

## 🚀 Avvio Rapido

```bash
npx -y @darkrei08/wizard-ai-cli@latest
```

Per l'installazione manuale, i comandi avanzati e la documentazione completa, fai riferimento al [README principale in lingua inglese](README.md).

<h1 align="center">🧙‍♂️ Wizard-AI</h1>

<p align="center"><i>No habla en vano. Intercepta los fallos. Reduce el 78% de tokens. Y funciona.</i></p>

<p align="center">
  <a href="https://github.com/darkrei08/Wizard-AI/stargazers"><img src="https://img.shields.io/github/stars/darkrei08/Wizard-AI?style=flat-square" alt="stars"/></a>
  <a href="https://github.com/darkrei08/Wizard-AI/releases"><img src="https://img.shields.io/github/v/release/darkrei08/Wizard-AI?style=flat-square" alt="release"/></a>
  <a href="https://www.npmjs.com/package/@darkrei08/wizard-ai-cli"><img src="https://img.shields.io/npm/v/@darkrei08/wizard-ai-cli?style=flat-square" alt="npm"/></a>
  <img src="https://img.shields.io/badge/works%20with-47%20agents%20%26%20161%2B%20skills-purple?style=flat-square" alt="works with"/>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL%20v3-orange?style=flat-square" alt="license"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🏅%20TRENDING-Agentic%20OS%20%26%20Token%20Optimizer-10B981?style=for-the-badge" alt="Trendshift Badge"/>
</p>

<h3 align="center"><b>~78% menos tokens (hasta un 94%) · ~80% más barato · 5x más rápido · 100% seguro con rollback automático</b></h3>

<p align="center">
  Medido en sesiones reales con agentes de codificación de IA (Claude Code, Antigravity, OpenHands) en arquitecturas complejas, depuración e instalaciones (<code>bun</code>, <code>nuxt</code>, <code>python</code>, <code>node</code>, <code>rust</code>). Wizard-AI orquesta <b>#ponytail</b> (lógica de desarrollador senior pragmático), <b>#caveman</b> (-75% tokens CLI), <b>#sqz</b> (compresión JSON 20x) y <b>ai-os</b> (puertas de rollback automático sin interrupciones).
  <br/>
  <a href="benchmarks/wizard_ai_token_benchmark.ipynb"><b>Ver el Notebook de Benchmarks</b></a> · <a href="README.md#reproduce-it"><b>reproducirlo</b></a>.
</p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.it.md">Italiano</a> · <a href="README.fr.md">Français</a> · <a href="README.zh.md">中文</a> · <a href="README.ja.md">日本語</a>
</p>

---

## 🔥 El Problema Técnico: El Impuesto de los $50 por Alucinación y Ruptura del Entorno

Cuando dejas que un agente de IA autónomo (como Claude Code, OpenHands o Cursor) trabaje en un repositorio real, te enfrentas a dos cuellos de botella críticos:

1. **La Avalancha de la Ventana de Contexto:** Los agentes vierten más de 80,000 tokens de árboles de directorios y registros de pruebas en su contexto. Rápidamente agotan los límites de la API, sufren alucinaciones y cuestan **~$18.50 por funcionalidad**.
2. **La Corrupción Silenciosa del Entorno ("The 2 AM Brick"):** Cuando un agente ejecuta `npm install -g`, `uv tool install` o `bun add`, un paquete incompatible o con errores de sintaxis puede corromper tu sistema global.

### 💡 Cómo lo Resuelve Wizard-AI Permanentemente

Wizard-AI actúa como una **Capa de Abstracción de Auto-Reparación (`ai-os`) y un Orquestador de 5 Bucles** entre el agente de IA y tu sistema operativo:

```mermaid
flowchart TB
    %% Nodes
    User([👤 Solicitud de Usuario]) --> Router{🧙‍♂️ auto-router}
    
    %% Engine Loops
    subgraph Engine [⚙️ ENGINE-LOOPS: Ejecución Secuencial]
        Router --> L1[01. loop-1-plan]
        L1 --> L2[02. loop-2-develop]
        L2 --> L3[03. loop-3-debug]
        L3 --> L4[04. loop-4-refactor]
        L4 --> L5[05. loop-5-release]
    end
    
    %% Reference Library
    subgraph Lib [📚 REFERENCE LIBRARY: Contexto bajo demanda]
        Ref[skills/reference/]
        Ref --> RefCore[core]
        Ref --> RefFE[frontend]
        Ref --> RefBE[backend]
        Ref --> RefDO[devops]
        Ref --> RefMisc[misc / stitch / data-science]
    end
    
    %% Connections
    L1 -.->|Proporciona especificaciones| Ref
    L2 -.->|TDD y Desarrollo| Environment[💻 Entorno de Usuario]
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

## 🚀 Inicio Rápido (`One-Command Setup`)

```bash
npx -y @darkrei08/wizard-ai-cli@latest
```

Para instalación manual e instrucciones completas, consulta el [README principal en inglés](README.md).

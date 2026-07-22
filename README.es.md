<h1 align="center">🧙‍♂️ Wizard-AI</h1>

<p align="center"><i>No habla en vano. Intercepta los fallos. Reduce el 78% de tokens. Y funciona.</i></p>

<h3 align="center"><b>~78% menos tokens (hasta un 94%) · ~80% más barato · 5x más rápido · 100% seguro con rollback automático</b></h3>

<p align="center">
  Medido en sesiones reales con agentes de codificación de IA (Claude Code, Antigravity, OpenHands) en arquitecturas complejas, depuración e instalaciones (<code>bun</code>, <code>nuxt</code>, <code>python</code>, <code>node</code>, <code>rust</code>). Wizard-AI orquesta <b>#ponytail</b> (lógica de desarrollador senior pragmático), <b>#caveman</b> (-75% tokens CLI), <b>#sqz</b> (compresión JSON 20x) y <b>wizard-ai os</b> (puertas de rollback automático sin interrupciones).
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

Wizard-AI actúa como una **Capa de Abstracción de Auto-Reparación (`wizard-ai os`) y un Orquestador de 5 Bucles** entre el agente de IA y tu sistema operativo:

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

## 🧠 Agentic Context Engineering & The 4-Layer Format Stack

En el ecosistema de IA de 2026, la ingeniería de contexto es el nuevo estándar de oro. Wizard-AI presenta el **4-Layer Format Stack**, diseñado para eliminar las alucinaciones y maximizar la optimización de tokens:

1. **Layer 4: JavaScript (Ejecución)** — La lógica se ejecuta en un sandbox seguro mediante `pi-extensible-workflows`. Sin scripts redundantes que saturen el prompt.
2. **Layer 3: YAML (Orquestación)** — Exclusivo para rutas, configuración y roles de agentes.
3. **Layer 2: Markdown + LEA (Contenido)** — Utiliza **Lossless Evidence Aliases (LEA)** (`[S1]: MEMORY.md` referenciado como `[E1]`). Ahorra hasta un 80% en metadatos repetitivos.
4. **Layer 1: Formato TOON (Límites de API)** — Reemplaza el JSON con **Token Oriented Object Notation (TOON)** (ahorro del 40-75% de tokens sobre JSON sin procesar).

**Regla del PRE & POST Autoloop:** Cada sesión comprime el contexto, sincroniza la memoria (`MEMORY.md`) y actualiza el grafo del proyecto antes y después de cada iteración de manera autónoma.

### 🔧 Pi Dynamic Configurator (`wz-ai-pi-configurator`)

Integra automáticamente los patrones de [vekexasia/pi-config](https://github.com/vekexasia/pi-config) en tu entorno local `~/.pi/agent/` con ajustes predeterminados y asignación inteligente de modelos basados en el nivel de suscripción a **Cockpit Tools**:

```bash
wz-ai-pi-configurator
```

### 📚 RepoDocs Wiki Generator (`wz-ai-repodocs`)

Genera automáticamente una wiki documentada para cualquier repositorio utilizando [aryrabelo/repodocs](https://github.com/aryrabelo/repodocs). Integrado en el **Loop 5 (Release)** para la documentación al final del ciclo:

```bash
wz-ai-repodocs repodocs-all .
```

## 🚀 Inicio Rápido (`One-Command Setup`)

```bash
npx -y @darkrei08/wizard-ai-cli@latest
```

Para instalación manual e instrucciones completas, consulta el [README principal en inglés](README.md).

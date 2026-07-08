# LLM Models Reference (2026 Landscape)

Questo documento traccia i principali modelli LLM (Large Language Models) disponibili a metà del 2026, suddivisi tra ecosistemi chiusi di frontiera e soluzioni open-source/locali. Costituisce la base di riferimento per decidere quali modelli invocare per specifici task di sviluppo in Wizard-AI.

---

## 🚀 1. Modelli di Frontiera (Closed Source)

Questi modelli offrono le massime capacità di ragionamento, coding e pianificazione agentica.

| Provider | Modello Flagship | Focus Principale | Finestra Contesto | Note 2026 |
|---|---|---|---|---|
| **OpenAI** | `gpt-5.6-sol` | Ragionamento complesso, parallel agents | 2M Token | "Ultra mode" per task orizzontali |
| **OpenAI** | `gpt-5.6-terra` | Bilanciamento costo/performance | 1M Token | Sostituto di GPT-4o per uso quotidiano |
| **Anthropic** | `claude-5-fable` | Analisi orizzontali, high-trust coding | 1M Token | Modello agentico principale per sviluppo |
| **Anthropic** | `claude-5-sonnet` | Efficienza estrema per agenti | 200K Token | Default per task veloci |
| **Google** | `gemini-3.5-pro` | Ragionamento multimodale e codice | 2M+ Token | Attualmente in fase di anteprima/rollout |
| **Google** | `gemini-3.5-flash`| Elaborazione massiva e veloce (RAG) | 1M Token | Ottimo per estrazione su grandi codebase |

---

## 🌍 2. Modelli Open-Source e Open-Weight

Ideali per deployment su infrastruttura privata, compliance rigorosa o fine-tuning aziendale.

| Provider | Modello | Focus Principale | Finestra Contesto |
|---|---|---|---|
| **Meta** | `llama-4-maverick` | Modello generalista top-tier (MoE) | 1M Token |
| **Meta** | `llama-4-scout` | Context window estrema | 10M Token |
| **Mistral** | `mistral-small-4` | Europea, efficiente (137+ tk/s) | 256K Token |
| **Alibaba** | `qwen-3.7-max` | Multilingua e ragionamento esteso | 1M Token |
| **DeepSeek** | `deepseek-v4` | Ottimizzato esplicitamente per Coding | 128K Token |
| **Zhipu AI** | `glm-5.2` | Leader in benchmark SWE/Terminal | 200K Token |

---

## 💻 3. Esecuzione Locale (Local LLM Runners)

Per privacy totale, i modelli open (Llama, Mistral, Qwen, Phi-4) possono essere eseguiti localmente sull'hardware dell'utente.

- **[LM Studio](https://lmstudio.ai/)**: Interfaccia grafica completa, permette di scaricare file `.gguf` e avviare un server locale API-compatibile con OpenAI (default porta `1234`).
- **[llama.cpp](https://github.com/ggerganov/llama.cpp)**: L'engine in C/C++ ultra ottimizzato per l'inferenza CPU/GPU (MPS, CUDA). Fornisce `llama-server`.
- **[Ollama](https://ollama.com/)**: Il gestore CLI più rapido per installare modelli (es. `ollama run llama3`). Espone API standard.
- **[vLLM](https://github.com/vllm-project/vllm) / SGLang**: Standard per deployment locale ad alte prestazioni con hardware dedicato (datacenter/multi-GPU).
- **LLMTurbo / GPT4All**: Alternative leggere per CPU mainstream e edge-device.

*Tip: Per puntare le skill Wizard-AI ai modelli locali, basta impostare `OPENAI_API_BASE="http://127.0.0.1:1234/v1"` (LM Studio) o `11434` (Ollama).*

---

## 🕹️ 4. Cockpit Tools: Mappatura Account & Modelli

Cockpit Tools centralizza l'uso di piattaforme diverse sotto un'unica interfaccia. Ecco quali modelli sono sbloccabili tramite l'installazione di **Cockpit Tools** sul proprio sistema:

| Piattaforma Gestita | SDK Invocabile | Modelli a disposizione dell'Utente |
|---|---|---|
| **Antigravity IDE** | Anthropic API | `claude-5-fable`, `claude-5-sonnet`, `claude-3.5-sonnet` |
| **Codex** | OpenAI API | `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-4o` |
| **Cursor / Windsurf** | Anthropic / OpenAI | Accesso unificato ai flagship Claude 5 e GPT-5.6 tramite il proxy locale |
| **Gemini CLI** | Google Generative AI | `gemini-3.5-pro`, `gemini-3.5-flash`, `gemini-1.5-pro` |
| **CodeBuddy (CN) / Qoder**| Misto (DeepSeek/Zhipu)| Accesso ai top cinesi: `deepseek-v4`, `glm-5.2` e modelli proxy-ati |
| **Trae / Zed** | Anthropic / OpenAI | `claude-5-sonnet`, `gpt-4o` (basato su credenziali estratte) |

**Come Wizard-AI usa Cockpit Tools:**
Wizard-AI intercetta il proxy locale di Cockpit Tools in ascolto su `http://127.0.0.1:19528` (se abilitato). 
Se rilevato, invia richieste in formato **OpenAI-compatibile** specificando il modello desiderato (es. `gemini-3.5-pro`), e Cockpit lo instraderà automaticamente usando i token OAuth rubati dalle sessioni attive dell'utente.

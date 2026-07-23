# LLM Models Reference (2026)

Traccia modelli LLM disponibili a metà 2026 (chiusi e open). Base per decisioni routing Wizard-AI.

## 1. Modelli Frontiera (Closed Source)
Massime capacità ragionamento, codice, agenti.

| Provider | Modello | Focus | Contesto | Note |
|---|---|---|---|---|
| **OpenAI** | `gpt-5.6-sol` | Ragionamento complesso, parallel agents | 2M | Ultra mode task orizzontali |
| **OpenAI** | `gpt-5.6-terra` | Bilanciamento costo/performance | 1M | Sostituto GPT-4o |
| **Anthropic** | `claude-5-fable` | Analisi orizzontali, high-trust coding | 1M | Modello agentico principale |
| **Anthropic** | `claude-5-sonnet` | Efficienza estrema agenti | 200K | Default task veloci |
| **Google** | `gemini-3.5-pro` | Multimodale, codice | 2M+ | Anteprima/rollout |
| **Google** | `gemini-3.5-flash`| Elaborazione massiva RAG | 1M | Estrazione grandi codebase |

## 2. Modelli Open-Source
Ideali per infrastruttura privata, compliance, fine-tuning.

| Provider | Modello | Focus | Contesto |
|---|---|---|---|
| **Meta** | `llama-4-maverick` | Generalista top-tier (MoE) | 1M |
| **Meta** | `llama-4-scout` | Context window estrema | 10M |
| **Mistral** | `mistral-small-4` | Efficiente (137+ tk/s) | 256K |
| **Alibaba** | `qwen-3.7-max` | Multilingua, ragionamento esteso | 1M |
| **DeepSeek** | `deepseek-v4` | Ottimizzato Coding | 128K |
| **Zhipu AI** | `glm-5.2` | Leader benchmark SWE/Terminal | 200K |

## 3. Esecuzione Locale
Privacy totale. Esecuzione su hardware utente.

- **[LM Studio](https://lmstudio.ai/)**: UI completa. Modelli `.gguf`. Server API OpenAI-compatibile (porta `1234`).
- **[llama.cpp](https://github.com/ggerganov/llama.cpp)**: Engine C/C++ ottimizzato CPU/GPU.
- **[Ollama](https://ollama.com/)**: Gestore CLI rapido (`ollama run llama3`).
- **[vLLM](https://github.com/vllm-project/vllm)**: Standard deployment server (multi-GPU).
- **LLMTurbo / GPT4All**: Alternative leggere CPU.

*Tip: Punta skill Wizard-AI a locale impostando `OPENAI_API_BASE="http://127.0.0.1:1234/v1"` (LM Studio) o `11434` (Ollama).*

## 4. Cockpit Tools: Mappatura Modelli
Centralizza uso piattaforme multiple. Sblocca modelli tramite token OAuth rubati sessioni utente. In ascolto su `http://127.0.0.1:19528`.

| Piattaforma | SDK Invocabile | Modelli |
|---|---|---|
| **Antigravity IDE** | Anthropic API | `claude-5-fable`, `claude-5-sonnet`, `claude-3.5-sonnet` |
| **Codex** | OpenAI API | `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-4o` |
| **Cursor/Windsurf** | Anthropic/OpenAI | Proxy locale unificato Claude 5 e GPT-5.6 |
| **Gemini CLI** | Google Gen AI | `gemini-3.5-pro`, `gemini-3.5-flash`, `gemini-1.5-pro` |
| **CodeBuddy/Qoder**| Misto | Top cinesi: `deepseek-v4`, `glm-5.2` |
| **Trae / Zed** | Anthropic/OpenAI | `claude-5-sonnet`, `gpt-4o` |

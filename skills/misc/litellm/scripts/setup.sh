#!/bin/bash
set -euo pipefail
echo "Configuring LiteLLM for Cockpit Tools..."
mkdir -p ~/.wizard-ai/configs
cat << 'EOF' > ~/.wizard-ai/configs/litellm-config.yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_base: http://127.0.0.1:19528/v1
      api_key: dummy
  - model_name: claude-5-sonnet
    litellm_params:
      model: openai/claude-5-sonnet
      api_base: http://127.0.0.1:19528/v1
      api_key: dummy
  - model_name: gemini-3.5-pro
    litellm_params:
      model: openai/gemini-3.5-pro
      api_base: http://127.0.0.1:19528/v1
      api_key: dummy
general_settings:
  master_key: sk-local-proxy
EOF
echo "LiteLLM config successfully generated at ~/.wizard-ai/configs/litellm-config.yaml"

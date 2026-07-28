const result = await parallel("Greeting", {
  hello: () => agent("Say Hello", { model: "openai-codex/gpt-5.6-luna:xhigh" }),
  world: () => agent("Say World", { model: "openai-codex/gpt-5.6-luna:xhigh" })
});
return result;

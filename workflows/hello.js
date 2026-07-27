const result = await parallel("Greeting", {
  hello: agent("Say Hello", { model: "antigravity/gemini-3.1-pro" }),
  world: agent("Say World", { model: "antigravity/gemini-3.1-pro" })
});
return result;

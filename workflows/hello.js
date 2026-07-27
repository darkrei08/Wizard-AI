const result = await parallel("Greeting", {
  hello: () => agent("Say Hello"),
  world: () => agent("Say World")
});
return result;

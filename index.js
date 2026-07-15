/**
 * Pi Extension Entry Point for Wizard-AI & Cockpit Tools
 */
module.exports = async function (api) {
  if (api.commands) {
    api.commands.register("wizard", {
      description: "Launch Wizard-AI",
      action: async () => {
        console.log("Wizard-AI Pi Extension loaded.");
      },
    });

    api.commands.register("cockpit", {
      description: "Cockpit Tools Integration",
      action: async () => {
        console.log("Cockpit Tools Pi Extension loaded.");
      },
    });
  }
};

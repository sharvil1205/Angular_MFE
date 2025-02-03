const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "shell",

  exposes: {
    // Add any components/modules you want to expose
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },

  // Add this to fix the production build issue
  remotes: {
    orderFood: "http://localhost:4201/remoteEntry.js",
    adminPanel: "http://localhost:4202/remoteEntry.js",
  },
});

const cors_proxy = require("cors-anywhere");

process.env.CORSANYWHERE_WHITELIST = "https://virtual.ifro.edu.br";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8080;

const createServerOptions = {
  // removeHeaders: []
};

cors_proxy.createServer(createServerOptions).listen(PORT, HOST, function () {
  console.log("Running CORS Anywhere on " + HOST + ":" + PORT);
});

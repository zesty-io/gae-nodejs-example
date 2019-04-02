const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const kms = require("@zesty-io/kms-js");

const SERVICE_NAME = "gae-nodejs-example";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send(process.env.EXAMPLE_ENV_VAR);
});

app.get("/_ah/health", (req, res) => {
  return res.send({
    message: "healthy",
    running: Date.now()
  });
});

// Start Server
(async () => {
  if (process.env.NODE_ENV !== "local") {
    try {
      await kms.loadDefault(SERVICE_NAME);
    } catch (err) {
      process.exit(err);
    }
  }

  app.listen(process.env.PORT, () => {
    console.log(`${SERVICE_NAME} listening on port ${process.env.PORT}`);
  });
})();

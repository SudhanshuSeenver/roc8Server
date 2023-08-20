const express = require("express");
const axios = require("axios");

const app = express();

async function token(apiKey, res) {
  const config = { headers: { "Api-key": apiKey } };
  const token = await axios.post(
    "https://dev-test.cimet.io/generate-token",
    config
  );
  return res.json(token.data);
}

app.post("/token", (req, res) => {
  const { headers } = req;
  token(headers["Api-key"], res);
  // res.send('Hello World!');
});

app.listen(3000, () => {
  console.log("Express server initialized");
});

// ///////////////////////////////////
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

async function token(apiKey, res) {
  const config = { headers: { "Api-key": apiKey } };

  try {
    const resp = await axios.post(
      "https://dev-test.cimet.io/generate-token",
      null, // No data needs to be sent in the request body
      config
    );
    const data = resp.data; // No need to wrap resp.data in res.json

    console.log("token running", data);
    res.json(data); // Use res.json directly here
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle error response
  }
}

app.get("/get", (req, res) => {
  console.log("req--", req);
  res.send(200).json("hello");
});

app.post("/token", (req, res) => {
  console.log("request running");
  const { headers } = req;
  console.log("headers", headers);
  //   res.send(200);
  token(headers["api-key"], res); // Use lowercase "api-key"
});

// let fetchList(())

// app.post("/list", (req, res) => {});

app.listen(3000, () => {
  console.log("Express server initialized");
});

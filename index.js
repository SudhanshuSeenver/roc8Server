const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors package

const app = express();

app.use(express.json());
app.use(cors()); //

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

async function fetchList(req, res) {
  console.log("req.body", req.body);
  let url = "https://dev-test.cimet.io/plan-list";

  try {
    const response = await axios.post(url, req.body, {
      headers: {
        "Api-key": req.headers["api-key"],
        "Auth-token": req.headers["auth-token"],
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

app.post("/list", (req, res) => {
  console.log("list running ", req.headers);
  fetchList(req, res);
});

app.listen(3003, () => {
  console.log("Express server initialized");
});

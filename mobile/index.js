const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      title: "IOS",
    },
    {
      id: "2",
      title: "Android",
    },
    {
      id: "3",
      title: "Microsoft",
    },
  ]);
});

app.listen(8003, () => {
  console.log("Mobile Service listening for requests on port 8003");
});

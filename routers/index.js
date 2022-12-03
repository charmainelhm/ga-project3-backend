const express = require("express");
const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Project 3 Backend");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

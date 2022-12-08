const express = require("express");
const app = express();
const { router: userRouter } = require("./user-router");
const { router: authRouter } = require("./auth-router");

// middleware
app.use(express.json());

// routers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Project 3 Backend");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

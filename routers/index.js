const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { router: userRouter } = require("./user-router");
const { router: authRouter } = require("./auth-router");

// middleware
app.use(express.json());
app.use(cookieParser());

// routers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Project 3 Backend");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    err.message || "Something went wrong, please try again later!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

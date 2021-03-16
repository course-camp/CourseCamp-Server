const express = require("express");
const passport = require("passport");
const connect = require("./db/mongoose");
const server = require("./config/config").server;
const error = require("./middlewares/error");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const reviewRouter = require("./routes/review");
require("./config/passport");

const PORT = server.port;
connect();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/auth/", authRouter);
app.use("/users/", userRouter);
app.use("/courses/", courseRouter);
app.use("/reviews/", reviewRouter);

app.use(error);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

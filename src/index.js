const express = require("express");
const passport = require("passport");
const connect = require("./db/mongoose");
const config = require("./config/config");
const authRouter = require("./routes/auth");
const ErrorHandler = require("./helpers/ErrorHandler");
const UserService = require("./services/UserService");
require("./config/passport");

const PORT = config.server.port;
connect();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/auth/", authRouter);

app.use((err, req, res, next) => {
  ErrorHandler.handleError(err, res);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

require("dotenv").config({
  path: "/home/sudhir/Desktop/Project/Coursecamp-Server/.env.production",
});

const config = {
  server: {
    port: process.env.PORT,
  },
  db: {
    mongodb_uri: process.env.MONGODB_URI,
  },
  jwt: {
    refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenLife: process.env.JWT_ACCESS_TOKEN_EXPRIN,
    refreshTokenLife: process.env.JWT_REFRESH_TOKEN_EXPRIN,
  },
  OAuth: {
    google: {
      provider: "google",
      stratergOptions: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      authOptions: {
        scope: ["profile", "email"],
        session: false,
      },
      callbackOptions: {
        failureRedirect: "/auth/google/failure",
        session: false,
      },
    },
  },
};

module.exports = config;

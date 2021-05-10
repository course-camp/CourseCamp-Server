require("dotenv").config();

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
  fileServer: {
    baseURL: process.env.FILE_SERVER_BASE_URL,
    uploadRoute: process.env.FILE_SERVER_UPLOAD_ROUTE,
    publicRoute: process.env.FILE_SERVER_PUBLIC_ROUTE,
    deleteRoute: process.env.FILE_SERVER_DELETE_ROUTE,
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

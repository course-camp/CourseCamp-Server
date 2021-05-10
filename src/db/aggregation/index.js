const getFollowing = require("./follower/getFollowing");
const getFollowers = require("./follower/getFollowers");
const getRecommendedBy = require("./recommend/getRecommendedBy");

module.exports = {
  followers: {
    getFollowers,
    getFollowing,
  },
  recommend: {
    getRecommendedBy,
  },
};

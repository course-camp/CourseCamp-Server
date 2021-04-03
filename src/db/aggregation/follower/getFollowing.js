const addPrefixToKeys = require("../modifyKeys");

const getFollowing = async function (userId, limit, skip, sort) {
  sort = await addPrefixToKeys(sort, "followed.");
  return [
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "follower",
        as: "followed",
      },
    },
    {
      $addFields: {
        count: { $size: "$followed" },
      },
    },
    { $unwind: "$followed" },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
    {
      $group: {
        _id: "$followed.follower",
        following: {
          $push: { $toString: "$followed.followee" },
        },
        totalFollowing: { $first: "$count" },
      },
    },
    {
      $project: {
        _id: 0,
        count: 0,
      },
    },
  ];
};

module.exports = getFollowing;

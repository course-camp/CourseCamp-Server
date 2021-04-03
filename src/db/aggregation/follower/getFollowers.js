const addPrefixToKeys = require("../modifyKeys");

const getFollowers = async function (userId, limit, skip, sort) {
  sort = await addPrefixToKeys(sort, "followers.");
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
        foreignField: "followee",
        as: "followers",
      },
    },
    {
      $addFields: {
        count: { $size: "$followers" },
      },
    },
    { $unwind: "$followers" },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
    {
      $group: {
        _id: "$followers.followee",
        followers: {
          $push: { $toString: "$followers.follower" },
        },
        totalFollowers: { $first: "$count" },
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

module.exports = getFollowers;

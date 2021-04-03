const getRecommendedByPipeline = async function (
  courseId,
  userId,
  limit,
  skip
) {
  return [
    {
      $facet: {
        courseRecommendedBy: [
          {
            $match: { courseId },
          },
          {
            $group: {
              _id: { courseId: "$courseId" },
              recommends: {
                $push: { $toString: "$userId" },
              },
              count: { $sum: 1 },
            },
          },
        ],
        followedUsers: [
          {
            $match: { userId, courseId },
          },
          {
            $lookup: {
              from: "followers",
              localField: "userId",
              foreignField: "follower",
              as: "followed",
            },
          },
          { $unwind: "$followed" },
          {
            $group: {
              _id: { followed: "$followed.follower" },
              followers: {
                $push: { $toString: "$followed.followee" },
              },
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: 0,
        set1: { $first: { $arrayElemAt: ["$courseRecommendedBy", 0] } },
        set2: { $last: { $arrayElemAt: ["$followedUsers", 0] } },
      },
    },
    {
      $addFields: {
        totalRecommendCount: "$set1.count",
        followedRecommendCount: "$set2.count",
        recommendedBy: {
          $slice: [
            {
              $concatArrays: [
                { $setIntersection: ["$set1.recommends", "$set2.followers"] },
                { $setDifference: ["$set1.recommends", "$set2.followers"] },
              ],
            },
            skip,
            limit,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        recommendedBy: 1,
        totalRecommendCount: 1,
        followedRecommendCount: 1,
      },
    },
  ];
};

module.exports = getRecommendedByPipeline;

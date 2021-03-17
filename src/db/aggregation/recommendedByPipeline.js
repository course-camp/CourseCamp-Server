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
                $push: "$followed.followee",
                $push: { $toString: "$followed.followee" },
              },
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
        common: { $setIntersection: ["$set1.recommends", "$set2.followers"] },
        difference: { $setDifference: ["$set1.recommends", "$set2.followers"] },
        recommendedBy: {
          $concatArrays: [
            { $setIntersection: ["$set1.recommends", "$set2.followers"] },
            { $setDifference: ["$set1.recommends", "$set2.followers"] },
          ],
        },
        slice: {
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
  ];
};

module.exports = getRecommendedByPipeline;

const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;
const types = {
  string: Joi.string().trim().min(3),
};
const validation = {
  validObjectId: function (objectId, helpers) {
    if (
      objectId &&
      ObjectId.isValid(objectId) &&
      String(new ObjectId(objectId)) === objectId
    ) {
      return objectId;
    }
    throw new Error("not valid mongoDB ObjectId.");
  },
};

module.exports = {
  updateUserProfile: Joi.object({
    username: types.string,
    displayName: types.string,
    summary: types.string.min(10),
  }),
  updateUserInterests: Joi.object({
    interests: Joi.array().items(types.string).min(1).required(),
  }),
  validateObjectId: Joi.string().custom(
    validation.validObjectId,
    "MongoDB ObjectID validation."
  ),
  getUserByUsername: types.string,
};

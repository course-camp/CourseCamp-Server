const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;

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
  validateNumber: function (num, helpers) {
    const numTemp = parseInt(num);
    if (isNaN(numTemp)) throw new Error("Not valid number");
    return numTemp;
  },
};

const types = {
  string: Joi.string().trim().min(3),
  number: Joi.string().custom(
    validation.validateNumber,
    "Validate is given string number"
  ),
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
  pagination: Joi.object({
    limit: types.number,
    skip: types.number,
  }),
};

const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;

const customValidation = {
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
  number: Joi.number().min(0).positive(),
  query: {
    number: Joi.string().custom(
      customValidation.validateNumber,
      "Validate is given string number"
    ),
  },
};

const courseValidation = {
  createCourse: Joi.object({
    courseName: types.string.required(),
    platform: types.string.required(),
    courseURL: types.string.uri().required(),
    domain: types.string.min(2).required(),
    price: types.number,
    tags: Joi.array().items(types.string.min(1)).min(1),
  }),
  updateCourse: Joi.object({
    courseName: types.string,
    platform: types.string,
    domain: types.string.min(2),
    courseURL: types.string.uri(),
    price: types.number,
  }),
};

const userValidation = {
  addUser: Joi.object({
    access_token: types.string.required(),
  }),
  updateUserProfile: Joi.object({
    username: types.string,
    displayName: types.string,
    summary: types.string.min(10),
  }),
  updateUserInterests: Joi.object({
    interests: Joi.array().items(types.string).min(1).required(),
  }),
  getUserByUsername: types.string,
};

const reviewValidation = {
  addAndUpdateReview: Joi.object({
    review: types.string.max(300).required(),
  }),
};

const objectIdValidation = {
  validateObjectId: Joi.string().custom(
    customValidation.validObjectId,
    "MongoDB ObjectID validation."
  ),
};

module.exports = {
  types,
  ...courseValidation,
  ...userValidation,
  ...reviewValidation,
  ...objectIdValidation,
};

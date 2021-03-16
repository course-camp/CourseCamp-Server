const Joi = require("joi");
const types = require("./validator").types;
const { HTTP422Error } = require("./error");

async function changeIfSortQuery(query) {
  if (query.hasOwnProperty("sort") && query.sort) {
    const sortParts = query.sort.split(":");
    query.sort = {};
    query.sort[sortParts[0]] =
      sortParts[1] === "DESC"
        ? -1
        : sortParts[1] === "ASC" || !sortParts[1]
        ? 1
        : 0;
  }
  return query;
}

async function getRequestQueryValidator(allowedSorts) {
  const requestQuery = Joi.object({
    limit: types.query.number,
    skip: types.query.number,
    sort: Joi.object().custom((sort, helpers) => {
      const sortType = Object.keys(sort);
      if (
        !allowedSorts ||
        (allowedSorts.includes(sortType[0]) && sort[sortType[0]] !== 0)
      )
        return sort;
      throw new Error("Invalid sort request query.");
    }, "Validate sort request query value with allowedSorts."),
  });
  return requestQuery;
}

async function validateRequestQuery(query, allowedSorts) {
  const options = { limit: 10, skip: 0, sort: { createdAt: 1 } };
  if (query && Object.keys(query).length !== 0) {
    query = await changeIfSortQuery(query);
    const requestQuery = await getRequestQueryValidator(allowedSorts);
    const { error, value } = requestQuery.validate(query);
    if (!error) {
      Object.keys(options).map((key) => {
        options[key] = value[key] !== undefined ? value[key] : options[key];
      });
      return options;
    }
    throw new HTTP422Error("Invalid query parameters.");
  }
  return options;
}

module.exports = { validateRequestQuery };

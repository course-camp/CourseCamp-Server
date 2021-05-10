const addPrefixToKeys = async function (object, prefix) {
  if (Object.keys(object).length !== 0) {
    object = Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        return [prefix + key, value];
      })
    );
  }
  return object;
};

module.exports = addPrefixToKeys;

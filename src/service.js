const add = async (Model, key, value, expiresAt) => {
  const doc = await Model.findOneAndUpdate(
    { _key: key },
    { _key: key, _value: value, _expiresAt: expiresAt },
    { new: true, runValidators: true, upsert: true }
  );
  return doc;
};

const remove = async (Model, key) => {
  const doc = await Model.findOneAndDelete({ _key: key });
  return doc;
};

const exists = async (Model, key) => {
  const doc = await Model.findOne({ _key: key });
  return Boolean(doc && Object.keys(doc) !== 0);
};

const get = async (Model, key) => {
  const doc = await Model.findOne({ _key: key });
  return doc;
};

module.exports = {
  add,
  remove,
  exists,
  get,
};

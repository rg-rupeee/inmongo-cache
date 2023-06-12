const add = async (Model, key, value, expiresAt) => {
  const doc = Model.findOneAndUpdate(
    { _key: key },
    { _key: key, _value: value, _expiresAt: expiresAt },
    { new: true, runValidators: true, upsert: true }
  );
  return doc;
};

const remove = async (Model, key) => {
  const doc = Model.findOneAndDelete({ _key: key });
  return doc;
};

const exists = async (Model, key) => {
  const doc = Model.findOne({ _key: key });
  return doc && Object.keys(doc) !== 0;
};

module.exports = {
  add,
  remove,
  exists,
};

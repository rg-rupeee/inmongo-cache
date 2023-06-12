const mongoose = require('mongoose');
const schema = require('./schema');

const Model = mongoose.model(schema, 'Cache');

const add = async (key, value, expiresAt) => {
  const doc = Model.findOneAndUpdate(
    { _key: key },
    { _key: key, _value: value, _expiresAt: expiresAt },
    { new: true, runValidators: true, upsert: true }
  );
  return doc;
};

const remove = async (key) => {
  const doc = Model.findOneAndDelete({ _key: key });
  return doc;
};

const exists = async (key) => {
  const doc = Model.findOne({ _key: key });
  return doc && Object.keys(doc) !== 0;
};

module.exports = {
  add,
  remove,
  exists,
};

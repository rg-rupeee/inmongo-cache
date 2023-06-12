const mongoose = require('mongoose');

const schema = require('./schema');
const service = require('./service');

let Model;
let defaultTTL;

const initialize = (model = '_Cache', options) => {
  defaultTTL = options?.ttl || 60;

  if (options?.schemaPlugin) schema.plugin(options.schemaPlugin);

  Model = mongoose.model(schema, model);
  return Model;
};

const add = async (key, value, ttl = defaultTTL) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  const expiresAt = '';
  return await service.add(Model, key, value, expiresAt);
};

const remove = async (key) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  return await service.remove(Model, key);
};

const exists = async (key) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  return await service.exists(Model, key);
};

export default initialize;
module.exports = {
  initialize,
  add,
  remove,
  exists,
};

const schema = require('./schema');
const service = require('./service');

let Model;
let defaultTTL;

const initialize = (mongoose, model = 'Cache', options) => {
  defaultTTL = options?.ttl || 60;

  if (options?.schemaPlugin) schema.plugin(options.schemaPlugin);

  const dbSchema = schema(mongoose);
  Model = mongoose.model(model, dbSchema);

  return Model;
};

const add = async (key, value, ttlMins = defaultTTL) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  let expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + ttlMins);

  return await service.add(Model, key, value, expiresAt);
};

const remove = async (key) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  return await service.remove(Model, key);
};

const exists = async (key) => {
  if (!Model) throw new Error('Cache Model0 needs to be initialized');

  return await service.exists(Model, key);
};

const get = async (key, options) => {
  if (!Model) throw new Error('Cache Model needs to be initialized');

  const doc = await service.get(Model, key);

  return options?.raw ? doc._value : doc;
};

module.exports = {
  default: initialize,
  initialize,
  add,
  remove,
  exists,
  get,
};

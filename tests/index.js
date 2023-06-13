const { expect } = require('chai');
const { connect, disconnect, mongoose } = require('./db');

const { initialize, add, remove, exists, get } = require('../src/index');

describe('Test Cases for inmongo-cache package', async () => {
  before(async () => {
    await connect();
  });

  after(async () => {
    await disconnect();
  });

  it('add: should throw error if model is not initialized', async () => {
    let error;
    try {
      await add('rupesh', 'value');
    } catch (err) {
      error = err;
    }
    expect(error.toString()).to.equal(
      'Error: Cache Model needs to be initialized'
    );
  });

  it('remove: should throw error if model is not initialized', async () => {
    let error;
    try {
      await remove('rupesh');
    } catch (err) {
      error = err;
    }
    expect(error.toString()).to.equal(
      'Error: Cache Model needs to be initialized'
    );
  });

  it('exists: should throw error if model is not initialized', async () => {
    let error;
    try {
      await exists('rupesh');
    } catch (err) {
      error = err;
    }
    expect(error.toString()).to.equal(
      'Error: Cache Model needs to be initialized'
    );
  });

  it('get: should throw error if model is not initialized', async () => {
    let error;
    try {
      await get('rupesh');
    } catch (err) {
      error = err;
    }
    expect(error.toString()).to.equal(
      'Error: Cache Model needs to be initialized'
    );
  });

  it('initialize : should initialize mongoose connection', async () => {
    const model = await initialize(mongoose);
    expect(model).to.not.equal(null);
  });

  it('add: should add data', async () => {
    const res = await add('rupesh', 'garhwal', 10);
    expect(res._key).to.equal('rupesh');
    expect(res._value).to.equal('garhwal');
  });

  it('exists: should return true if key exists', async () => {
    const res = await exists('rupesh');
    expect(res).to.equal(true);
  });

  it('exists: should return false if key does not exists', async () => {
    const res = await exists('garhwal');
    expect(res).to.equal(false);
  });

  it('get: should return data', async () => {
    const res = await get('rupesh');
    expect(res._key).to.equal('rupesh');
  });

  it('get: should return raw data', async () => {
    const res = await get('rupesh', { raw: true });
    expect(res._key).to.equal(undefined);
  });

  it('delete: should delete doc with key', async () => {
    expect(await exists('rupesh')).to.equal(true);
    const res = await remove('rupesh');
    expect(res._key).to.equal('rupesh');
    expect(await exists('rupesh')).to.equal(false);
  });
});

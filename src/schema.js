const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    _key: {
      type: String,
      required: true,
      unique: true,
    },
    _value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    _expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ key: 1 });
schema.index({ _expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = schema;

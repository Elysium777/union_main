const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const UnionSchema = new mongoose.Schema({
  proxyAddress: {
    type: String,
    required: true,
  },

  chainId: {
    type: String,
    required: true,
  },

  members: {
    type: Array,
    required: true,
  },
});

const Union = mongoose.model("Union", UnionSchema);

module.exports = Union;

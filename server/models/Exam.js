const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const examSchema = new Schema(
  {
    examBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = examSchema;

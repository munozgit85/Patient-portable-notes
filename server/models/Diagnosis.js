const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const diagnosisSchema = new Schema(
  {
    diagnosisBody: {
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

module.exports = diagnosisSchema;

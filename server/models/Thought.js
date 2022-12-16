const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");
const examSchema = require("./Exam");
const diagnosisSchema = require("./Diagnosis");
const dispositionSchema = require("./Disposition");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Patient Name required!",
      minlength: 1,
    },
    thoughtTextA: {
      type: String,
      required: "Patient DOB required!",
      minlength: 1,
    },
    thoughtTextB: {
      type: String,
      required: "Patient MRN required!",
      minlength: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    exams: [examSchema],
    diagnoses: [diagnosisSchema],
    dispositions: [dispositionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

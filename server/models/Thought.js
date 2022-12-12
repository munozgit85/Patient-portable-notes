const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Patient Name required!",
      minlength: 1,
      maxlength: 280,
    },
    thoughtTextA: {
      type: Number,
      required: "Patient DOB required!",
      minlength: 1,
      maxlength: 280,
    },
    thoughtTextB: {
      type: Number,
      required: "Patient MRN required!",
      minlength: 1,
      maxlength: 280,
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
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

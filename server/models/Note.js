const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // reference to User model
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

noteSchema.plugin(AutoIncrement, {
  // auto increment ticket number
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500, // start with 500
});

module.exports = mongoose.model("Note", noteSchema);

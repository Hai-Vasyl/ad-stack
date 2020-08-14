const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  announcement: { type: Types.ObjectId, ref: "Announcement", required: true },
  question: { type: Types.ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
})

module.exports = model("Answer", schema)

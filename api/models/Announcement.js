const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  tag: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  price: { type: Number },
})

module.exports = model("Announcement", schema)

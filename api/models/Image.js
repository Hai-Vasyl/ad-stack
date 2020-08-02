const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  path: { type: String, required: true },
  announcement: { type: Types.ObjectId, ref: "Announcement", required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  statusPreview: { type: Boolean, required: true, default: false },
})

module.exports = model("Image", schema)

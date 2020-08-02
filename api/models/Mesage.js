const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  receiver: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  message: { type: String, required: true },
})

module.exports = model("Message", schema)

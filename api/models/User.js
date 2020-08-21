const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default: "/avatars\\34576358234-avatar.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  status: { type: String, default: "" },
  address: { type: String, default: "" },
  brief: { type: String, default: "" },
  typeUser: { type: String, required: true, default: "user" },
  date: { type: Date, required: true },
  bookmarks: [{ type: Types.ObjectId, ref: "Announcement" }],
  contacts: { type: String, default: "" },
})

module.exports = model("User", schema)

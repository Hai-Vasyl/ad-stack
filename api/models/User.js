const { Schema, model } = require("mongoose")

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default: "https://amp.spark.ru/public/img/user_ava_big.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  status: { type: String, default: "" },
  address: { type: String, default: "" },
  brief: { type: String, default: "" },
  typeUser: { type: String, required: true, default: "user" },
  date: { type: Date, required: true },
})

module.exports = model("User", schema)

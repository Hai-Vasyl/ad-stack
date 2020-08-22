const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

require("dotenv").config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.ATLAS_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB started successfully!")
    )
    app.use("/uploads", express.static("uploads"))
    app.use("/avatars", express.static("avatars"))
    app.use("/auth", require("./api/routes/users"))
    app.use("/message", require("./api/routes/messages"))
    app.use("/announcement", require("./api/routes/announcements"))

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"))
    }

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
  }
}

startServer()

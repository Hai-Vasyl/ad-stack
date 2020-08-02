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
    app.use("/auth", require("./api/routes/users"))
    app.use("/announcement", require("./api/routes/announcements"))

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
  }
}

startServer()
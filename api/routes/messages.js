const { Router } = require("express")
const auth = require("../middlewares/auth.middleware")
const { message_create, message_get } = require("../controllers/messages")

const router = Router()

router.post("/create-message", auth, message_create)

router.post("/get-messages", message_get)

module.exports = router

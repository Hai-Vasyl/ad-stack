const { Router } = require("express")
const auth = require("../middlewares/auth.middleware")
const {
  message_create,
  message_get,
  message_delele,
} = require("../controllers/messages")

const router = Router()

router.post("/create-message", auth, message_create)

router.post("/get-messages", message_get)

router.delete("/delete-message/:msgId", auth, message_delele)

module.exports = router

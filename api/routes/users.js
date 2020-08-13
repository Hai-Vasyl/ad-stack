const { Router } = require("express")
const { check } = require("express-validator")
const { user_login, user_register, users_get } = require("../controllers/users")
const auth = require("../middlewares/auth.middleware")

const router = Router()

router.post(
  "/register",
  [
    check(
      "username",
      "Username must contain at least 4 - 15 characters!"
    ).isLength({ min: 4, max: 15 }),
    check("email", "Email is not correct!").isEmail(),
    check("password", "Password must contain at least 4 characters!").isLength({
      min: 4,
    }),
  ],
  user_register
)

router.post(
  "/login",
  [
    check("email", "Email is not correct!").isEmail(),
    check("password", "Password is not correct!").isLength({ min: 4 }),
  ],
  user_login
)

router.get("/get-users", auth, users_get)

module.exports = router

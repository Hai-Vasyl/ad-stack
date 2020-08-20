const { Router } = require("express")
const { check } = require("express-validator")
const {
  user_login,
  user_register,
  users_get,
  user_delete,
  user_bookmarks_modify,
  user_bookmarks_get,
  user_update,
} = require("../controllers/users")
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

router.delete("/delete-user", auth, user_delete)

router.post("/create-bookmark", auth, user_bookmarks_modify)

router.delete("/delete-bookmark", auth, user_bookmarks_modify)

router.get("/get-bookmarks", auth, user_bookmarks_get)

router.post(
  "/update-user",
  auth,
  [
    check(
      "username",
      "Username must contain at least 4 - 15 characters!"
    ).isLength({ min: 4, max: 15 }),
    check("email", "Email is not correct!").isEmail(),
  ],
  user_update
)

module.exports = router

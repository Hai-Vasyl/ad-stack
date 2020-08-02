const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { validationResult } = require("express-validator")
require("dotenv").config()

exports.user_login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        errors: [
          { param: "email", msg: "User with this email is not exists!" },
        ],
      })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res
        .status(400)
        .json({ errors: [{ param: "password", msg: "Password is wrong!" }] })
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)
    res.json({ token, user })
  } catch (error) {
    res.status(500).json(`Register error: ${error.message}`)
  }
}

exports.user_register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { username, email, password, typeUser } = req.body

    const userByUsername = await User.findOne({ username })
    const userByEmail = await User.findOne({ email })
    if (userByUsername && userByEmail) {
      return res.status(400).json({
        errors: [
          { param: "username", msg: "Username must be unique!" },
          { param: "email", msg: "Email must be unique!" },
        ],
      })
    } else if (userByUsername || userByEmail) {
      if (userByUsername) {
        return res.status(400).json({
          errors: [
            {
              param: "username",
              msg: "User with this username is already exists!",
            },
          ],
        })
      } else {
        return res.status(400).json({
          errors: [
            {
              param: "email",
              msg: "User with this email is already exists!",
            },
          ],
        })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      typeUser,
      date: new Date(),
    })
    const newUser = await user.save()

    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET)
    res.json({ token, user: newUser })
  } catch (error) {
    res.status(500).json(`Register error: ${error.message}`)
  }
}

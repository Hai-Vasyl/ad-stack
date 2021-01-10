const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Quastion = require("../models/Question")
const Answer = require("../models/Answer")
const { validationResult } = require("express-validator")
require("dotenv").config()
const Announcement = require("../models/Announcement")
const Image = require("../models/Image")
const fs = require("fs")
const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
const { AWS_ID, AWS_SECRET, AWS_BUCKET } = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

const deleteImage = async (image) => {
  let imgKey = image.split("/")
  imgKey = imgKey[imgKey.length - 1]
  await s3
    .deleteObject({
      Key: imgKey,
      Bucket: AWS_BUCKET,
    })
    .promise()
}

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

exports.users_get = async (req, res) => {
  try {
    const users = await User.find().select("username typeUser ava")

    res.json(users)
  } catch (error) {
    res.status(500).json(`Error getting all users: ${error.message}`)
  }
}

exports.user_delete = async (req, res) => {
  try {
    const { userId } = req.body

    const images = await Image.find({ owner: userId })
    const user = await User.findById(userId)

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        await deleteImage(images[i].path)
      }
      await Image.deleteMany({ owner: userId })
    }
    if (
      user.ava !==
      "https://ad-stack-bucket.s3-eu-west-1.amazonaws.com/avatar.png"
    ) {
      await deleteImage(user.ava)
    }

    await Answer.deleteMany({ owner: userId })
    await Quastion.deleteMany({ owner: userId })
    await Announcement.deleteMany({ owner: userId })
    await User.findByIdAndDelete(userId)

    res.json("User successfully deleted!")
  } catch (error) {
    res.status(500).json(`Error getting all users: ${error.message}`)
  }
}

exports.user_bookmarks_modify = async (req, res) => {
  try {
    const { userId } = req
    const { announcement, isCreate } = req.body

    if (isCreate) {
      const user = await User.findById(userId)
      user.bookmarks.push(announcement)
      await user.save()

      return res.json("Bookmark created successfully!")
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { bookmarks: announcement },
    })

    res.json("Bookmark deleted successfully!")
  } catch (error) {
    res.status(500).json(`Error modify bookmarks: ${error.message}`)
  }
}

exports.user_bookmarks_get = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)
      .select("bookmarks")
      .populate({
        path: "bookmarks",
        select: "title tag price owner image",
        populate: { path: "owner", select: "ava username typeUser" },
      })

    let { bookmarks } = user
    for (let i = 0; i < bookmarks.length; i++) {
      const image = await Image.findOne({
        announcement: bookmarks[i]._id,
        statusPreview: true,
      }).select("path")

      bookmarks[i] = { ...bookmarks[i]._doc, image: image && image.path }
    }
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json(`Error modify bookmarks: ${error.message}`)
  }
}

exports.user_update = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { userId } = req
    const { username, email } = req.body

    const userByUsername = await User.findOne({
      _id: { $ne: userId },
      username,
    })
    const userByEmail = await User.findOne({ _id: { $ne: userId }, email })
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

    await User.updateOne({ _id: userId }, { ...req.body, date: new Date() })
    const user = await User.findById(userId)

    res.json(user)
  } catch (error) {
    res.status(500).json(`Error updating user: ${error.message}`)
  }
}

exports.user_image_update = async (req, res) => {
  try {
    const { userId, file } = req
    const user = await User.findById(userId)

    if (
      user.ava !==
      "https://ad-stack-bucket.s3-eu-west-1.amazonaws.com/avatar.png"
    ) {
      await deleteImage(user.ava)
    }
    const uploaded = await s3
      .upload({
        ACL: "public-read",
        Bucket: AWS_BUCKET,
        Key: `${uuidv4()}.${file.originalname}`,
        Body: file.buffer,
        Conditions: [{ acl: "public-read" }],
      })
      .promise()

    await User.updateOne({ _id: userId }, { ava: uploaded.Location })

    res.json(uploaded.Location)
  } catch (error) {
    res.status(500).json(`Error updating user image: ${error.message}`)
  }
}

exports.user_get = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).select(
      "username email ava firstname lastname phone address brief typeUser contacts"
    )
    res.json(user)
  } catch (error) {
    res.status(500).json(`Error getting user: ${error.message}`)
  }
}

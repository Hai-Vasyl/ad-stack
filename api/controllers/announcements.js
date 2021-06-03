const Announcement = require("../models/Announcement")
const Image = require("../models/Image")
const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
require("dotenv").config({ path: "../../.env" })

const { AWS_ID, AWS_SECRET, AWS_BUCKET } = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

const deleteImages = async (images, announId) => {
  try {
    for (let i = 0; i < images.length; i++) {
      let imgKey = images[i].path.split("/")
      imgKey = imgKey[imgKey.length - 1]
      await s3
        .deleteObject({
          Key: imgKey,
          Bucket: AWS_BUCKET,
        })
        .promise()
    }

    await Image.deleteMany({ announcement: announId })
  } catch (error) {
    res.status(400).json(`Error deleting images: ${error.message}`)
  }
}

exports.announcement_create_edit = async (req, res) => {
  try {
    const { title, description, tag, price, indexPreviewImage } = req.body
    const { files, userId } = req
    const { announId } = req.params

    const createImages = async (adId) => {
      try {
        for (let i = 0; i < files.length; i++) {
          const uploaded = await s3
            .upload({
              ACL: "public-read",
              Bucket: AWS_BUCKET,
              Key: `${uuidv4()}.${files[i].originalname}`,
              Body: files[i].buffer,
              Conditions: [{ acl: "public-read" }],
            })
            .promise()

          const image = new Image({
            path: uploaded.Location,
            announcement: adId,
            owner: userId,
            statusPreview: i === Number.parseInt(indexPreviewImage),
          })
          await image.save()
        }
      } catch (error) {
        res.status(400).json(`Error creating images: ${error.message}`)
      }
    }

    if (announId) {
      await Announcement.updateOne(
        { _id: announId },
        { title, description, tag, price, date: new Date() }
      )
      if (files.length) {
        const images = await Image.find({ announcement: announId })
        if (images.length) {
          await deleteImages(images, announId)
        }

        await createImages(announId)
      }

      res.status(201).json({ id: announId })
    } else {
      const advert = new Announcement({
        title,
        description,
        tag,
        price,
        date: new Date(),
        owner: userId,
      })
      const advertNew = await advert.save()

      if (files.length) {
        await createImages(advertNew._id)
      }

      res.status(201).json({ id: advertNew._id })
    }
  } catch (error) {
    res.json(`Error creating or edittin announcement: ${error.message}`)
  }
}

exports.announcement_get = async (req, res) => {
  try {
    const { announId } = req.params
    const advert = await Announcement.findById(announId).populate({
      path: "owner",
      select: "username ava typeUser",
    })
    const images = await Image.find({ announcement: advert._id })

    res.json({ ...advert._doc, images })
  } catch (error) {
    res.json(`Error getting all announcements: ${error.message}`)
  }
}

exports.announcementEdit_get = async (req, res) => {
  try {
    const { announId } = req.params
    const advert = await Announcement.findById(announId)

    res.json(advert)
  } catch (error) {
    res.json(`Error getting all announcements: ${error.message}`)
  }
}

exports.announcements_get = async (req, res) => {
  try {
    const { tagName } = req.params
    const { searchText } = req.body

    const query = tagName
      ? { tag: tagName }
      : {
          // title: { $regex: new RegExp(searchText, "g") },
          $text: { $search: searchText },
        }

    let adverts = await Announcement.find(query)
      .select("price title date")
      .sort({ date: -1 })

    for (let i = 0; i < adverts.length; i++) {
      const image = await Image.findOne({
        announcement: adverts[i]._id,
        statusPreview: true,
      }).select("path")
      adverts[i] = { ...adverts[i]._doc, image }
    }

    res.json(adverts)
  } catch (error) {
    res.json(`Error getting all announcements: ${error.message}`)
  }
}

exports.announcement_delete = async (req, res) => {
  try {
    const { announId } = req.params

    const images = await Image.find({ announcement: announId })

    if (images.length) {
      await deleteImages(images, announId)
    }

    await Announcement.findByIdAndDelete(announId)

    res.json("Announcement successfully deleted!")
  } catch (error) {
    res.json(`Error deleting announcement: ${error.message}`)
  }
}

exports.announcementsUser_get = async (req, res) => {
  try {
    const { userId } = req.params

    let adverts = await Announcement.find({ owner: userId }).select(
      "date price tag title"
    )

    for (let i = 0; i < adverts.length; i++) {
      const image = await Image.findOne({
        announcement: adverts[i]._id,
        statusPreview: true,
      }).select("path")

      adverts[i] = { ...adverts[i]._doc, image: image && image.path }
    }

    res.json(adverts)
  } catch (error) {
    res.json(`Error getting user announcements: ${error.message}`)
  }
}

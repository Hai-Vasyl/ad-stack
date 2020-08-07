const { Router } = require("express")
const Announcement = require("../models/Announcement")
const Image = require("../models/Image")
const auth = require("../middlewares/auth.middleware")
const multer = require("multer")
const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage })

router.post(
  "/create-announcement",
  auth,
  upload.array("imagesAnnouncements", 5),
  async (req, res) => {
    try {
      const { title, description, tag, price, indexPreviewImage } = req.body
      const { files, userId } = req

      const advert = new Announcement({
        title,
        description,
        tag,
        price,
        date: new Date(),
        owner: userId,
      })
      const advertNew = await advert.save()

      if (files) {
        for (const img of files) {
          const image = new Image({
            path: `/${img.path}`,
            announcement: advertNew._id,
            owner: userId,
            statusPreview:
              files.indexOf(img) === Number.parseInt(indexPreviewImage) && true,
          })
          await image.save()
        }
      }

      res.status(201).json("Announcement successfully created!")
    } catch (error) {
      res.json(`Error creating announcement: ${error.message}`)
    }
  }
)

router.get("/get-announcements/:tagName", async (req, res) => {
  try {
    let adverts = await Announcement.find({ tag: req.params.tagName }).select(
      "price title date"
    )

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
})

module.exports = router

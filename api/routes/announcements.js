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

module.exports = router

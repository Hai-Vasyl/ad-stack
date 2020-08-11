const { Router } = require("express")
const multer = require("multer")
const auth = require("../middlewares/auth.middleware")
const {
  announcement_create_edit,
  announcement_get,
  announcementEdit_get,
  announcementsTagName_get,
  announcement_delete,
} = require("../controllers/announcements")
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
  announcement_create_edit
)

router.post(
  "/edit-announcement/:announId",
  auth,
  upload.array("imagesAnnouncements", 5),
  announcement_create_edit
)

router.get("/get-announcements/:tagName", announcementsTagName_get)

router.get("/get-announcement/:announId", announcement_get)

router.get("/get-announcement_for_edit/:announId", auth, announcementEdit_get)

router.delete("/delete-announcement/:announId", auth, announcement_delete)

module.exports = router

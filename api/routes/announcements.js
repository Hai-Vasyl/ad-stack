const { Router } = require("express")
const multer = require("multer")
const auth = require("../middlewares/auth.middleware")
const {
  announcement_create_edit,
  announcement_get,
  announcementEdit_get,
  announcement_delete,
  announcements_get,
  announcementsUser_get,
} = require("../controllers/announcements")
const router = Router()

const storage = multer.memoryStorage()
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

router.get("/get-announcements/:tagName", announcements_get)

router.post("/search-announcements", announcements_get)

router.get("/get-announcement/:announId", announcement_get)

router.get("/get-announcement_for_edit/:announId", auth, announcementEdit_get)

router.get("/get-user-announcements/:userId", announcementsUser_get)

router.delete("/delete-announcement/:announId", auth, announcement_delete)

module.exports = router

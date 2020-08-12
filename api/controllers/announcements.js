const Announcement = require("../models/Announcement")
const Image = require("../models/Image")
const fs = require("fs")

exports.announcement_create_edit = async (req, res) => {
  try {
    const { title, description, tag, price, indexPreviewImage } = req.body
    const { files, userId } = req
    const { announId } = req.params

    const createImages = async (adId) => {
      try {
        for (const img of files) {
          const image = new Image({
            path: `/${img.path}`,
            announcement: adId,
            owner: userId,
            statusPreview:
              files.indexOf(img) === Number.parseInt(indexPreviewImage) && true,
          })
          await image.save()
        }
      } catch (error) {
        res.json(`Error creating images: ${error.message}`)
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
          for (let i = 0; i < images.length; i++) {
            let path = images[i].path.split("\\").join("/")
            path = path.split("")
            path[0] = ""
            fs.unlinkSync(path.join(""))
          }

          await Image.deleteMany({ announcement: announId })
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
    res.json(`Error creating announcement: ${error.message}`)
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

    let adverts = await Announcement.find(query).select("price title date")

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
      for (let i = 0; i < images.length; i++) {
        let path = images[i].path.split("\\").join("/")
        path = path.split("")
        path[0] = ""
        fs.unlinkSync(path.join(""))
      }

      await Image.deleteMany({ announcement: announId })
    }

    await Announcement.findByIdAndDelete(announId)

    res.json("Announcement successfully deleted!")
  } catch (error) {
    res.json(`Error deleting announcement: ${error.message}`)
  }
}

import React, { useState, useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import { BsCardImage } from "react-icons/bs"
import { Link } from "react-router-dom"
import { BsChevronLeft, BsChevronRight, BsChat } from "react-icons/bs"
import { GiLightningSpanner } from "react-icons/gi"

function AnnouncementPage(props) {
  const [data, setData] = useState({ images: [] })
  const { fetchData } = useHTTP()
  const { announcementId } = props.match.params

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: `/announcement/get-announcement/${announcementId}`,
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        setData(data)
        console.log(data)
      } catch (error) {}
    }
    fetch()
  }, [announcementId, fetchData])

  const getPreviewImage = () => {
    let previewImage
    if (!data.images) {
      return
    }
    data.images.forEach((img) => {
      if (img.statusPreview) {
        previewImage = img.path
      }
    })
    return previewImage
  }

  const handleTabActive = (id) => {
    setData({
      ...data,
      images: data.images.map((img) => {
        if (img._id === id) {
          if (img.statusPreview) {
            return img
          } else {
            img.statusPreview = true
            return img
          }
        }

        img.statusPreview = false
        return img
      }),
    })
  }

  const imgTabs = data.images.map((img) => {
    return (
      <button
        key={img._id}
        className={`details-ad__tab-btn ${
          img.statusPreview && "details-ad__tab-btn--active"
        }`}
        onClick={() => handleTabActive(img._id)}
      >
        <img src={img.path} className='details-ad__tab-image' alt='imgTab' />
      </button>
    )
  })

  const handleMove = (status) => {
    for (let i = 0; i < data.images.length; i++) {
      if (data.images[i].statusPreview) {
        data.images[i].statusPreview = false

        let previewIndex = status ? i + 1 : i - 1
        if (previewIndex === -1) {
          data.images[data.images.length - 1].statusPreview = true
        } else if (previewIndex === data.images.length) {
          data.images[0].statusPreview = true
        } else {
          data.images[previewIndex].statusPreview = true
        }
        break
      }
    }

    setData({
      ...data,
      images: data.images,
    })
  }

  return (
    <div className='wrapper'>
      <div className='details-ad'>
        <div className='details-ad__container-imgs'>
          <div className='details-ad__container-preview'>
            <img
              src={getPreviewImage()}
              className='details-ad__preview-img'
              alt='PreviewImg'
            />
            <button
              className='details-ad__move-btn details-ad__right-btn'
              onClick={() => handleMove(false)}
            >
              <BsChevronRight />
            </button>
            <button
              className='details-ad__move-btn details-ad__left-btn'
              onClick={() => handleMove(true)}
            >
              <BsChevronLeft />
            </button>
          </div>
          <div className='details-ad__container-imgtabs'>{imgTabs}</div>
        </div>

        <div className='details-ad__container-info'>
          <h3 className='details-ad__title'>{data.title}</h3>
          <div className='details-ad__container-price'>
            <button className='details-ad__btn-message btn btn-primary'>
              <BsChat className='btn__icon' />
              <span className='btn__name'>Message Owner</span>
            </button>
            <div className='details-ad__price'>{data.price} &#8372;</div>
          </div>
          <div className='details-ad__description-title'>Description:</div>
          <div className='details-ad__description'>{data.description}</div>
          <div className='details-ad__extra-info'>
            <div className='details-ad__container-row-info'>
              <div className='details-ad__column-info'>
                <span className='details-ad__column-title'>Category:</span>
                <Link
                  to={`/categories/${data.tag}`}
                  className='details-ad__column-content btn link'
                >
                  <span className='btn__name'>{data.tag}</span>
                </Link>
              </div>
              <div className='details-ad__column-info'>
                <span className='details-ad__column-title'>Created:</span>
                <span className='details-ad__column-content'>
                  {data.date && data.date.slice(0, 10)}
                </span>
              </div>
            </div>
            <div className='details-ad__container-row-user'>
              <Link
                to={`/user/${data.owner && data.owner._id}`}
                className='details-ad__container-ava'
              >
                <img
                  src={data.owner && data.owner.ava}
                  alt='userImg'
                  className='details-ad__ava'
                />
              </Link>
              <div className='details-ad__container-user-info'>
                <Link
                  to={`/user/${data.owner && data.owner._id}`}
                  className='details-ad__username'
                >
                  {data.owner && data.owner.username}
                </Link>
                <span className='details-ad__typeUser'>
                  {data.owner && data.owner.typeUser}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementPage

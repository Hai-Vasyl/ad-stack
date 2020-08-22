import React, { useState, useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import useTags from "../hooks/useTags"
import { Link } from "react-router-dom"
import { AiOutlinePicLeft } from "react-icons/ai"
import {
  BsChevronLeft,
  BsChevronRight,
  BsChat,
  BsCardImage,
  BsGear,
  BsArrowRight,
  BsBookmarkCheck,
  BsBookmarkPlus,
} from "react-icons/bs"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import Questions from "../components/Questions"
import {
  addBookmark,
  removeBookmark,
} from "../redux/bookmarks/bookmarksActions"
import PageLoader from "../components/PageLoader"

function AnnouncementPage(props) {
  const [data, setData] = useState({ images: [] })
  const { fetchData } = useHTTP()
  const tags = useTags()
  const [load, setLoad] = useState(true)
  const [includeBkmarks, setIncludeBkmarks] = useState(false)
  const {
    auth: { token },
    bkmarks: { bookmarks },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
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
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [announcementId, fetchData])

  useEffect(() => {
    let isInclude = false
    bookmarks.forEach((item) => {
      if (item._id === data._id) {
        isInclude = true
      }
    })

    setIncludeBkmarks(isInclude)
  }, [bookmarks, data._id])

  const getPreviewImage = () => {
    let path
    data.images.forEach((img) => {
      if (img.statusPreview) {
        path = img.path
      }
    })
    return path
  }

  const handleBookmark = async () => {
    try {
      if (includeBkmarks) {
        dispatch(removeBookmark(data._id))
      } else {
        const announcement = {
          image: getPreviewImage(),
          owner: {
            ava: data.owner.ava,
            typeUser: data.owner.typeUser,
            username: data.owner.username,
            _id: data.owner._id,
          },
          price: data.price,
          tag: data.tag,
          title: data.title,
          _id: data._id,
        }
        dispatch(addBookmark({ ...announcement }))
      }

      await fetchData({
        url: includeBkmarks ? "/auth/delete-bookmark" : "/auth/create-bookmark",
        method: includeBkmarks ? "delete" : "post",
        data: { announcement: data._id, isCreate: !includeBkmarks && true },
        options: { isLocalStorage: true },
      })
    } catch (error) {}
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

  const getTagProps = () => {
    let props
    tags.forEach((tag) => {
      if (tag.param === data.tag) {
        props = tag
      }
    })

    return props
  }

  if (load) {
    return (
      <div className='wrapper'>
        <PageLoader />
      </div>
    )
  }

  const { icon, name } = getTagProps()
  return (
    <div className='wrapper'>
      <div className='title title-simple'>
        <div className='title__container-name'>
          <AiOutlinePicLeft className='title__icon' />
          <span className='title__name'>Details</span>
        </div>
        <span className='title__description'>Details of: {data.title}</span>
      </div>
      <div className='details-ad'>
        <div className='details-ad__container-imgs'>
          <div className='details-ad__container-preview'>
            {data.images.length ? (
              <>
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
              </>
            ) : (
              <div className='announc__plug-image'>
                <BsCardImage className='announc__plug-icon' />
                <span className='announc__plug-name'>No Images</span>
              </div>
            )}
          </div>
          <div className='details-ad__imgtabs'>
            <div className='details-ad__container-imgtabs'>{imgTabs}</div>
          </div>
        </div>

        <div className='details-ad__container-info'>
          {token.token &&
            (token.user.typeUser === data.owner.typeUser ? (
              <Link
                className='details-ad__btn-edit link'
                to={`/edit/${data._id}`}
              >
                <BsGear />
              </Link>
            ) : (
              <button
                className={`details-ad__btn-edit link ${
                  includeBkmarks && "details-ad__bookmark"
                }`}
                onClick={handleBookmark}
              >
                {includeBkmarks ? <BsBookmarkCheck /> : <BsBookmarkPlus />}
              </button>
            ))}
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
                  className='details-ad__link btn link'
                >
                  {icon}
                  <span className='btn__name'>{name}</span>
                </Link>
              </div>
              <div className='details-ad__column-info'>
                <span className='details-ad__column-title'>Last updated:</span>
                <span className='details-ad__column-content details-ad__date'>
                  {data.date.slice(0, 10)}
                </span>
              </div>
            </div>
            <div className='details-ad__container-row-user'>
              <Link
                to={`/user/${data.owner._id}`}
                className='details-ad__container-ava'
              >
                <img
                  src={data.owner.ava}
                  alt='userImg'
                  className='details-ad__ava'
                />
              </Link>
              <div className='details-ad__container-user-info'>
                <Link
                  to={`/user/${data.owner._id}`}
                  className='details-ad__username'
                >
                  {data.owner.username}
                </Link>
                <span className='details-ad__typeUser'>
                  {data.owner.typeUser === "admin" ? (
                    <RiUserSettingsLine className='details-ad__label-icon-type' />
                  ) : (
                    <RiUserLine className='details-ad__label-icon-type' />
                  )}
                  <span className='details-ad__label-user-type'>
                    {data.owner.typeUser}
                  </span>
                </span>
              </div>
              <Link
                to={`/user/${data.owner._id}`}
                className='details-ad__btn-user btn link'
              >
                <span className='btn__name'>Other announce</span>
                <BsArrowRight className='btn__icon' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Questions announcement={data._id} owner={data.owner._id} />
    </div>
  )
}

export default AnnouncementPage

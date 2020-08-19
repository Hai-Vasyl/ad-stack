import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import useHTTP from "../hooks/useHTTP"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { FiPhoneCall, FiMail } from "react-icons/fi"
import {
  BsBookmarks,
  BsCollection,
  BsGear,
  BsAt,
  BsCardImage,
  BsTools,
} from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import useTags from "../hooks/useTags"

function UserPage() {
  const {
    token: { user },
  } = useSelector((state) => state.auth)
  const [announcements, setAnnouncements] = useState([])
  const { fetchData } = useHTTP()
  const [load, setLoad] = useState(true)
  const [statusPage, setStatusPage] = useState(0)
  const tags = useTags()
  const [btnTabs, setBtnTabs] = useState([
    { name: "Announcements", icon: <BsCollection className='btn__icon' /> },
    { name: "Contacts", icon: <FiPhoneCall className='btn__icon' /> },
    { name: "Settings", icon: <BsTools className='btn__icon' /> },
  ])

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/announcement/get-user-announcements",
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        console.log(data)
        setAnnouncements(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData])

  const getTagProps = (announce) => {
    let tagProps
    tags.forEach((tag) => {
      if (tag.param === announce.tag) {
        tagProps = tag
      }
    })
    return tagProps
  }

  const getStatus = (id) => {
    if (id === statusPage) {
      return true
    }
    return false
  }

  const handleTab = (id) => {
    setStatusPage(id)
  }

  const announcementsJSX = announcements.map((item) => {
    const { icon, name } = getTagProps(item)
    return (
      <div className='announc-item' key={item._id}>
        <Link className='announc-item__image-side' to={`/details/${item._id}`}>
          {item.image ? (
            <img
              src={item.image}
              className='announc-item__image'
              alt='AnnounceImg'
            />
          ) : (
            <div className='announc-item__plug bookmark__plug-image'>
              <BsCardImage className='announc-item__plug-icon bookmark__plug-icon' />
              <span className='announc-item__plug-name bookmark__plug-name'>
                No Images
              </span>
            </div>
          )}
          <span className='announc-item__date'>{item.date.slice(0, 10)}</span>
        </Link>

        <div className='announc-item__content-side'>
          <Link className='announc-item__title' to={`/details/${item._id}`}>
            {item.title}
          </Link>
          <div className='bookmark__container-category'>
            Category:
            <Link
              className='bookmark__category btn link'
              to={`/categories/${item.tag}`}
            >
              {icon}
              <span className='btn__name'>{name}</span>
            </Link>
          </div>
          <div className='announc-item__price'>
            {item.price}
            <span className='bookmark__grivna-sign'>&#8372;</span>
          </div>
        </div>
        <Link
          className='announc-item__btn-edit btn link'
          to={`/edit/${item._id}`}
        >
          <BsGear />
        </Link>
      </div>
    )
  })

  const btnTabsJSX = btnTabs.map((btn, index) => {
    return (
      <button
        key={btn.name}
        className={`user__btntab btn ${
          getStatus(index) && "user__btntab--active"
        }`}
        onClick={() => handleTab(index)}
      >
        {btn.icon}
        <span className='btn__name'>{btn.name}</span>
      </button>
    )
  })

  if (load) {
    return <div className='wrapper'>LOADING....</div>
  }

  return (
    <div className='wrapper'>
      {console.log(user)}
      <div className='title title-simple'>
        <div className='title__container-name'>
          <AiOutlineUser />
          <span className='title__name'>Profile</span>
        </div>
        <span className='title__description'>Your personal cabinet</span>
      </div>
      <div className='user'>
        <div className='user__image-side'>
          <div className='user__brief'>
            <button className='user__btn-edit-img'>
              <img src={user.ava} className='user__image' alt='userAva' />
            </button>
            {user.typeUser === "admin" ? (
              <RiUserSettingsLine className='user__type-icon' />
            ) : (
              <RiUserLine className='user__type-icon' />
            )}
          </div>
          <h3 className='user__username'>{user.username}</h3>
          <div className='user__fullname'>
            ({user.lastname ? user.lastname : "Lastname"}{" "}
            {user.firstname ? user.firstname : "Firstname"})
          </div>
          <div className='user__brief-info'>
            {user.brief ? (
              user.brief
            ) : (
              <span>
                Type something about yourself, about your profession..{" "}
                <button
                  className='user__link-edit'
                  onClick={() => handleTab(2)}
                >
                  Edit info
                </button>
              </span>
            )}
          </div>
          <div className='user__container-email'>
            <FiMail />
            <span className='user__email'>{user.email}</span>
          </div>
          <Link to='/bookmarks' className='user__btn-bookmarks btn btn-primary'>
            <BsBookmarks className='btn__icon' />
            <span className='btn__name'>Bookmarks</span>
          </Link>
        </div>

        <div className='user__content-side'>
          <div className='user__container-btntabs'>{btnTabsJSX}</div>
          <div className='user__pagetabs'>
            <div
              className={`user__tabpage ${
                getStatus(0) && "user__tabpage--open"
              }`}
            >
              {announcementsJSX}
            </div>
            <div
              className={`user__tabpage ${
                getStatus(1) && "user__tabpage--open"
              }`}
            >
              Page Contacts
            </div>
            <div
              className={`user__tabpage ${
                getStatus(2) && "user__tabpage--open"
              }`}
            >
              Page Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage

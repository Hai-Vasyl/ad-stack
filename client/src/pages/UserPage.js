import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import useHTTP from "../hooks/useHTTP"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { FiPhoneCall, FiMail } from "react-icons/fi"
import PageLoader from "../components/PageLoader"
import {
  BsBookmarks,
  BsCollection,
  BsGear,
  BsCardImage,
  BsTools,
  BsX,
  BsCheck,
  BsInfoCircle,
  BsUpload,
} from "react-icons/bs"
import useTags from "../hooks/useTags"
import {
  updateStart,
  updateSuccess,
  updateFailure,
  setError,
  clearSpecificError,
  clearErrors,
  updateAvatar,
} from "../redux/auth/authActions"
import { togglePopupImage, resetNavbar } from "../redux/navbar/navbarActions"

function UserPage(props) {
  let {
    auth: {
      error,
      load: formLoad,
      token: { user },
    },
    navbar: { popupImage },
  } = useSelector((state) => state)

  const { userId } = props.match.params
  const dispatch = useDispatch()
  const [announcements, setAnnouncements] = useState([])
  const { fetchData } = useHTTP()
  const [load, setLoad] = useState(true)
  const [statusPage, setStatusPage] = useState(0)
  const [reset, setReset] = useState(false)
  const [userOther, setUserOther] = useState({})
  const tags = useTags()

  const initialForm = [
    { param: "username", name: "Username", value: user ? user.username : "" },
    { param: "email", name: "Email", value: user ? user.email : "" },
    {
      param: "firstname",
      name: "Firstname",
      value: user ? user.firstname : "",
    },
    { param: "lastname", name: "Lastname", value: user ? user.lastname : "" },
    { param: "address", name: "Address", value: user ? user.address : "" },
    { param: "phone", name: "Phone", value: user ? user.phone : "" },
    {
      param: "brief",
      name: "Bio",
      value: user ? user.brief : "",
      placeholder: "Type something about yourself, about your profession",
    },
    {
      param: "contacts",
      name: "Other contacts",
      value: user ? user.contacts : "",
      placeholder:
        "Here you can add extra contacts or write how other can get in touch with you",
    },
  ]

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    setReset(false)
  }, [user])

  useEffect(() => {
    const fetch = async () => {
      try {
        if (userId) {
          const userData = await fetchData({
            url: `/auth/get-user/${userId}`,
            method: "get",
            data: null,
            options: { isLocalStorage: true },
          })
          setUserOther(userData)
        }
        const announceData = await fetchData({
          url: `/announcement/get-user-announcements/${
            userId ? userId : user._id
          }`,
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        setAnnouncements(announceData)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData, user, userId])

  const handleChangeFile = (e) => {
    const ava = e.target.files[0]
    if (!ava) {
      return
    }
    let data = new FormData()
    data.append("avatar", ava, ava.name)

    dispatch(
      fetchData({
        url: "/auth/update-user-image",
        method: "post",
        data,
        options: { fetchSuccess: updateAvatar },
      })
    )
  }

  const handleChange = (e) => {
    if (!reset) {
      setReset(true)
    }
    setForm(
      form.map((item) => {
        if (item.param === e.target.name) {
          item.value = e.target.value
          dispatch(clearSpecificError(item))
        }
        return item
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!reset) {
      return
    }

    let isError = false
    form.forEach((item) => {
      if (
        (item.param === "username" || item.param === "email") &&
        !item.value
      ) {
        dispatch(setError(item))
        isError = true
      }
    })
    if (isError) {
      return
    }

    let data = {}
    form.forEach((elem) => {
      data[elem.param] = elem.value
    })

    dispatch(
      fetchData({
        url: "/auth/update-user",
        method: "post",
        data,
        options: {
          fetchStart: updateStart,
          fetchSuccess: updateSuccess,
          fetchFailure: updateFailure,
        },
      })
    )
  }

  const getMsg = (item) => {
    let msg = ""
    error.forEach((err) => {
      if (item.param === err.param) {
        msg = err.msg
      }
    })
    return msg
  }

  const handleReset = () => {
    setForm(initialForm)
    setReset(false)
    dispatch(clearErrors())
  }

  const fields = form.map((item) => {
    const msg = getMsg(item)
    if (item.param === "brief" || item.param === "contacts") {
      return (
        <label key={item.param} className='field field-custom-height'>
          <div className='field__container-info'>
            <span className='field__name'>{item.name}:</span>
          </div>
          <textarea
            className='field__textarea field__textarea-short'
            name={item.param}
            value={item.value}
            onChange={handleChange}
            placeholder={item.placeholder}
          ></textarea>
        </label>
      )
    }
    return (
      <label key={item.param} className='field'>
        <div className='field__container-info'>
          <span
            className={`field__name ${
              (item.param === "username" || item.param === "email") &&
              "field__important"
            }`}
          >
            {item.name}:
          </span>
          <div
            className={`field__container-msg ${
              !msg && "field__container-msg--close"
            }`}
          >
            <BsInfoCircle className='field__icon' />
            <span className='field__msg'>
              {msg}
              <span className='field__triangle'></span>
            </span>
          </div>
        </div>
        <input
          className={`field__input ${msg && "field__input--warning"}`}
          type={item.param === "email" ? "email" : "text"}
          value={item.value}
          name={item.param}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
    )
  })

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
        {!userId && (
          <Link
            className='announc-item__btn-edit btn link'
            to={`/edit/${item._id}`}
          >
            <BsGear />
          </Link>
        )}
      </div>
    )
  })

  let btnTabs = [
    { name: "Announcements", icon: <BsCollection className='btn__icon' /> },
    { name: "Contacts", icon: <FiPhoneCall className='btn__icon' /> },
    { name: "Settings", icon: <BsTools className='btn__icon' /> },
  ]
  const contacts = [
    { name: "Firstname", value: userId ? userOther.firstname : user.firstname },
    { name: "Lastname", value: userId ? userOther.lastname : user.lastname },
    { name: "Email", value: userId ? userOther.email : user.email },
    { name: "Phone", value: userId ? userOther.phone : user.phone },
    { name: "Address", value: userId ? userOther.address : user.address },
    {
      name: "Other contacts",
      value: userId ? userOther.contacts : user.contacts,
    },
  ]

  userId && btnTabs.pop()
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

  const contactsJSX = contacts.map((item) => {
    return (
      <div className='user__contact-name' key={item.name}>
        {item.name}:
        <span
          className={`user__contact ${
            item.name === "Other contacts" && "user__other-contact"
          }`}
        >
          {item.value ? (
            item.value
          ) : (
            <span className='user__contact-plug'>(Empty)</span>
          )}
        </span>
      </div>
    )
  })

  if (load) {
    return (
      <div className='wrapper'>
        <PageLoader />
      </div>
    )
  }

  user = userId ? userOther : user
  return (
    <div className='wrapper'>
      <div className={`popup-img ${popupImage && "popup-img--active"}`}>
        <button
          className='auth-form__btn btn'
          onClick={() => dispatch(resetNavbar())}
        >
          <BsX />
        </button>
        <div className='popup-img__container-ava'>
          <img src={user.ava} className='popup-img__ava' alt='popupImg' />
        </div>
        <span className='popup-img__username'>{user.username}</span>
      </div>
      <div className='title title-simple'>
        <div className='title__container-name'>
          <RiUserLine />
          <span className='title__name'>Profile</span>
        </div>
        <span className='title__description'>
          {userId ? "User personal cabinet" : "Your personal cabinet"}
        </span>
      </div>
      <div className='user'>
        <div className='user__image-side'>
          <div className='user__brief'>
            {userId ? (
              <button
                className='user__btn-img'
                onClick={() => dispatch(togglePopupImage())}
              >
                <img src={user.ava} className='user__image' alt='userAva' />
              </button>
            ) : (
              <label className='user__btn-img'>
                <span className='user__background-ava'>
                  <BsUpload className='user__upload-icon' />
                  <span className='user__upload-name'>Update image</span>
                </span>
                <img src={user.ava} className='user__image' alt='userAva' />
                <input
                  className='user__file-handler'
                  type='file'
                  onChange={handleChangeFile}
                />
              </label>
            )}
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
            ) : userId ? (
              <span className='user__plug-text'>
                Nothing about this user or his profession
              </span>
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
          {!userId && (
            <Link
              to='/bookmarks'
              className='user__btn-bookmarks btn btn-primary'
            >
              <BsBookmarks className='btn__icon' />
              <span className='btn__name'>Bookmarks</span>
            </Link>
          )}
        </div>

        <div className='user__content-side'>
          <div className='user__container-btntabs'>{btnTabsJSX}</div>
          <div className='user__pagetabs'>
            <div
              className={`user__tabpage ${
                getStatus(0) && "user__tabpage--open"
              }`}
            >
              {announcementsJSX.length ? (
                announcementsJSX
              ) : (
                <div className='plug-text'>No Announcements</div>
              )}
            </div>
            <div
              className={`user__tabpage ${
                getStatus(1) && "user__tabpage--open"
              }`}
            >
              <div className='user__container-contacts'>{contactsJSX}</div>
            </div>
            {!userId && (
              <div
                className={`user__tabpage ${
                  getStatus(2) && "user__tabpage--open"
                }`}
              >
                <div className='user-form'>
                  <div
                    className={`auth-form__loader ${
                      formLoad && "auth-form__loader--active"
                    }`}
                  >
                    <div className='auth-form__spinner'></div>
                  </div>
                  <form className='user-form__fields' onSubmit={handleSubmit}>
                    {fields}
                    <button className='user-form__btn-handler'></button>
                  </form>
                  <div className='user-form__container-btns'>
                    <div className='user-form__date-container'>
                      <span className='user-form__date-label'>
                        Last updated:
                      </span>
                      <span className='user-form__date'>
                        {user.date.slice(0, 10)}
                      </span>
                    </div>
                    <button
                      className={`user-form__btn-cancel btn btn-simple ${
                        reset && "user-form__btn-cancel--show"
                      }`}
                      onClick={handleReset}
                    >
                      <BsX className='btn__icon' />
                      <span className='btn__name'>Cancel</span>
                    </button>
                    <button
                      className={`user-form__btn-apply btn btn-primary ${
                        !reset && "btn-disabled"
                      }`}
                      onClick={handleSubmit}
                    >
                      <div className='btn__msg'>
                        Change some field to apply!
                        <span className='btn__triangle'></span>
                      </div>
                      <BsCheck className='btn__icon' />
                      <span className='btn__name'>Apply</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage

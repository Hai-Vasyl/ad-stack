import React, { useState, useEffect } from "react"
import { BsInfoCircle, BsFilePlus, BsUpload } from "react-icons/bs"
import { FiPlus, FiEdit } from "react-icons/fi"
import bgCreateImage from "../imgs/undraw_data_trends_b0wg.svg"
import bgEditImage from "../imgs/undraw_content_vbqo.svg"
import { AiOutlineDelete, AiOutlineWarning } from "react-icons/ai"
import useHTTP from "../hooks/useHTTP"
import { useSelector, useDispatch } from "react-redux"
import { togglePopupWarning, resetNavbar } from "../redux/navbar/navbarActions"
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa"

function ModPage(props) {
  const { fetchData } = useHTTP()
  const { announcementId } = props.match.params
  const [load, setLoad] = useState(true)
  const { popupWarning } = useSelector((state) => state.navbar)
  const dispatch = useDispatch()
  const [form, setForm] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: `/announcement/get-announcement_for_edit/${announcementId}`,
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })

        setForm((prevForm) =>
          prevForm.map((item) => {
            Object.keys(data).forEach((key) => {
              if (item.param === key) {
                item.value = data[key]
              }
            })
            return item
          })
        )
        setLoad(false)
      } catch (error) {}
    }

    setForm([
      {
        param: "title",
        name: "Title",
        value: "",
        msg: "Give some name to your announcement",
      },
      {
        param: "description",
        name: "Description",
        value: "",
        msg: "Describe what you want to expose, give some characteristics",
      },
      {
        param: "tag",
        name: "Tag name",
        value: "electronics",
        msg:
          "Tag name is the name of the category to which you want to place your announcement",
      },
      {
        param: "price",
        name: "Price",
        value: "0",
        msg:
          "The price of exhibited product or service (It is not a required attribute)",
      },
      {
        param: "imagesAnnouncements",
        name: "Images",
        value: {},
        msg:
          "Attach images of the exhibited product or images that associate this announcement",
      },
      {
        param: "indexPreviewImage",
        name: "Preview image",
        value: "0",
        msg: "Select preview image among chosen",
      },
    ])

    if (announcementId) {
      fetch()
    }
    setLoad(false)
  }, [announcementId, fetchData])

  const handleChange = (e) => {
    setForm(
      form.map((item) => {
        if (item.param === e.target.name) {
          if (item.param === "imagesAnnouncements") {
            item.value = e.target.files
          } else {
            item.value = e.target.value
          }
        }
        return item
      })
    )
  }

  const isEmptyFields = () => {
    let isEmpty = false
    form.forEach((item) => {
      if (!item.value.length) {
        if (
          item.param === "imagesAnnouncements" ||
          item.param === "indexPreviewImage" ||
          item.value === 0 ||
          item.value > 0
        ) {
          return
        }
        isEmpty = true
      }
    })
    return isEmpty
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let fd = new FormData()

      form.forEach((item) => {
        if (item.param === "imagesAnnouncements") {
          Array.prototype.forEach.call(item.value, (file) => {
            fd.append("imagesAnnouncements", file, file.name)
          })
        } else {
          fd.set(item.param, item.value)
        }
      })

      const data = await fetchData({
        url: announcementId
          ? `/announcement/edit-announcement/${announcementId}`
          : "/announcement/create-announcement",
        method: "post",
        data: fd,
        options: { isLocalStorage: true },
      })

      props.history.push(`/details/${data.id}`)
    } catch (error) {}
  }

  const handleDelete = async () => {
    dispatch(resetNavbar())
    await fetchData({
      url: `/announcement/delete-announcement/${announcementId}`,
      method: "delete",
      data: null,
      options: { isLocalStorage: true },
    })

    let tagName
    form.forEach((item) => {
      if (item.param === "tag") {
        tagName = item.value
      }
    })
    props.history.push(`/categories/${tagName}`)
  }

  const fields = form.map((item) => {
    if (item.param === "tag") {
      return (
        <div className='field field-select' key={item.param}>
          <div className='field__container-info'>
            <span className='field__name'>{item.name}</span>
            <div className='field__container-msg'>
              <BsInfoCircle className='field__icon field__info-icon' />
              <span className='field__msg field__msg-info'>
                {item.msg}
                <span className='field__triangle'></span>
              </span>
            </div>
          </div>
          <select
            className='field__select btn'
            name={item.param}
            value={item.value}
            onChange={handleChange}
          >
            <option value='transport' className='field__option'>
              Transport
            </option>
            <option value='electronics' className='field__option'>
              Electronics
            </option>
            <option value='house_garden' className='field__option'>
              House and garden
            </option>
            <option value='childrens_world' className='field__option'>
              Children's world
            </option>
            <option value='real_estate' className='field__option'>
              Real estate
            </option>
            <option value='spare_parts_for_transport' className='field__option'>
              Spare parts for transport
            </option>
            <option value='work' className='field__option'>
              Work
            </option>
            <option value='animals' className='field__option'>
              Animals
            </option>
            <option value='business_services' className='field__option'>
              Business and services
            </option>
            <option value='fashion_style' className='field__option'>
              Fashion and style
            </option>
          </select>
        </div>
      )
    } else if (item.param === "description") {
      return (
        <label key={item.param} className='field field-custom-height'>
          <div className='field__container-info'>
            <span className='field__name'>{item.name}:</span>
            <div className='field__container-msg'>
              <BsInfoCircle className='field__icon field__info-icon' />
              <span className='field__msg field__msg-info'>
                {item.msg}
                <span className='field__triangle'></span>
              </span>
            </div>
          </div>
          <textarea
            name={item.param}
            value={item.value}
            onChange={handleChange}
            className='field__textarea'
          ></textarea>
        </label>
      )
    } else if (item.param === "imagesAnnouncements") {
      return (
        <div key={item.param} className='field field-select'>
          <div className='field__container-info'>
            <span className='field__name'>{item.name}</span>
            <div className='field__container-msg'>
              <BsInfoCircle className='field__icon field__info-icon' />
              <span className='field__msg field__msg-info'>
                {item.msg}
                <span className='field__triangle'></span>
              </span>
            </div>
          </div>
          <label className='field__label-file btn'>
            <BsUpload className='btn__icon' />{" "}
            <span className='btn__name'>
              {announcementId ? "Reselect images" : "Select images"}
            </span>
            <input
              type='file'
              name={item.param}
              multiple
              onChange={handleChange}
              className='field__input-handler'
            />
          </label>
        </div>
      )
    } else if (item.param === "indexPreviewImage") {
      let images = {}
      form.forEach((item) => {
        if (item.param === "imagesAnnouncements") {
          images = item.value
        }
      })
      return (
        <div
          className={`field field-select ${
            Object.entries(images).length === 0 && "field-select--close"
          }`}
          key={item.param}
        >
          <div className='field__container-info'>
            <span className='field__name'>{item.name}</span>
            <div className='field__container-msg'>
              <BsInfoCircle className='field__icon field__info-icon' />
              <span className='field__msg field__msg-info'>
                {item.msg}
                <span className='field__triangle'></span>
              </span>
            </div>
          </div>
          <select
            className='field__select btn'
            name={item.param}
            value={item.value}
            onChange={handleChange}
          >
            {images &&
              Array.prototype.map.call(images, (file, index) => {
                return (
                  <option
                    key={file.name}
                    value={index}
                    className='field__option'
                  >
                    {file.name}
                  </option>
                )
              })}
          </select>
        </div>
      )
    }
    return (
      <label key={item.param} className='field'>
        <div className='field__container-info'>
          <span className='field__name'>{item.name}:</span>
          <div className='field__container-msg'>
            <BsInfoCircle className='field__icon field__info-icon' />
            <span className='field__msg field__msg-info'>
              {item.msg}
              <span className='field__triangle'></span>
            </span>
          </div>
        </div>
        <input
          className='field__input'
          type='text'
          value={item.value}
          name={item.param}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
    )
  })

  if (load) {
    return <div className='wrapper'>LOADING...</div>
  }

  return (
    <div className='wrapper'>
      <div className='title title-simple'>
        <div className='title__container-name'>
          {announcementId ? (
            <FiEdit className='title__icon' />
          ) : (
            <BsFilePlus className='title__icon' />
          )}
          <span className='title__name'>
            {announcementId ? "Edit" : "Create"}
          </span>
        </div>
        <span className='title__description'>
          {announcementId
            ? "Edit or delete your announcement"
            : "Create new announcement"}
        </span>
      </div>

      <div className={`popup ${popupWarning && "popup--active"}`}>
        <div className='popup__container-info'>
          <AiOutlineWarning className='popup__icon' />
          <span className='popup__title'>WARNING</span>
          <p className='popup__description'>Are you sure about that?</p>
        </div>
        <div className='popup__container-bts'>
          <button className='btn btn-warning' onClick={handleDelete}>
            <FaRegCheckCircle className='btn__icon' />
            <span className='btn__name'>Yes</span>
          </button>
          <button
            className='btn btn-simple'
            onClick={() => dispatch(resetNavbar())}
          >
            <FaRegTimesCircle className='btn__icon' />
            <span className='btn__name'>No</span>
          </button>
        </div>
      </div>

      <div className='form'>
        <div className='form__main-side'>
          <form className='form__container-fields' onSubmit={handleSubmit}>
            {fields}
            <button className='form__btn-handler'></button>
          </form>
          <div className='form__container-btns'>
            <button
              className={`btn ${
                isEmptyFields()
                  ? "btn-disabled"
                  : announcementId
                  ? "btn-warning"
                  : "btn-succcess"
              }`}
              onClick={isEmptyFields() ? () => {} : handleSubmit}
            >
              <div className='btn__msg'>
                Fill all fields!
                <span className='btn__triangle'></span>
              </div>
              {announcementId ? (
                <FiEdit className='btn__icon' />
              ) : (
                <FiPlus className='btn__icon' />
              )}
              <span className='btn__name'>
                {announcementId ? "Edit" : "Create"}
              </span>
            </button>

            {announcementId && (
              <button
                className='btn btn-danger'
                onClick={() => dispatch(togglePopupWarning())}
              >
                <AiOutlineDelete className='btn__icon' />
                <span className='btn__name'>Delete</span>
              </button>
            )}
          </div>
        </div>
        <div className='form__bg-side'>
          <img
            src={announcementId ? bgEditImage : bgCreateImage}
            alt='bgImage'
            className='form__image'
          />
        </div>
      </div>
    </div>
  )
}

export default ModPage

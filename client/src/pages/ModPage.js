import React, { useState } from "react"
import { BsInfoCircle, BsFilePlus } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"
import bgImage from "../imgs/undraw_usability_testing_2xs4.svg"
import useHTTP from "../hooks/useHTTP"

function ModPage() {
  const { fetchData } = useHTTP()
  const [form, setForm] = useState([
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
        url: "/announcement/create-announcement",
        method: "post",
        data: fd,
        options: { isLocalStorage: true },
      })
      console.log(data)
    } catch (error) {}
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
            className='field__select'
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
          <label className='field__label-file'>
            Select Images
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
            className='field__select'
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

  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          <BsFilePlus className='title__icon' />
          <span className='title__name'>Create</span>
        </div>
        <span className='title__description'>Choose what interests you</span>
      </div>

      <div className='form'>
        <div className='form__main-side'>
          <form className='form__container-fields' onSubmit={handleSubmit}>
            {fields}
            <button className='form__btn-handler'></button>
          </form>
          <div className='form__container-btns'>
            <button className='btn btn-primary' onClick={handleSubmit}>
              <FiPlus className='btn__icon' />
              <span className='btn__name'>Create</span>
            </button>
          </div>
        </div>
        <div className='form__bg-side'>
          <img src={bgImage} alt='bgImage' className='form__image' />
        </div>
      </div>
    </div>
  )
}

export default ModPage

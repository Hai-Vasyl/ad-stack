import React, { useState } from "react"
import { BsInfoCircle, BsFilePlus } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"

function ModPage() {
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
      value: null,
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

  const fields = form.map((item) => {
    if (item.param === "tag") {
      return (
        <select name={item.param} value={item.value} onChange={handleChange}>
          <option value='transport'>Transport</option>
          <option value='electronics'>Electronics</option>
          <option value='house_garden'>House and garden</option>
          <option value='childrens_world'>Children's world</option>
          <option value='real_estate'>Real estate</option>
          <option value='spare_parts_for_transport'>
            Spare parts for transport
          </option>
          <option value='work'>Work</option>
          <option value='animals'>Animals</option>
          <option value='business_services'>Business and services</option>
          <option value='fashion_style'>Fashion and style</option>
          <option value='hobbies_recreation_sports'>
            Hobbies, recreation and sports
          </option>
        </select>
      )
    } else if (item.param === "description") {
      return (
        <textarea
          cols='30'
          rows='10'
          name={item.param}
          value={item.value}
          onChange={handleChange}
        ></textarea>
      )
    } else if (item.param === "imagesAnnouncements") {
      return (
        <input type='file' name={item.param} multiple onChange={handleChange} />
      )
    } else if (item.param === "indexPreviewImage") {
      let images = []
      form.forEach((item) => {
        if (item.param === "imagesAnnouncements") {
          images = item.value
        }
      })
      return (
        <select name={item.param} value={item.value} onChange={handleChange}>
          {images &&
            Array.prototype.map.call(images, (file, index) => {
              return (
                <option key={file.name} value={index}>
                  {file.name}
                </option>
              )
            })}
        </select>
      )
    }
    return (
      <label key={item.param} className='field'>
        <div className='field__container-info'>
          <span className='field__name'>{item.name}:</span>
          <div className='field__container-msg'>
            <BsInfoCircle className='field__icon field__info-icon' />
            <span className='field__msg'>
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
          {console.log(form)}
          <BsFilePlus className='title__icon' />
          <span className='title__name'>Create</span>
        </div>
        <span className='title__description'>Create new announcement</span>
      </div>

      <div className='form'>
        <div className='form__main-side'>
          <form className='form__container-fields'>
            {fields}
            <button className='form__btn-handler'></button>
          </form>
          <div className='form__container-btns'>
            <button className='btn btn-primary'>
              <FiPlus className='btn__icon' />
              <span className='btn__name'>Create</span>
            </button>
          </div>
        </div>
        <div className='form__bg-side'></div>
      </div>
    </div>
  )
}

export default ModPage

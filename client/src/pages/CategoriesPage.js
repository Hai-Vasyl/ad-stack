import React from "react"
import { Link } from "react-router-dom"
import { AiOutlineUnorderedList } from "react-icons/ai"
import useTags from "../hooks/useTags"

function CategoriesPage() {
  const tags = useTags()
  const tagsJSX = tags.map((tag) => {
    return (
      <Link
        to={`/categories/${tag.param}`}
        key={tag.param}
        className='categories__link'
      >
        <span className='categories__name'>{tag.name}</span>
        <img src={tag.img} className='categories__image' alt='categoryImg' />
      </Link>
    )
  })
  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          <AiOutlineUnorderedList className='title__icon' />
          <span className='title__name'>Categories</span>
        </div>
        <span className='title__description'>
          Choose what you are looking for
        </span>
      </div>
      <div className='categories'>{tagsJSX}</div>
    </div>
  )
}

export default CategoriesPage

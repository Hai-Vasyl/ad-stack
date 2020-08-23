import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useTags from "../hooks/useTags"
import { BsX, BsBookmarks, BsCardImage } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { removeBookmark } from "../redux/bookmarks/bookmarksActions"
import useHTTP from "../hooks/useHTTP"

function BookmarksPage() {
  const {
    bkmarks: { bookmarks },
  } = useSelector((state) => state)
  const tags = useTags()
  const dispatch = useDispatch()
  const { fetchData } = useHTTP()

  const getTagProps = (announce) => {
    let tagProps
    tags.forEach((tag) => {
      if (tag.param === announce.tag) {
        tagProps = tag
      }
    })
    return tagProps
  }

  const handleRemove = async (announId) => {
    try {
      dispatch(removeBookmark(announId))

      await fetchData({
        url: "/auth/delete-bookmark",
        method: "delete",
        data: { announcement: announId },
        options: { isLocalStorage: true },
      })
    } catch (error) {}
  }

  const bookmarksJSX = bookmarks.map((item) => {
    const { icon, name } = getTagProps(item)
    return (
      <div className='bookmark' key={item._id}>
        <div className='bookmark__image-side'>
          <Link to={`/details/${item._id}`} className='bookmark__container-img'>
            {item.image ? (
              <img
                src={item.image}
                className='bookmark__img'
                alt='AnnounceImg'
              />
            ) : (
              <div className='bookmark__plug-image'>
                <BsCardImage className='bookmark__plug-icon' />
                <span className='bookmark__plug-name'>No Images</span>
              </div>
            )}
          </Link>
          <div className='bookmark__price'>
            {item.price}
            <span className='bookmark__grivna-sign'>&#8372;</span>
          </div>
        </div>
        <div className='bookmark__content-side'>
          <Link className='bookmark__title' to={`/details/${item._id}`}>
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
          <Link to={`/user/${item.owner._id}`} className='bookmark__owner'>
            <span className='bookmark__container-ava'>
              <img
                src={item.owner.ava}
                className='bookmark__ava'
                alt='userAva'
              />
            </span>
            <span className='bookmark__username'>{item.owner.username}</span>
          </Link>
        </div>
        <button
          className='bookmark__btn-delete btn link'
          onClick={() => handleRemove(item._id)}
        >
          <BsX />
        </button>
      </div>
    )
  })
  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          <BsBookmarks />
          <span className='title__name'>Bookmarks</span>
        </div>
        <span className='title__description'>Your favourite announcements</span>
      </div>
      <div className='bookmarks'>
        {bookmarksJSX.length ? (
          bookmarksJSX
        ) : (
          <div className='plug-text'>No bookmarks</div>
        )}
      </div>
    </div>
  )
}

export default BookmarksPage

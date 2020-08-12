import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"
import useTags from "../hooks/useTags"
import { Link } from "react-router-dom"
import { BsCardImage } from "react-icons/bs"

function AnnouncementsPage(props) {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const { fetchData } = useHTTP()
  const tags = useTags()
  const { categoryName } = props.match.params

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: `/announcement/get-announcements/${categoryName}`,
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        setData(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [categoryName, fetchData])

  const announcements = data.map((ad) => {
    return (
      <Link className='announc__link' key={ad._id} to={`/details/${ad._id}`}>
        <div className='announc__container-img'>
          <span className='announc__price'>
            {ad.price} <span className='announc__grivna-sign'>&#8372;</span>
          </span>
          {ad.image ? (
            <img
              className='announc__image'
              src={ad.image.path}
              alt={`${categoryName}Img`}
            />
          ) : (
            <div className='announc__plug-image'>
              <BsCardImage className='announc__plug-icon' />
              <span className='announc__plug-name'>No Images</span>
            </div>
          )}
          <span className='announc__date'>{ad.date.slice(0, 10)}</span>
        </div>
        <div className='announc__container-title'>
          <span className='announc__title'>{ad.title}</span>
        </div>
      </Link>
    )
  })

  const getTitleProps = () => {
    let props
    tags.forEach((tag) => {
      if (tag.param === categoryName) {
        props = tag
      }
    })

    return props
  }

  if (load) {
    return <div className='wrapper'>LOADIGN</div>
  }

  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          {getTitleProps().icon}
          <span className='title__name'>{getTitleProps().name}</span>
        </div>
        <span className='title__description'>Choose what interests you</span>
      </div>
      <div className='announc'>{announcements}</div>
    </div>
  )
}

export default AnnouncementsPage

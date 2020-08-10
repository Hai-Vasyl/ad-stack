import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"
import { Link } from "react-router-dom"
import { AiOutlineCar, AiOutlineLaptop, AiOutlineEye } from "react-icons/ai"
import {
  GiGreenhouse,
  GiShakingHands,
  GiTrojanHorse,
  GiHouseKeys,
} from "react-icons/gi"
import { GrWorkshop } from "react-icons/gr"
import { RiToolsLine } from "react-icons/ri"
import { FaDog } from "react-icons/fa"
import { BsCardImage } from "react-icons/bs"

function AnnouncementsPage(props) {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const { fetchData } = useHTTP()
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

  const categories = [
    {
      param: "transport",
      name: "Transport",
      icon: <AiOutlineCar className='title__icon' />,
    },
    {
      param: "house_garden",
      name: "House and garden",
      icon: <GiGreenhouse className='title__icon' />,
    },
    {
      param: "electronics",
      name: "Electronics",
      icon: <AiOutlineLaptop className='title__icon' />,
    },
    {
      param: "childrens_world",
      name: "Children's world",
      icon: <GiTrojanHorse className='title__icon' />,
    },
    {
      param: "real_estate",
      name: "Real estate",
      icon: <GiHouseKeys className='title__icon' />,
    },
    {
      param: "spare_parts_for_transport",
      name: "Spare parts for transport",
      icon: <RiToolsLine className='title__icon' />,
    },
    {
      param: "work",
      name: "Work",
      icon: <GrWorkshop className='title__icon' />,
    },
    {
      param: "animals",
      name: "Animals",
      icon: <FaDog className='title__icon' />,
    },
    {
      param: "business_services",
      name: "Business and services",
      icon: <GiShakingHands className='title__icon' />,
    },
    {
      param: "fashion_style",
      name: "Fashion and style",
      icon: <AiOutlineEye className='title__icon' />,
    },
  ]

  const getTitle = () => {
    let properties = {}
    categories.forEach((item) => {
      if (item.param === categoryName) {
        properties.title = item.name
        properties.icon = item.icon
      }
    })

    return properties
  }

  if (load) {
    return <div className='wrapper'>LOADIGN</div>
  }

  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          {getTitle().icon}
          <span className='title__name'>{getTitle().title}</span>
        </div>
        <span className='title__description'>Choose what interests you</span>
      </div>
      <div className='announc'>{announcements}</div>
    </div>
  )
}

export default AnnouncementsPage

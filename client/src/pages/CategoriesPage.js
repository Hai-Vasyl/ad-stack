import React from "react"
import { Link } from "react-router-dom"
import business_services from "../imgs/undraw_agreement_aajr.svg"
import transport from "../imgs/undraw_Vehicle_sale_a645.svg"
import electronics from "../imgs/undraw_posting_photo_v65l.svg"
import house_garden from "../imgs/undraw_suburbs_8b83.svg"
import childrens_world from "../imgs/undraw_Design_thinking_re_644h.svg"
import real_estate from "../imgs/undraw_for_sale_viax.svg"
import spare_parts_for_transport from "../imgs/undraw_heavy_box_agqi.svg"
import work from "../imgs/undraw_co-working_825n.svg"
import animals from "../imgs/undraw_Cautious_dog_q83f.svg"
import fashion_style from "../imgs/undraw_eco_conscious_1y58.svg"
import { AiOutlineUnorderedList } from "react-icons/ai"

function CategoriesPage() {
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
      <div className='categories'>
        <Link to='/categories/transport' className='categories__link'>
          <span className='categories__name'>Transport</span>
          <img
            src={transport}
            className='categories__image'
            alt='transportImage'
          />
        </Link>
        <Link to='/categories/electronics' className='categories__link'>
          <span className='categories__name'>Electronics</span>
          <img
            src={electronics}
            className='categories__image'
            alt='electronicsImage'
          />
        </Link>
        <Link to='/categories/house_garden' className='categories__link'>
          <span className='categories__name'>House and garden</span>
          <img
            src={house_garden}
            className='categories__image'
            alt='house_gardenImage'
          />
        </Link>
        <Link to='/categories/childrens_world' className='categories__link'>
          <span className='categories__name'>Children's world</span>
          <img
            src={childrens_world}
            className='categories__image'
            alt='childrens_worldImage'
          />
        </Link>
        <Link to='/categories/real_estate' className='categories__link'>
          <span className='categories__name'>Real estate</span>
          <img
            src={real_estate}
            className='categories__image'
            alt='real_estateImage'
          />
        </Link>
        <Link
          to='/categories/spare_parts_for_transport'
          className='categories__link'
        >
          <span className='categories__name'>Spare parts for transport</span>
          <img
            src={spare_parts_for_transport}
            className='categories__image'
            alt='categories__nameImage'
          />
        </Link>
        <Link to='/categories/work' className='categories__link'>
          <span className='categories__name'>Work</span>
          <img src={work} className='categories__image' alt='workImage' />
        </Link>
        <Link to='/categories/animals' className='categories__link'>
          <span className='categories__name'>Animals</span>
          <img src={animals} className='categories__image' alt='animalsImage' />
        </Link>
        <Link to='/categories/business_services' className='categories__link'>
          <span className='categories__name'>Business and services</span>
          <img
            src={business_services}
            className='categories__image'
            alt='business_servicesImage'
          />
        </Link>
        <Link to='/categories/fashion_style' className='categories__link'>
          <span className='categories__name'>Fashion and style</span>
          <img
            src={fashion_style}
            className='categories__image'
            alt='fashion_styleImage'
          />
        </Link>
      </div>
    </div>
  )
}

export default CategoriesPage

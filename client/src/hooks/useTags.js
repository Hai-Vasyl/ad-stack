import React from "react"
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

function useTags() {
  return [
    {
      param: "transport",
      name: "Transport",
      icon: <AiOutlineCar className='btn__icon' />,
      img: transport,
    },
    {
      param: "house_garden",
      name: "House and garden",
      icon: <GiGreenhouse className='btn__icon' />,
      img: house_garden,
    },
    {
      param: "electronics",
      name: "Electronics",
      icon: <AiOutlineLaptop className='btn__icon' />,
      img: electronics,
    },
    {
      param: "childrens_world",
      name: "Children's world",
      icon: <GiTrojanHorse className='btn__icon' />,
      img: childrens_world,
    },
    {
      param: "real_estate",
      name: "Real estate",
      icon: <GiHouseKeys className='btn__icon' />,
      img: real_estate,
    },
    {
      param: "spare_parts_for_transport",
      name: "Spare parts for transport",
      icon: <RiToolsLine className='btn__icon' />,
      img: spare_parts_for_transport,
    },
    {
      param: "work",
      name: "Work",
      icon: <GrWorkshop className='btn__icon' />,
      img: work,
    },
    {
      param: "animals",
      name: "Animals",
      icon: <FaDog className='btn__icon' />,
      img: animals,
    },
    {
      param: "business_services",
      name: "Business and services",
      icon: <GiShakingHands className='btn__icon' />,
      img: business_services,
    },
    {
      param: "fashion_style",
      name: "Fashion and style",
      icon: <AiOutlineEye className='btn__icon' />,
      img: fashion_style,
    },
  ]
}

export default useTags

import React from "react"
import { FaBuysellads } from "react-icons/fa"
import PageLoader from "./PageLoader"

function MainLoader() {
  return (
    <>
      <div className='logo'>
        <PageLoader />
        <div className='logo__container'>
          <FaBuysellads className='logo__icon' />
          <span className='logo__name'>AD-Stack</span>
        </div>
      </div>
    </>
  )
}

export default MainLoader

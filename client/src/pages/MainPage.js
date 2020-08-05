import React from "react"
// import mainBgImage from "../imgs/undraw_marketing_v0iu.svg"
import mainBgImage from "../imgs/undraw_in_sync_xwsa.svg"
import { FaBuysellads } from "react-icons/fa"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toggleAuthForm } from "../redux/navbar/navbarActions"

function MainPage(props) {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handlerGoCabinet = () => {
    if (token.token) {
      props.history.push("/create")
    } else {
      dispatch(toggleAuthForm())
    }
  }

  return (
    <div className='main'>
      <div className='main__bg-content'></div>
      <div className='main__bg-background'></div>
      <div className='main__container-content'>
        <div className='main__content'>
          <h1 className='main__title'>
            <FaBuysellads className='main__icon' />
            <span className='main__name'>AD-Stack</span>
          </h1>
          <p className='main__paragraph'>
            Don't wait for a better opportunity, just make an announcement and
            your life will be easier
          </p>
          <div className='main__container-btns'>
            <button onClick={handlerGoCabinet} className='btn btn-primary'>
              <FiPlus className='btn__icon' />
              <span className='btn__name'>Announce</span>
            </button>
            <Link to='/categories' className='btn link'>
              <AiOutlineUnorderedList className='btn__icon' />
              <span className='btn__name'>Categories</span>
            </Link>
          </div>
        </div>
        <div className='main__bg-img'>
          <img src={mainBgImage} className='main__img' alt='mainBgImage' />
        </div>
      </div>
    </div>
  )
}

export default MainPage

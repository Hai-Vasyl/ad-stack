import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaBuysellads } from "react-icons/fa"
import {
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai"
import { FiUsers, FiPlus } from "react-icons/fi"
import { RiSearch2Line } from "react-icons/ri"
import { BsBookmarks } from "react-icons/bs"
import { clearData } from "../redux/auth/authActions"
import {
  toggleDropMenu,
  toggleAuthForm,
  resetNavbar,
} from "../redux/navbar/navbarActions"
import { setText } from "../redux/search/searchActions"
import { useLocation, useHistory } from "react-router-dom"

function Navbar(props) {
  const {
    auth: { token },
    navbar: { dropMenu, authForm },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const location = useLocation()
  const history = useHistory()

  const handleChange = (e) => {
    setSearch(e.target.value)
    dispatch(resetNavbar())
  }

  const handleLogout = () => {
    dispatch(clearData())
    dispatch(resetNavbar())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search.trim().length) {
      return
    }
    dispatch(resetNavbar())
    dispatch(setText(search))
    if (location.pathname === "/search") {
      return
    }
    history.push("/search")
  }

  return (
    <div className='nav'>
      <div className='nav__menu'>
        <NavLink
          to='/'
          className='nav__link nav__logo-link'
          onClick={() => dispatch(resetNavbar())}
        >
          <FaBuysellads className='nav__logo' />
          <span className='nav__link-name'>AD-Stack</span>
        </NavLink>

        <form onSubmit={handleSubmit} className='nav__search'>
          <input
            type='text'
            value={search}
            className='nav__search-input'
            onChange={handleChange}
            placeholder='Search'
            autoComplete='off'
          />
          <button className='nav__search-btn'>
            <RiSearch2Line />
          </button>
        </form>

        <NavLink
          exact
          to='/categories'
          activeClassName='nav__link--active'
          className='nav__link'
          onClick={() => dispatch(resetNavbar())}
        >
          <AiOutlineUnorderedList />
          <span className='nav__link-name'>Categories</span>
        </NavLink>
        <NavLink
          to='/users'
          activeClassName='nav__link--active'
          className='nav__link'
          onClick={() => dispatch(resetNavbar())}
        >
          <FiUsers />
          <span className='nav__link-name'>Users</span>
        </NavLink>
        {token.user && token.user.typeUser ? (
          <>
            <NavLink
              to='/create'
              activeClassName='nav__link--active'
              className='nav__link'
              onClick={() => dispatch(resetNavbar())}
            >
              <FiPlus />
              <span className='nav__link-name'>Create</span>
            </NavLink>
            <div className='nav__container-drop'>
              <button
                onClick={() => dispatch(toggleDropMenu())}
                className={`nav__link nav__btn ${
                  dropMenu && "nav__link--active"
                }`}
              >
                <span className='nav__container-img'>
                  <img
                    className='nav__img'
                    src={token.user.ava}
                    alt='userImage'
                  />
                </span>
                <span className='nav__link-name'>{token.user.username}</span>
              </button>
              <div
                className={`nav__drop-menu ${
                  dropMenu && "nav__drop-menu--open"
                }`}
              >
                <NavLink
                  to='/user'
                  exact
                  activeClassName='nav__link--active'
                  className='nav__link'
                  onClick={() => dispatch(resetNavbar())}
                >
                  <AiOutlineUser />
                  <span className='nav__link-name'>Profile</span>
                </NavLink>
                <NavLink
                  to='/bookmarks'
                  activeClassName='nav__link--active'
                  className='nav__link'
                  onClick={() => dispatch(resetNavbar())}
                >
                  <BsBookmarks />
                  <span className='nav__link-name'>Bookmarks</span>
                </NavLink>
                <button className='nav__link' onClick={handleLogout}>
                  <AiOutlineLogout />
                  <span className='nav__link-name'>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            className={`nav__link ${authForm && "nav__link--active"}`}
            onClick={() => dispatch(toggleAuthForm())}
          >
            <AiOutlineLogin />
            <span className='nav__link-name'>Sign In</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar

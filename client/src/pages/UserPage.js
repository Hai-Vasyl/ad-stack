import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import useHTTP from "../hooks/useHTTP"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { BsBookmarks } from "react-icons/bs"

function UserPage() {
  const {
    token: { user },
  } = useSelector((state) => state.auth)
  const [announcements, setAnnouncements] = useState([])
  const { fetchData } = useHTTP()
  const [load, setLoad] = useState(true)
  const [tabPages, setTabPages] = useState([
    { page: <div>Page Announcements</div>, status: true },
    { page: <div>Page Contacts</div>, status: false },
    { page: <div>Page Settings</div>, status: false },
  ])

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/announcement/get-user-announcements",
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        console.log(data)
        setAnnouncements(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData])

  if (load) {
    return <div className='wrapper'>LOADING....</div>
  }

  return (
    <div className='wrapper'>
      {console.log(user)}

      <div className='user'>
        <div className='user__image-side'>
          <div className='user__brief'>
            <button className='user__container-image'>
              <img src={user.ava} className='user__image' alt='userAva' />
            </button>

            {user.typeUser === "admin" ? (
              <RiUserSettingsLine className='user__type-icon' />
            ) : (
              <RiUserLine className='user__type-icon' />
            )}
          </div>
          <h3 className='user__username'>{user.username}</h3>
          <Link to='/bookmarks' className='user__btn-bookmarks btn link'>
            <BsBookmarks className='btn__icon' />
            <span className='btn__name'>Bookmarks</span>
          </Link>
        </div>

        <div className='user__content-side'></div>
      </div>
    </div>
  )
}

export default UserPage

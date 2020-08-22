import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { BsX } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { useSelector } from "react-redux"
import PageLoader from "../components/PageLoader"

function UsersPage(props) {
  const { fetchData } = useHTTP()
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const {
    auth: { token },
  } = useSelector((state) => state)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/auth/get-users",
          method: "get",
          data: null,
          options: { isLocalStorage: true },
        })
        setData(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData])

  const handleRemoveUser = (e) => {
    e.stopPropagation()
    console.log("qwe")
  }

  const handleRedirectUser = (id) => {
    props.history.push(`/user/${id}`)
  }

  const users = data.map((user) => {
    return (
      <div
        key={user._id}
        onClick={() => handleRedirectUser(user._id)}
        className='user-link'
      >
        {token.user && token.user.typeUser === "admin" && (
          <button
            className='user-link__btn-delete btn'
            onClick={handleRemoveUser}
          >
            <BsX />
          </button>
        )}
        <div className='user-link__container-img'>
          <img className='user-link__img' src={user.ava} alt='userAva' />
        </div>
        <div className='user-link__info'>
          {user.typeUser === "admin" ? (
            <RiUserSettingsLine className='user-link__icon' />
          ) : (
            <RiUserLine className='user-link__icon' />
          )}
          <span className='user-link__username'>{user.username}</span>
        </div>
      </div>
    )
  })

  if (load) {
    return (
      <div className='wrapper'>
        <PageLoader />
      </div>
    )
  }

  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='title__container-name'>
          <FiUsers />
          <span className='title__name'>Users</span>
        </div>
        <span className='title__description'>All registered users</span>
      </div>
      <div className='users'>{users}</div>
    </div>
  )
}

export default UsersPage

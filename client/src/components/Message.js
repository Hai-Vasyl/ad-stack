import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  RiQuestionAnswerLine,
  RiUserSettingsLine,
  RiUserLine,
} from "react-icons/ri"
import { BsX, BsCheck } from "react-icons/bs"
import { useSelector } from "react-redux"
import useHTTP from "../hooks/useHTTP"

function Message({ message, isQuestion, owner, setNewAnswer, deleteHandler }) {
  const [dropReply, setDropReply] = useState(false)
  const [answer, setAnswer] = useState("")
  const { fetchData } = useHTTP()
  const { token } = useSelector((state) => state.auth)

  const toggleReply = () => {
    if (token.token) {
      setDropReply(!dropReply)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!answer.trim().length) {
        return
      }

      const { announcement } = message
      const data = await fetchData({
        url: "/message/create-message",
        method: "post",
        data: { announcement, content: answer, question: message._id },
        options: { isLocalStorage: true },
      })

      const owner = {
        ava: token.user.ava,
        typeUser: token.user.typeUser,
        username: token.user.username,
        _id: token.user._id,
      }

      setNewAnswer({ ...data, owner })
      setAnswer("")
      setDropReply(false)
    } catch (error) {}
  }

  const handleDelete = async (msgId) => {
    try {
      deleteHandler(msgId)

      await fetchData({
        url: `/message/delete-message/${msgId}`,
        method: "delete",
        data: { isQuestion },
        options: { isLocalStorage: true },
      })
    } catch (error) {}
  }

  const handleChange = (e) => {
    setAnswer(e.target.value)
  }

  return (
    <div className={`msg ${!isQuestion && "msg-answer"}`}>
      <div className='msg__left-side'>
        {token.token && message.owner._id === token.user._id && (
          <button
            className='msg__btn-delete btn btn-simple'
            onClick={() => handleDelete(message._id)}
          >
            <BsX />
          </button>
        )}
        <Link to={`/user/${message.owner._id}`} className='msg__container-ava'>
          <img src={message.owner.ava} className='msg__ava' alt='userAva' />
        </Link>
      </div>

      <div className='msg__right-side'>
        <div className='msg__title'>
          {message.owner.typeUser === "admin" ? (
            <RiUserSettingsLine className='msg__type-icon msg__type-icon--admin' />
          ) : (
            <RiUserLine
              className={`msg__type-icon ${
                message.owner._id === owner && "msg__type-icon--owner"
              }`}
            />
          )}
          <Link to={`/user/${message.owner._id}`} className='msg__username'>
            {message.owner.username}
          </Link>
          <span className='msg__date'>{message.date.slice(0, 10)}</span>
        </div>

        <div className='msg__content'>{message.content}</div>
        {isQuestion && (
          <div className='msg__container-reply'>
            <button
              className={`msg__btn-reply btn btn-simple ${
                token.token
                  ? dropReply && "msg__btn-reply--close"
                  : "btn-disabled"
              }`}
              onClick={toggleReply}
            >
              <div className='btn__msg'>
                Login, to reply!
                <span className='btn__triangle'></span>
              </div>
              {dropReply ? (
                <BsX />
              ) : (
                <>
                  <RiQuestionAnswerLine className='btn__icon' />
                  <span className='btn__name'>Reply</span>
                </>
              )}
            </button>
            <form
              onSubmit={handleSubmit}
              className={`msg__form-reply ${
                dropReply && "msg__form-reply--open"
              }`}
            >
              <input
                type='text'
                className='msg__input'
                value={answer}
                onChange={handleChange}
                placeholder='Write your answer here'
              />
              <button
                className={`msg__btn-apply btn btn-primary ${
                  !answer.trim().length && "btn-disabled"
                }`}
              >
                <div className='btn__msg'>
                  Type something to reply!
                  <span className='btn__triangle'></span>
                </div>
                <BsCheck className='btn__icon' />
                <span className='btn__name'>Apply</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message

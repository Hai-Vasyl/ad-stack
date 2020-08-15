import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  RiQuestionAnswerLine,
  RiUserSettingsLine,
  RiUserLine,
} from "react-icons/ri"
import { BsX, BsCheck } from "react-icons/bs"

function Message({ message, isQuestion, owner }) {
  const [dropReply, setDropReply] = useState(false)
  const [answer, setAnswer] = useState("")

  const toggleReply = () => {
    setDropReply(!dropReply)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
  }

  const handleChange = (e) => {
    setAnswer(e.target.value)
  }

  return (
    <div className={`msg ${!isQuestion && "msg-answer"}`}>
      <div className='msg__left-side'>
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
                dropReply && "msg__btn-reply--close"
              }`}
              onClick={toggleReply}
            >
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
              <button className='msg__btn-apply btn btn-primary'>
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

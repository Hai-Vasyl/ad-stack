import React from "react"
import { RiQuestionAnswerLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"

function Message({ message, isQuestion, owner }) {
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
          <button className='msg__btn-reply btn btn-simple'>
            <RiQuestionAnswerLine className='btn__icon' />
            <span className='btn__name'>Reply</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Message

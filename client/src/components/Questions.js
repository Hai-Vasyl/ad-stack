import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"
import Question from "./Question"
import { BsArrowRight, BsInfoCircle } from "react-icons/bs"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AiOutlineLogin } from "react-icons/ai"

function Questions({ announcement, owner }) {
  const [questions, setQuestions] = useState([])
  const [comment, setComment] = useState("")
  const [load, setLoad] = useState(true)
  const { token } = useSelector((state) => state.auth)
  const { fetchData } = useHTTP()

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/message/get-messages",
          method: "post",
          data: { announcement },
          options: { isLocalStorage: true },
        })

        setQuestions(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData, announcement])

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((item) => item._id !== questionId))
  }

  const messages = questions.map((question) => {
    return (
      <Question
        key={question._id}
        question={question}
        owner={owner}
        deleteQuestion={deleteQuestion}
      />
    )
  })

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleComment = async () => {
    try {
      if (!comment.trim().length) {
        return
      }
      const data = await fetchData({
        url: "/message/create-message",
        method: "post",
        data: { announcement, content: comment },
        options: { isLocalStorage: true },
      })

      const owner = {
        ava: token.user.ava,
        typeUser: token.user.typeUser,
        username: token.user.username,
        _id: token.user._id,
      }
      setQuestions([{ ...data, owner }, ...questions])
      setComment("")
    } catch (error) {}
  }

  return (
    <>
      {token.token ? (
        <div className='comment-form msg'>
          <div className='comment-form__left-side msg__left-side'>
            <Link
              to='/user'
              className='comment-form__container-ava msg__container-ava'
            >
              <img
                src={token.user.ava}
                className='comment-form__ava msg__ava'
                alt='userAva'
              />
            </Link>
          </div>

          <div className='comment-form__right-side msg__right-side'>
            <div className='comment-form__title msg__title'>
              {token.user.typeUser === "admin" ? (
                <RiUserSettingsLine className='comment-form__type-icon msg__type-icon msg__type-icon--admin' />
              ) : (
                <RiUserLine
                  className={`comment-form__type-icon msg__type-icon ${
                    token.user._id === owner && "msg__type-icon--owner"
                  }`}
                />
              )}
              <Link to='/user' className='comment-form__username msg__username'>
                {token.user.username}
              </Link>
            </div>

            <div className='comment-form__container-text'>
              <textarea
                className='comment-form__textarea msg__content'
                value={comment}
                onChange={handleChange}
                placeholder='Leave a question'
              ></textarea>
            </div>
            <button
              className={`comment-form__btn-post btn btn-primary ${
                !comment.trim().length && "btn-disabled"
              }`}
              onClick={handleComment}
            >
              <div className='btn__msg'>
                Type something to comment!
                <span className='btn__triangle'></span>
              </div>
              <span className='btn__name'>Comment</span>
              <BsArrowRight className='btn__icon' />
            </button>
          </div>
        </div>
      ) : (
        <div className='comment-warning'>
          <BsInfoCircle className='comment-warning__icon' />
          <span className='comment-warning__title'>
            Please login, to write a question
          </span>
          <button className='comment-warning__btn btn btn-simple'>
            <AiOutlineLogin className='btn__icon' />
            <span className='btn__name'>Login</span>
          </button>
        </div>
      )}

      <div className='container-msgs'>
        {load ? <div className='loader'></div> : messages}
      </div>
    </>
  )
}

export default Questions

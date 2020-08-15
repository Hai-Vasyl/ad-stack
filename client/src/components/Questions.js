import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"
import Question from "./Question"
import { BsArrowRight } from "react-icons/bs"
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

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

  const messages = questions.map((question) => {
    return <Question key={question._id} question={question} owner={owner} />
  })

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  if (load) {
    return <div>LOADING..</div>
  }

  return (
    <>
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

          <form className='comment-form__container-text'>
            <textarea
              className='comment-form__textarea msg__content'
              value={comment}
              onChange={handleChange}
              placeholder='Leave a question'
            ></textarea>
            <button className='comment-form__btn-handler'></button>
          </form>
          <button className='comment-form__btn-post btn btn-primary'>
            <span className='btn__name'>Comment</span>
            <BsArrowRight className='btn__icon' />
          </button>
        </div>
      </div>

      <div className='container-msgs'>{messages}</div>
    </>
  )
}

export default Questions

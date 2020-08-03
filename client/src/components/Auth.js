import React, { useState } from "react"
import useHTTP from "../hooks/useHTTP"
import { BsInfoCircle } from "react-icons/bs"
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setError,
  clearSpecificError,
  clearErrors,
} from "../redux/auth/authActions"

function Auth() {
  const [form, setForm] = useState([
    { param: "username", type: "text", value: "" },
    { param: "email", type: "email", value: "" },
    { param: "password", type: "password", value: "" },
  ])
  const [isLogin, setIsLogin] = useState(true)
  const { fetchData } = useHTTP()
  const { load, token, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm(
      form.map((item) => {
        if (item.param === e.target.name) {
          item.value = e.target.value
          dispatch(clearSpecificError(item))
        }
        return item
      })
    )
  }

  const handleChangeForm = () => {
    setIsLogin(!isLogin)
    dispatch(clearErrors())
  }

  const getMsg = (item) => {
    let msg = ""
    error.forEach((err) => {
      if (item.param === err.param) {
        msg = err.msg
      }
    })
    return msg
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let isError = false
    form.forEach((item) => {
      if (!item.value) {
        if (isLogin && item.param === "username") {
          return
        }
        dispatch(setError(item))
        isError = true
      }
    })
    if (isError) {
      return
    }

    const [username, email, password] = form
    const data = { email: email.value, password: password.value }

    dispatch(
      fetchData({
        url: `/auth/${isLogin ? "login" : "register"}`,
        method: "post",
        data: isLogin ? { ...data } : { ...data, username: username.value },
        options: { fetchStart, fetchSuccess, fetchFailure },
      })
    )
  }

  const fields = form.map((item) => {
    const msg = getMsg(item)
    return (
      <label
        key={item.param}
        className={`field ${
          isLogin && item.param === "username" && "field--close"
        }`}
      >
        <div className='field__container-info'>
          <span className='field__name'>{item.param}:</span>
          <div
            className={`field__container-msg ${
              !msg && "field__container-msg--close"
            }`}
          >
            <BsInfoCircle className='field__icon' />
            <span className='field__msg'>
              {msg}
              <span className='field__triangle'></span>
            </span>
          </div>
        </div>
        <input
          className={`field__input ${msg && "field__input--warning"}`}
          type={item.type}
          value={item.value}
          name={item.param}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
    )
  })

  return (
    <div className='auth-form'>
      <div
        className={`auth-form__loader ${load && "auth-form__loader--active"}`}
      >
        <div className='auth-form__spinner'></div>
      </div>
      <h2 className='auth-form__title'>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className='auth-form__container-fields'>
        {fields}
        <button className='auth-form__btn-handler'></button>
      </form>
      <div className='auth-form__container-btns'>
        <button onClick={handleSubmit} className='btn btn-primary'>
          {isLogin ? (
            <AiOutlineLogin className='btn__icon' />
          ) : (
            <AiOutlineCheckCircle className='btn__icon' />
          )}
          <span className='btn__name'>{isLogin ? "Sign In" : "Sign Up"}</span>
        </button>
        <button onClick={handleChangeForm} className='btn btn-simple'>
          {isLogin ? (
            <AiOutlineCheckCircle className='btn__icon' />
          ) : (
            <AiOutlineLogin className='btn__icon' />
          )}
          <span className='btn__name'>{isLogin ? "Sign Up" : "Sign In"}</span>
        </button>
      </div>
    </div>
  )
}

export default Auth

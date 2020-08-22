import React, { useState, useEffect } from "react"
import "./App.scss"
import { useDispatch } from "react-redux"
import { setToken } from "./redux/auth/authActions"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./components/Routes"
import MainLoader from "./components/MainLoader"

function App() {
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setToken())
    setTimeout(() => {
      setLoad(false)
    }, 3000)
  }, [dispatch])

  if (load) {
    return <MainLoader />
  }
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App

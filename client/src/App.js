import React, { useState, useEffect } from "react"
import "./App.scss"
import { useDispatch } from "react-redux"
import { setToken } from "./redux/auth/authActions"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./components/Routes"

function App() {
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setToken())
    setLoad(false)
  }, [dispatch])

  if (load) {
    return <div>LOADING..</div>
  }
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App

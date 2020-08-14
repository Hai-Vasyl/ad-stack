import React, { useEffect, useState } from "react"
import useHTTP from "../hooks/useHTTP"

function Questions(props) {
  const [questions, setQuestions] = useState([])
  const [load, setLoad] = useState(true)
  const { fetchData } = useHTTP()
  const { announcement } = props

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/message/get-messages",
          method: "post",
          data: { announcement },
          options: { isLocalStorage: true },
        })
        console.log(data)
        setQuestions(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData, announcement])

  if (load) {
    return <div>LOADING..</div>
  }

  return <div>{console.log(announcement)}somethind</div>
}

export default Questions

import React, { useState, useEffect } from "react"
import Message from "./Message"
import useHTTP from "../hooks/useHTTP"

function Question({ question, owner }) {
  const [answers, setAnswers] = useState([])
  const [load, setLoad] = useState(true)
  const { fetchData } = useHTTP()

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchData({
          url: "/message/get-messages",
          method: "post",
          data: { announcement: question.announcement, question: question._id },
          options: { isLocalStorage: true },
        })

        setAnswers(data)
        setLoad(false)
      } catch (error) {}
    }
    fetch()
  }, [fetchData, question])

  const setNewAnswer = (answerNew) => {
    setAnswers([answerNew, ...answers])
  }

  const answersJSX = answers.map((answer) => {
    return <Message message={answer} key={answer._id} owner={owner} />
  })

  if (load) {
    return <div>LOADING</div>
  }

  return (
    <div>
      <Message
        message={question}
        isQuestion
        owner={owner}
        setNewAnswer={setNewAnswer}
      />
      <div className='container-msgs container-questions'>{answersJSX}</div>
    </div>
  )
}

export default Question

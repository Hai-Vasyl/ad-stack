const Question = require("../models/Question")
const Answer = require("../models/Answer")

exports.message_create = async (req, res) => {
  try {
    const { userId } = req
    const { announcement, content, question } = req.body

    if (question) {
      let answerNew = new Answer({
        owner: userId,
        announcement,
        content,
        date: new Date(),
        question,
      })
      answerNew = await answerNew.save()

      return res.json(answerNew._id)
    }
    let questionNew = new Question({
      owner: userId,
      announcement,
      content,
      date: new Date(),
    })
    questionNew = await questionNew.save()
    res.json(questionNew._id)
  } catch (error) {
    res.json(`Error creating message: ${error.message}`)
  }
}

exports.message_get = async (req, res) => {
  try {
    const { announcement, question } = req.body

    if (question) {
      const answers = await Answer.find({
        question,
        announcement,
      }).populate({ path: "owner", select: "username typeUser ava" })
      return res.json(answers)
    }

    const questions = await Question.find({ announcement }).populate({
      path: "owner",
      select: "username typeUser ava",
    })

    res.json(questions)
  } catch (error) {
    res.json(`Error getting messages: ${error.message}`)
  }
}

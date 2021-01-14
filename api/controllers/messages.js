const Question = require("../models/Question")
const Answer = require("../models/Answer")
const User = require("../models/User")
const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")
require("dotenv").config({ path: "../../.env" })

const { AWS_ID, AWS_SECRET, AWS_REGION, AWS_DB_ENDPOINT } = process.env

AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_DB_ENDPOINT,
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

let docClient = new AWS.DynamoDB.DocumentClient()

const compare = (item1, item2) => {
  const date1 = new Date(item1.date)
  const date2 = new Date(item2.date)
  if (date1 > date2) {
    return -1
  } else if (date1 < date2) {
    return 1
  }
  return 0
}

const scanTable = (
  TableName,
  FilterExpression,
  ExpressionAttributeValues,
  callback
) => {
  docClient.scan(
    {
      TableName,
      FilterExpression,
      ExpressionAttributeValues,
    },
    async (err, resData) => {
      if (err) {
        throw new Error(`Getting data docs error: ${err.message}`)
      }

      let data = [...resData.Items].sort(compare)
      for (let i = 0; i < data.length; i++) {
        const user = await User.findOne({ _id: data[i].owner }).select(
          "username typeUser ava"
        )
        data[i] = { ...data[i], owner: user }
      }
      return callback(data)
    }
  )
}

const deleteDocTable = (TableName, _id) => {
  docClient.delete(
    {
      TableName,
      Key: {
        _id,
      },
    },
    (err, data) => {
      if (err) {
        throw new Error(`Deleting table doc error: ${err.message}`)
      }
      return
    }
  )
}

const createDocTable = (TableName, Item, callback) => {
  docClient.put(
    {
      TableName,
      Item,
    },
    (err, data) => {
      if (err) {
        throw new Error(`Creating table doc error: ${err.message}`)
      }
      callback(Item)
    }
  )
}

exports.message_create = async (req, res) => {
  try {
    const { userId } = req
    const { announcement, content, question } = req.body
    if (question) {
      createDocTable(
        "Answers",
        {
          _id: uuidv4(),
          owner: userId,
          announcement,
          content,
          date: new Date(),
          question,
        },
        (newDoc) => res.json(newDoc)
      )
    } else {
      createDocTable(
        "Questions",
        {
          _id: uuidv4(),
          owner: userId,
          announcement,
          content,
          date: new Date(),
        },
        (newDoc) => res.json(newDoc)
      )
    }
  } catch (error) {
    res.json(`Error creating message: ${error.message}`)
  }
}

exports.message_get = async (req, res) => {
  try {
    const { announcement, question } = req.body

    if (question) {
      scanTable(
        "Answers",
        "question = :question",
        {
          ":question": question,
        },
        (data) => res.json(data)
      )
    } else {
      scanTable(
        "Questions",
        "announcement = :announcement",
        {
          ":announcement": announcement,
        },
        (data) => res.json(data)
      )
    }
  } catch (error) {
    res.json(`Error getting messages: ${error.message}`)
  }
}

exports.message_delele = async (req, res) => {
  try {
    const { msgId } = req.params
    const { isQuestion } = req.body

    if (isQuestion) {
      scanTable(
        "Answers",
        "question = :question",
        {
          ":question": msgId,
        },
        async (answers) => {
          for (let i = 0; i < answers.length; i++) {
            deleteDocTable("Answers", answers[i]._id)
          }
          deleteDocTable("Questions", msgId)
        }
      )
    } else {
      deleteDocTable("Answers", msgId)
    }

    res.json("Message successfully deleted!")
  } catch (error) {
    res.json(`Error deleting message: ${error.message}`)
  }
}

const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "bd0428c1-69f2-44b1-9263-1e110cb2742d",
    timestamp: 1583445600000,
    body: 'Great Article!',
    author: 'A. Mark',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "bd0428c1-69f2-44b1-9263-1e110cb2742d",
    timestamp: 1583791200000,
    body: 'Very helpful, Thanks For You!',
    author: 'S. Karl',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  }
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent(token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
    )
  })
}

function add(token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch (option) {
      case "upVote":
        comment.voteScore = comment.voteScore + 1
        break
      case "downVote":
        comment.voteScore = comment.voteScore - 1
        break
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent(token, post) {
  return new Promise((res) => {
    let comments = getData(token)
    keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === post.id)
    filtered_keys.forEach(key => comments[key].parentDeleted = true)
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let comments = getData(token)
    comments[id].deleted = true
    posts.incrementCommentCounter(token, comments[id].parentId, -1)
    res(comments[id])
  })
}

function edit(token, id, comment) {
  return new Promise((res) => {
    let comments = getData(token)
    for (prop in comment) {
      comments[id][prop] = comment[prop]
    }
    res(comments[id])
  })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}

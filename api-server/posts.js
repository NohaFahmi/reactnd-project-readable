const clone = require('clone')

let db = {}

const defaultData = {
  "bd0428c1-69f2-44b1-9263-1e110cb2742d": {
    id: 'bd0428c1-69f2-44b1-9263-1e110cb2742d',
    timestamp: 1583272800000,
    title: '3 Basic Principles You MUST Know Before Using Redux',
    body: "Marcos Redux is a library for managing states that follow the principles of the flux architecture. We won't go too deep in technical details, but we'll cover the basic principles that you'll need to understand this framework. Redux is an independent framework, but for the sake of brevity, we'll assume that we are using it with React.For the rest of the post, check out the link: https://hackernoon.com/3-basic-principles-you-must-know-before-using-redux-es6o3y1c",
    author: 'Marcos',
    category: 'redux',
    voteScore: 3,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'When You Should use Redux with APIs',
    body: "Have you been studying React and heard about Redux at some point, right? You get interested and start learning the concepts behind Redux, everything cool until now, but then you start working on a project that makes some API calls and you start wondering, when should I use Redux? I was in the same situation not so long ago, Redux is great and everything, but you need to know how to use it effectively. When working with APIs you usually want your users to be able to filter the data they receive in some way, and that's where Redux shines, at filtering data! What you really want is to store the data received from the API in a transitory warehouse, and this transitory warehouse is called Redux my friends, once the data is stored in the Redux state you can connect your React components to it, read the current filters and display the filtered information to the user. If you encounter yourself in a situation where: You are working with React, Redux, and an API You want to filter the data you receive from the API somehow Don't know what to do with Redux once you have the data from the API Then you better store that data in the Redux store using a dedicated state and define some filters state too, then you just filter the data in the Redux state using the defined filters. I hope it helps somehow to any developer learning React and Redux. Original Link: https://hackernoon.com/when-you-should-use-redux-with-apis-9mm3ue6",
    author: 'Santiago Andrés Rodríguez Márquez',
    category: 'redux',
    voteScore: -1,
    deleted: false,
    commentCount: 0
  },
  "ce5a639c-7802-45da-abbe-64d54eb72bdb": {
    id: 'ce5a639c-7802-45da-abbe-64d54eb72bdb',
    timestamp: 1606860000000,
    title: 'React Project Structure: Best Practices',
    body: 'So 2020 has just come to an end, it was a great year for me personally, I have written more about it on my previous blog post here. To everyone who read through it, thanks a lot. I am trying to share more of my life through my writing and that blog-post was an experiment in that. For further updates you can subscribe to this blog with your email, or follow me on Twitter here. Apart from it, several people have questions about where I work full-time at. It’s DelightChat, and I couldn’t ask for a better work. Building products from scratch and sharing knowledge across the team without arbitrary constraints is what I thrive in doing. 11 Because of a far better control over the frontend stack, and having the freedom to experiment with new technologies, I’ve had a better and more deeper understanding of how a React project should be structured for complex applications like the one we’re building here. And since a lot of e-ink has already been spilt on the relatively easier pickings of “Doing X in React” or “Using React with technology X”, I thought of writing on this topic, which requires a more deeper understanding of React and extended usage in a production setting. For the rest of the post, check out the link: https://hackernoon.com/react-project-structure-best-practices-kh20323x',
    author: 'Akash Joshi',
    category: 'react',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  "75b21939-aaf8-4823-b6bf-f1559bc25327": {
    id: "75b21939-aaf8-4823-b6bf-f1559bc25327",
    timestamp: 1615327200000,
    title: "How to Optimize React Performace by using useRef Hooks",
    body: 'Refs are a seldom-used feature in React. If you’ve read the official React guide, they’re introduced as an “escape hatch” out of the typical React data flow, with a warning to use them sparingly, and they’re primarily billed as the correct way to access a component’s underlying DOM element. For the rest of the post, check out the link: https://hackernoon.com/how-to-optimize-react-performace-by-using-useref-hooks-4t1n315h',
    author: 'sidney',
    category: 'react',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  "49176cb1-425a-416b-9565-2d6353c6ec15": {
    id: "49176cb1-425a-416b-9565-2d6353c6ec15",
    timestamp: 1610229600000,
    title: "A Review of Udacity’s React Nano Degree",
    body: "Yesterday, I finished my 2nd Nano Degree. As a typical Millennial, I have been having a quarter life crisis every two years starting in my 20s. This led me down the path of my first career change from a (wannabe) Actuary to a Data Analyst in 2015, and my first foray into online education which was, you guessed it, the Data Analyst Nano Degree.For the rest of the post, check out the link: https://hackernoon.com/a-review-of-udacitys-react-nano-degree-1085273f1a73",
    author: 'Bilal Tahir',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  "b102b4c2-95a4-4bef-a704-f1b25a32f16f": {
    id: "b102b4c2-95a4-4bef-a704-f1b25a32f16f",
    timestamp: 1615586400000,
    title: "85 Free Udacity Nanodegree Courses",
    body: "There are so many things that we can learn, and so many resources that we can choose to learn from that it makes it really challenging to choose the right resources that can help us get better jobs, or improve our careers in general. Udacity offers many nano-degrees that we can use to level up our careers with courses that are organized and prepared to help us progress from a beginner level to a more advanced one with quality content. Students who manage to finish the projects get the degree and are guaranteed to get a job related to the degree. If you cannot afford paying for these nanodegrees, fortunately, you can still attend many of the courses that belong to these nanodegrees, without having to pay anything.For the rest of the post, check out the link: https://hackernoon.com/85-free-udacity-nanodegree-courses-4be88d76e379",
    author: 'Fatos Morina',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }

}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory(token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll(token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add(token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch (option) {
      case "upVote":
        post.voteScore = post.voteScore + 1
        break
      case "downVote":
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let posts = getData(token)
    posts[id].deleted = true
    res(posts[id])
  })
}

function edit(token, id, post) {
  return new Promise((res) => {
    let posts = getData(token)
    for (prop in post) {
      posts[id][prop] = post[prop]
    }
    res(posts[id])
  })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}

import axios from 'axios'
import uuid from 'react-uuid'

const baseURL = 'http://localhost:3001';
const token = "token"
axios.defaults.headers.common['Authorization'] = token;

export const getCategories = () => async dispatch => {
    // console.log(dispatch)
    try {
        const res = await axios.get(`${baseURL}/categories`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_CATEGORIES",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }

}

export const gatCategoryPosts = (category) => async dispatch => {
    // console.log(dispatch)
    try {
        const res = await axios.get(`${baseURL}/${category}/posts`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_POSTS",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }

}

export const getAllPosts = () => async dispatch => {
    // console.log(dispatch)
    try {
        const res = await axios.get(`${baseURL}/posts`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_ALL_POSTS",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }

}

export const getPostById = (id) => async dispatch => {
    // console.log(dispatch)
    try {
        const res = await axios.get(`${baseURL}/posts/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_POST_BY_ID",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }

}

export const getPostComments = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseURL}/posts/${id}/comments`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_POST_COMMENTS",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}
export const getComment = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseURL}/comments/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        dispatch({
            type: "GET_COMMENT",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}
export const addComment = (data) => async dispatch => {
    try {
        const res = await axios.post(`${baseURL}/comments`, {
            id: uuid(),
            timestamp: data.timestamp,
            body: data.body,
            author: data.author,
            parentId: data.parentId
        },
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "ADD_NEW_COMMENT",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}
export const editComment = (data, id) => async dispatch => {
    try {
        const res = await axios.put(`${baseURL}/comments/${id}`, {
            timestamp: data.timestamp,
            body: data.body,
        },
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "EDIT_COMMENT",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}
export const voteForComment = (vote, id) => async dispatch => {
    try {
        const res = await axios.post(`${baseURL}/comments/${id}`, { option: vote })
        dispatch({
            type: "VOTE_FOR_COMMENT",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}
export const deleteComment = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${baseURL}/comments/${id}`,
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "DELETE_COMMENT",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}

export const addNewPost = (data) => async dispatch => {
    let id = uuid()
    // console.log(data)
    try {
        const res = await axios.post(`${baseURL}/posts`, {
            id: id,
            timestamp: data.timestamp,
            title: data.title,
            body: data.body,
            author: data.author,
            category: data.category
        },
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "ADD_NEW_POST",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}

export const editPost = (id, data) => async dispatch => {
    try {
        const res = await axios.put(`${baseURL}/posts/${id}`,
            {
                title: data.title,
                body: data.body,

            },
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "EDIT_NEW_POST",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${baseURL}/posts/${id}`,
            {
                headers: {
                    authorization: `${token}`,
                },
            })
        dispatch({
            type: "DELETE_NEW_POST",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: "USERS_ERROR",
            payload: console.log(e),
        })
    }
}

//to do => create add comment, edit comment, delete comment, get comments of a post functions
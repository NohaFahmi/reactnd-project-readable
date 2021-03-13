import { combineReducers } from 'redux'
// import data from './usersReducer'

export const data = (state = {}, action) => {
    console.log("ACTION", action);

    switch (action.type) {
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
            }
        case "GET_POSTS":
            return {
                ...state,
                posts: action.payload,
            }
        case "GET_ALL_POSTS":
            let posts = action.payload.filter((a) => a.deleted !== true)
            return {
                ...state,
                posts: posts,
            }
        case "GET_POST_BY_ID":
            return {
                ...state,
                post: action.payload
            }
        case "ADD_NEW_POST":
            return {
                ...state,
                addRes: action.payload,
            }
        case "DELETE_NEW_POST":
            return {
                ...state,
                delRes: action.payload,
            }
        case "EDIT_NEW_POST":
            return {
                ...state,
                editRes: action.payload
            }
        case "GET_POST_COMMENTS":
            let comments = action.payload.filter((a) => a.deleted !== true)
            return {
                ...state,
                postComments: comments
            }
        case "GET_COMMENT":
            return {
                ...state,
                comment: action.payload
            }
        case "EDIT_COMMENT":
            return {
                ...state,
                editRes: action.payload
            }
        case "VOTE_FOR_COMMENT":
            return {
                ...state,
                commentVote: action.payload
            }
        case "ADD_NEW_COMMENT":
            return {
                ...state,
                commentRes: action.payload
            }
        case "DELETE_COMMENT":
            return {
                ...state,
                delCommentRes: action.payload
            }
        default: {
            return state;
        }
    }

}


export default combineReducers({
    data: data
})
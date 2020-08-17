import {
  FETCH_SUCCESS_MARKS,
  ADD_BOOKMARK_MARKS,
  REMOVE_BOOKMARK_MARKS,
} from "./bookmarksTypes"

const initialState = {
  bookmarks: [],
}

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_MARKS:
      return {
        bookmarks: action.payload.data,
      }
    case ADD_BOOKMARK_MARKS:
      return {
        bookmarks: [...state.bookmarks, action.payload],
      }
    case REMOVE_BOOKMARK_MARKS:
      return {
        bookmarks: state.bookmarks.filter(
          (item) => item._id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default bookmarksReducer

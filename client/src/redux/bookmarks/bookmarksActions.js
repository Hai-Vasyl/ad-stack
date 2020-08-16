import {
  FETCH_SUCCESS_MARKS,
  ADD_BOOKMARK_MARKS,
  REMOVE_BOOKMARK_MARKS,
} from "./bookmarksTypes"

export const fetchSuccess = (bookmarks) => {
  return {
    type: FETCH_SUCCESS_MARKS,
    payload: bookmarks,
  }
}
export const addBookmark = (announcement) => {
  return {
    type: ADD_BOOKMARK_MARKS,
    payload: announcement,
  }
}
export const removeBookmark = (announcementId) => {
  return {
    type: REMOVE_BOOKMARK_MARKS,
    payload: announcementId,
  }
}

import { combineReducers } from "redux"
import navbarReducer from "./navbar/navbarReducer"
import authReducer from "./auth/authReducer"
import searchReducer from "./search/searchReducer"
import bookmarksReducer from "./bookmarks/bookmarksReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  search: searchReducer,
  bkmarks: bookmarksReducer,
})
export default rootReducer

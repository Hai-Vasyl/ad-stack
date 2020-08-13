import { combineReducers } from "redux"
import navbarReducer from "./navbar/navbarReducer"
import authReducer from "./auth/authReducer"
import searchReducer from "./search/searchReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  search: searchReducer,
})
export default rootReducer

import { combineReducers } from "redux"
import navbarReducer from "./navbar/navbarReducer"
import authReducer from "./auth/authReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
})
export default rootReducer

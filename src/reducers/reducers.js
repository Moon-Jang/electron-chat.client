import { combineReducers } from 'redux'
import user from "./user"
import chatting from "./chatting"
export default combineReducers({
    user,
    chatting
})
import * as types from "./types"
const fetchUserInfo = () => {
    return {
        type: types.FETCH_USER_INFO_REQUEST,
        payload: {}
    }
}
const fetchFriendList = () => {
    return {
        type: types.FETCH_FRIEND_LIST_REQUEST,
        payload: {}
    }
}
export {
    fetchUserInfo,
    fetchFriendList
}
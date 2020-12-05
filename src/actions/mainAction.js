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

const selectFriend = (idx) => {
    return {
        type: types.SELECT_FRIEND,
        payload: idx
    }
}

const findFriends = (keyword) => {
    return {
        type: types.FIND_FRIENDS_REQUEST,
        payload: keyword
    }
}
const resetFindFriends = () => {
    return {
        type: types.RESET_FIND_FRIENDS
    }
}
export {
    fetchUserInfo,
    fetchFriendList,
    selectFriend,
    findFriends,
    resetFindFriends
}
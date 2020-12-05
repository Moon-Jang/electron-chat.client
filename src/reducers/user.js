const userReducer = {
    FETCH_USER_INFO_SUCCESS: (state, action) => {
        const { idx, name, profile_image_url } = action.payload.result
        return Object.assign(
            {},
            state,
            {
                info: {
                    idx,
                    name,
                    imageUrl: profile_image_url
                }
            }
        )
    },
    FETCH_USER_INFO_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                info: false
            }
        )
    },
    FETCH_FRIEND_LIST_SUCCESS: (state, action) => {
        const { result } = action.payload
        return Object.assign(
            {},
            state,
            {
                friendList: result.sort( (a,b) => a.name.localeCompare(b.name) )
            }
        )
    },
    FETCH_FRIEND_LIST_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                friendList: false
            }
        )
    },
    FIND_FRIENDS_SUCCESS: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                searchedFriendList: action.payload.result
            }
        )
    },
    FIND_FRIENDS_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                searchedFriendList: false
            }
        )
    },
    RESET_FIND_FRIENDS : (state, action) => {
        return Object.assign(
            {},
            state,
            {
                searchedFriendList: undefined
            }
        )
    },
    SELECT_FRIEND: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                selectedFriend: action.payload
            }
        )
    },
}
const reducer = (state = {}, action) => {
    if(userReducer[action.type] === undefined) {
        return state
    }
    else {
        return userReducer[action.type](state, action)
    }
}

export default reducer
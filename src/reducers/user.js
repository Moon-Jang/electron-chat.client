const userReducer = {
    FETCH_USER_INFO_SUCCESS: (state, action) => {
        const { name, profile_image_url } = action.payload.result
        return Object.assign(
            {},
            state,
            {
                ...state,
                info: {
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
                ...state,
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
                ...state,
                friendList: result.sort( (a,b) => a.name.localeCompare(b.name) )
            }
        )
    },
    FETCH_FRIEND_LIST_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                ...state,
                friendList: false
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
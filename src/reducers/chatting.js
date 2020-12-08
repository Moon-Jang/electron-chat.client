const chattingReducer = {
    FETCH_CONVERSATION: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                conversation: action.payload
            }
        )
    },
    FETCH_CHATTING_ROOM_LIST_SUCCESS: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                rooms: action.payload.result
            }
        )
    },
    FETCH_CHATTING_ROOM_LIST_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                rooms: false
            }
        )
    },
    FETCH_PARTICIPANT_LIST_SUCCESS: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                participants: action.payload.result
            }
        )
    },
    FETCH_PARTICIPANT_LIST_FAILURE: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                participants: false
            }
        )
    },
}
const reducer = (state = {}, action) => {
    if(chattingReducer[action.type] === undefined) {
        return state
    }
    else {
        return chattingReducer[action.type](state, action)
    }
}

export default reducer
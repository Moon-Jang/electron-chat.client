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
    FETCH_CHATTING_ROOM_INFO: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                info: action.payload
            }
        )
    },
    FETCH_PARTICIPANT_LIST: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                participants: action.payload
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
    EXIT_ROOM: (state, action) => {
        const { userIdx } = action.payload
        const exitedUser = state.participants.find( el => el.idx === userIdx )
        exitedUser.isExited = "Y"
        console.log("participants",state.participants)
        return Object.assign(
            {},
            state,
            {
                participants: [...state.participants]
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
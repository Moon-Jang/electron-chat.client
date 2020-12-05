const chattingReducer = {
    FETCH_CONVERSATION: (state, action) => {
        return Object.assign(
            {},
            state,
            {
                ...state,
                conversation: action.payload
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
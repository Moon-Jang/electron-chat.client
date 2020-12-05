import * as types from "./types"

const fetchConversation = (conversation) => ({
    type: types.FETCH_CONVERSATION,
    payload: conversation
})

export {
    fetchConversation
}
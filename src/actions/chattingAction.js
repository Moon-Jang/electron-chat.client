import * as types from "./types"

const fetchConversation = (conversation) => ({
    type: types.FETCH_CONVERSATION,
    payload: conversation
})

const fetchParticipantList = (roomIdx) => ({
    type: types.FETCH_PARTICIPANT_LIST_REQUEST,
    payload: { roomIdx }
})
export {
    fetchConversation,
    fetchParticipantList
}
import * as types from "./types"

const fetchConversation = (conversation) => ({
    type: types.FETCH_CONVERSATION,
    payload: conversation
})

const fetchParticipantList = (roomIdx) => ({
    type: types.FETCH_PARTICIPANT_LIST_REQUEST,
    payload: { roomIdx }
})

const exitRoom = (userIdx) => ({
    type: types.EXIT_ROOM,
    payload: { userIdx }
})
export {
    fetchConversation,
    fetchParticipantList,
    exitRoom
}
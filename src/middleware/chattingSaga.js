import { call, takeLatest, put, all, fork } from 'redux-saga/effects'
import { FETCH_CHATTING_ROOM_LIST_REQUEST, FETCH_CHATTING_ROOM_LIST_SUCCESS, FETCH_PARTICIPANT_LIST_FAILURE, FETCH_PARTICIPANT_LIST_REQUEST } from '../actions/types'
import { FETCH_CHATTING_ROOM_LIST_FAILURE } from "../actions/types"
import { API_getChattingRooms, API_getParticipantList } from '../api'
import { FETCH_PARTICIPANT_LIST_SUCCESS } from "./../actions/types"
function* fetchChattingRoomList(action) {
    try {
        const response = yield call(API_getChattingRooms)
        yield put({type: FETCH_CHATTING_ROOM_LIST_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FETCH_CHATTING_ROOM_LIST_FAILURE, payload: e})
    }
}

function* fetchParticipantList(action) {
    try {
        const response = yield call(API_getParticipantList,action.payload)
        yield put({type: FETCH_PARTICIPANT_LIST_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FETCH_PARTICIPANT_LIST_FAILURE, payload: e})
    }
}


function* watch() {
    yield takeLatest(FETCH_CHATTING_ROOM_LIST_REQUEST, fetchChattingRoomList)
    yield takeLatest(FETCH_PARTICIPANT_LIST_REQUEST, fetchParticipantList)
}

export default function* chattingMiddleware() {
    yield all([
        fork(watch),
    ])
}
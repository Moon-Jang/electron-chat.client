import { call, takeLatest, put, all, fork } from 'redux-saga/effects'
import { FETCH_CHATTING_ROOM_LIST_REQUEST, FETCH_CHATTING_ROOM_LIST_SUCCESS } from '../actions/types'
import { API_getFriendList } from '../api'
import { FETCH_CHATTING_ROOM_LIST_FAILURE } from "../actions/types"
function* fetchChattingRoomList(action) {
    try {
        const response = yield call(API_getFriendList)
        yield put({type: FETCH_CHATTING_ROOM_LIST_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FETCH_CHATTING_ROOM_LIST_FAILURE, payload: e})
    }
}


function* watch() {
    yield takeLatest(FETCH_CHATTING_ROOM_LIST_REQUEST, fetchChattingRoomList)
}

export default function* chattingMiddleware() {
    yield all([
        fork(watch),
    ])
}
import { call, takeLatest, put, all, fork } from 'redux-saga/effects'
import { FETCH_USER_INFO_FAILURE, FETCH_USER_INFO_REQUEST,
        FETCH_USER_INFO_SUCCESS, FETCH_FRIEND_LIST_REQUEST,
        FETCH_FRIEND_LIST_FAILURE, FIND_FRIENDS_REQUEST,
        FIND_FRIENDS_SUCCESS, FIND_FRIENDS_FAILURE } from '../actions/types'
import { API_findFriends, API_getFriendList, API_getUserInfo } from '../api'
import { FETCH_FRIEND_LIST_SUCCESS } from "./../actions/types"
function* fetchUser(action) {
    try {
        const response = yield call(API_getUserInfo)
        if(!response || response?.status !== 200) {
            throw response
        }
        yield put({type: FETCH_USER_INFO_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FETCH_USER_INFO_FAILURE, payload: e})
    }
}

function* fetchFriendList(action) {
    try {
        const response = yield call(API_getFriendList)
        yield put({type: FETCH_FRIEND_LIST_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FETCH_FRIEND_LIST_FAILURE, payload: e})
    }
}

function* findFriends(action) {
    try {
        const { payload } = action
        const response = yield call(API_findFriends,{ keyword: payload })
        yield put({type: FIND_FRIENDS_SUCCESS, payload: response.data})
    } catch (e) {
        console.log('saga errorCatch', e)
        yield put({type: FIND_FRIENDS_FAILURE, payload: e})
    }
}

function* watch() {
    yield takeLatest(FETCH_USER_INFO_REQUEST, fetchUser)
    yield takeLatest(FETCH_FRIEND_LIST_REQUEST, fetchFriendList)
    yield takeLatest(FIND_FRIENDS_REQUEST, findFriends)
}

export default function* myMiddleware() {
    yield all([
        fork(watch),
    ])
}
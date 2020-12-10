import { all, fork } from 'redux-saga/effects'
import chattingMiddleware from './chattingSaga'
import myMiddleware from './userSaga'
export default function* rootSaga()  {
    yield all([
        fork(myMiddleware),
        fork(chattingMiddleware)
        // fork(groupMiddleware)
    ])
}
import { all, fork } from 'redux-saga/effects'
import myMiddleware from './userSaga'
export default function* rootSaga()  {
    yield all([
        fork(myMiddleware),
        // fork(groupMiddleware)
    ])
}
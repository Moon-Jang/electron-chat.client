import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import {
    exitRoom,
    fetchConversation,
    fetchParticipantList,
} from "../../actions/chattingAction"
import {
    FETCH_CHATTING_ROOM_INFO,
    FETCH_PARTICIPANT_LIST,
    FETCH_USER_INFO,
} from "../../actions/types"
import SocketContext from "./context/SocketContext"

const MAX_CONNECTION_CNT = 10
const WebSocketComponent = (props) => {
    const { roomIdx, userName, children } = props
    const [isClose, setIsClose] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isConnect, setisConnect] = useState(false)
    const connectionCnt = useRef(0)
    const dispatch = useDispatch()
    const socket = useMemo(
        () =>
            new WebSocket(
                `ws://localhost:3001?roomIdx=${roomIdx}&userName=${userName}&jwt=${localStorage.jwt}&reconnectCnt=${connectionCnt.current}`
            ),
        [isClose] //eslint-disable-line
    )
    useEffect(() => {
        if (connectionCnt.current < MAX_CONNECTION_CNT) {
            setupSocket(socket)
            console.log("connect_cnt", connectionCnt.current)
            connectionCnt.current++
        }
        return () => {
            //willUnMount.current = true
            //connectionCnt.current = MAX_CONNECTION_CNT
            //socket.close()
        }
        //eslint-disable-next-line
    }, [isClose])

    const setupSocket = (socket) => {
        socket.onopen = function (event) {
            console.log("Websocket connect Success")
            setIsClose(false)
            const payload = {
                action: "init",
            }
            setTimeout(() => socket.send(JSON.stringify(payload)), 300)
        }
        socket.onmessage = function (event) {
            console.log("event", event)
            const { routeKey, payload } = JSON.parse(event.data)
            console.log("payload", payload)
            console.log("routeKey", routeKey)
            if (!routeKey || !payload) {
                setIsError(true)
                return
            }
            if (payload.error) {
                console.log("WebSocket Error => " + payload.errorMessage)
                setIsError(true)
                return
            }
            if (routeKey === "init") {
                if (!payload.conversation) {
                    setIsError(true)
                    return
                }
                const conversation = JSON.parse(payload.conversation)
                const { participants, roomInfo, userInfo } = payload
                setisConnect(true)

                dispatch({ type: FETCH_USER_INFO, payload: userInfo })
                dispatch({ type: FETCH_CHATTING_ROOM_INFO, payload: roomInfo })
                dispatch({
                    type: FETCH_PARTICIPANT_LIST,
                    payload: participants,
                })
                dispatch(fetchConversation(conversation))
            } else if (routeKey === "error") {
                const { errorCode, errorString } = payload
                alert(
                    "에러가 발생했습니다\n" +
                        `에러메세지: ${errorString}\n` +
                        `에러코드: ${errorCode}`
                )
            } else if (routeKey === "sendMessage") {
                const conversation = JSON.parse(payload.conversation)
                dispatch(fetchConversation(conversation))
            } else if (routeKey === "exitRoom") {
                const conversation = JSON.parse(payload.conversation)
                const { exitedUser } = payload
                dispatch(exitRoom(exitedUser))
                dispatch(fetchConversation(conversation))
            } else if (routeKey === "invite") {
                const conversation = JSON.parse(payload.conversation)
                dispatch(fetchConversation(conversation))
                dispatch(fetchParticipantList(roomIdx))
            }
        }

        socket.onerror = function (error) {
            // dispatch(fetchGroupFail(groupId))
            // if( socket.readyState === 3 ) {
            //     isAdmin.current = false
            // } else {
            //     setIsError(true)
            // }
            console.log("WebSocket Error: ", error)
        }
        socket.onclose = function (event) {
            console.log("Disconnected from WebSocket.")
            setIsClose(true)
            // if ( !isAdmin.current ) {
            //     history.replace(`../book/${groupId}`)
            // } else {
            //     if ( !willUnMount.current ) {
            //         setIsClose(true)
            //     }
            // }
        }
    }

    return (
        <SocketContext.Provider
            value={{ socket, isConnect, isClose, isError, roomIdx }}>
            {children}
        </SocketContext.Provider>
    )
}

export default WebSocketComponent

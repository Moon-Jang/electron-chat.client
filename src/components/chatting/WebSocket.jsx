import React, { useEffect, useMemo, useState } from "react"
import SocketContext from "./context/SocketContext"
const WebSocketComponent = (props) => {
    const { roomIdx, children } = props
    const [isClose, setIsClose] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isConnect, setisConnect] = useState(false)

    const socket = useMemo(
        () =>
            new WebSocket(
                "ws://localhost:3001?roomIdx=1"
                // "wss://8ts73v5434.execute-api.ap-northeast-2.amazonaws.com/dev" +
                //     `?group_id=${groupId}&Auth=${localStorage.jwt}`
            ),
        //eslint-disable-next-line
        []
    )

    useEffect(() => {
        socket.onopen = function (event) {
            console.log("Websocket connect Success")
            const payload = {
                action: "init",
            }
            socket.send(JSON.stringify(payload))
        }
        socket.onmessage = function (event) {
            //console.log("event",event)
            const { routeKey, payload } = JSON.parse(event.data)
            console.log("routeKey", routeKey)
            if (!routeKey) {
                return
            }
            if (routeKey === "init") {
                setisConnect(true)
                const conversation = JSON.parse(payload.conversation)
                console.log("payload", payload)
                console.log("conversation", conversation)
                if (!conversation) {
                    setIsError(true)
                }
                // dispatch(fetchGroupInfo(groupId,info))
                // dispatch(fetchGroupTitle(groupId, title))
                // dispatch(fetchGroupCategoryItems(groupId, categoryItems))
                // dispatch(fetchAdminCategoryItems(groupId, adminItems))
                // dispatch(fetchGroupContents(groupId, contents))
            } else if (routeKey === "error") {
                const { errorCode, errorString } = payload
                alert(
                    "에러가 발생했습니다\n" +
                        `에러메세지: ${errorString}\n` +
                        `에러코드: ${errorCode}`
                )
            } else if (routeKey === "sendMessage") {
                // const contents = JSON.parse(data.content)
                // console.log("contents",contents)
                // dispatch(fetchGroupContents(groupId, contents))
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
        return () => {
            //willUnMount.current = true
            socket.close()
        }
        //eslint-disable-next-line
    }, [])

    return (
        <SocketContext.Provider
            value={{ socket, isConnect, isClose, isError, roomIdx }}>
            {children}
        </SocketContext.Provider>
    )
}

export default WebSocketComponent

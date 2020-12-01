import React, { useEffect, useMemo } from "react"
import SocketContext from "./context/SocketContext"
const WebSocketComponent = (props) => {
    const { groupId, children } = props
    // const history = useHistory()
    // const [isClose, setIsClose] = useState(false)
    // const [isError, setIsError] = useState(false)
    // const [isConnect, setisConnect] = useState(false)
    // const willUnMount = useRef(false)

    const socket = useMemo(
        () =>
            new WebSocket(
                "wss://8ts73v5434.execute-api.ap-northeast-2.amazonaws.com/dev" +
                    `?group_id=${groupId}&Auth=${localStorage.jwt}`
            ),
        //eslint-disable-next-line
        []
    )

    useEffect(() => {
        socket.onopen = function (event) {
            console.log("Websocket connect Success")
            // setisConnect(true)
            const payload = {
                action: "init",
            }
            socket.send(JSON.stringify(payload))
        }
        socket.onmessage = function (event) {
            //console.log("event",event)
            const { routeKey, data } = JSON.parse(event.data)
            console.log("routeKey", routeKey)
            if (!routeKey) {
                return
            }
            if (routeKey === "init") {
                // const info = data.info
                // const title = data.title
                // const categoryItems = data.categoryItems
                // const adminItems = data.adminItems
                // const contents = JSON.parse(data.content)
                // if( !contents ) {
                //     history.push("../selectgroup/mine")
                // }
                // if( !data || !info || !title || !categoryItems || !adminItems  ) {
                //     // eslint-disable-next-line
                //     const result_confirm = confirm("서버와 연결이 끊겼습니다\n 다시시도 하시겠습니까?")
                //     if (result_confirm) {
                //         history.go(0)
                //     }
                //     history.push("../selectgroup/mine")
                // }
                // dispatch(fetchGroupInfo(groupId,info))
                // dispatch(fetchGroupTitle(groupId, title))
                // dispatch(fetchGroupCategoryItems(groupId, categoryItems))
                // dispatch(fetchAdminCategoryItems(groupId, adminItems))
                // dispatch(fetchGroupContents(groupId, contents))
            } else if (routeKey === "error") {
                const { errorCode, errorString } = data
                alert(
                    "에러가 발생했습니다\n" +
                        `에러메세지: ${errorString}\n` +
                        `에러코드: ${errorCode}`
                )
            } else {
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
            // console.log("Disconnected from WebSocket.")
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
        // <SocketContext.Provider
        //     value={{ socket, isConnect, isClose, isError, groupId }}>
        //     {children}
        // </SocketContext.Provider>
        <>{children}</>
    )
}

export default WebSocketComponent

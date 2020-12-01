import { createContext } from "react"


/*
export interface SocketContextType {
    socket : WebSocket,
    isConnect: boolean,
    isError: boolean,
    isClose: boolean,
    groupId: string
}
*/
const SocketContext = createContext(null)

export default SocketContext
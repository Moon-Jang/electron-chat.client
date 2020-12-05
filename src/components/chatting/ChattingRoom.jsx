import React from "react"
import { useLocation, useParams } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/chatting.sass"
import { parseQueryString } from "../../util"
import Chatting from "./Chatting"
import Footer from "./Footer"
import Header from "./Header"
import WebSocketComponent from "./WebSocket"
const ChattingRoom = (props) => {
    const { roomIdx } = useParams()
    const { search } = useLocation()
    const queryString = parseQueryString(search.slice(1))
    const { roomName, userName } = queryString

    const clearView = () => {
        const hamburgerInput = document.getElementById("hamburgerInput")
        if (hamburgerInput.checked) {
            hamburgerInput.checked = false
        }
    }

    return (
        <BasicLayout>
            <WebSocketComponent roomIdx={roomIdx} userName={userName}>
                <div className="chatting_page" onClick={clearView}>
                    <Header roomName={roomName} />
                    <Chatting userName={userName} />
                    <Footer userName={userName} />
                </div>
            </WebSocketComponent>
        </BasicLayout>
    )
}

export default ChattingRoom

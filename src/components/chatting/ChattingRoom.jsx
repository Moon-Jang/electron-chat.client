import React from "react"
import { useLocation, useParams } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/chatting.sass"
import "../../styles/emoticon.sass"
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
    const isPersonal = queryString.isPersonal === "true" ? true : false
    const isPassed = queryString.isPassed === "true" ? true : false

    const clearView = () => {
        const hamburgerInput = document.getElementById("hamburgerInput")
        if (hamburgerInput.checked) {
            hamburgerInput.checked = false
        }
    }

    return (
        <BasicLayout>
            <WebSocketComponent
                roomIdx={roomIdx}
                userName={userName}
                isPassed={isPassed}>
                <div className="chatting_page" onClick={clearView}>
                    <Header
                        roomIdx={roomIdx}
                        roomName={roomName}
                        userName={userName}
                        isPersonal={isPersonal}
                    />
                    <Chatting userName={userName} roomIdx={roomIdx} />
                    <Footer userName={userName} roomIdx={roomIdx} />
                </div>
            </WebSocketComponent>
        </BasicLayout>
    )
}

export default ChattingRoom

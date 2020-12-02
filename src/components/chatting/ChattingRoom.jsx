import React from "react"
import { useParams } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/chatting.sass"
import Chatting from "./Chatting"
import Footer from "./Footer"
import Header from "./Header"
import WebSocketComponent from "./WebSocket"
const ChattingRoom = (props) => {
    const { roomIdx } = useParams()
    const clearView = () => {
        const hamburgerInput = document.getElementById("hamburgerInput")
        if (hamburgerInput.checked) {
            hamburgerInput.checked = false
        }
    }

    return (
        <BasicLayout>
            <WebSocketComponent roomIdx={roomIdx}>
                <div className="chatting_page" onClick={clearView}>
                    <Header />
                    <Chatting />
                    <Footer />
                </div>
            </WebSocketComponent>
        </BasicLayout>
    )
}

export default ChattingRoom

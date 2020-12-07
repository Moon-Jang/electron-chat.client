import React, { useContext, useState } from "react"
import { alertDialog } from "../../util"
import { AlertContext } from "../router"
import SocketContext from "./context/SocketContext"
const Footer = (props) => {
    const { userName } = props
    const { socket, isConnect, isClose } = useContext(SocketContext)
    const alertContext = useContext(AlertContext)
    const [text, setText] = useState("")
    const handleChange = (e) => {
        const { value } = e.target
        setText(value)
    }
    const sendMessage = (msg) => {
        if (!isConnect) {
            return
        }
        if (isClose) {
            alertDialog(alertContext, "연결이 끊겼습니다. 다시 시도해주세요.")
            return
        }
        const currentDate = new Date()
        const message = {
            payload: {
                type: "message",
                name: userName,
                message: msg,
                time: currentDate.getTime(),
            },
        }
        const payload = {
            action: "sendMessage",
            body: JSON.stringify(message),
        }
        console.log(payload)
        socket.send(JSON.stringify(payload))
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            text && sendMessage(text)
            setText("")
        }
    }
    const handleButtonClick = () => {
        if (!text) {
            return
        }
        sendMessage(text)
        setText("")
    }
    return (
        <div className="input_area">
            <div className="icon emoticon"></div>
            <div className="icon file"></div>
            <div className="icon picture"></div>
            <textarea
                className="input_message"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button type="button" id="send_button" onClick={handleButtonClick}>
                전송
            </button>
        </div>
    )
}

export default Footer

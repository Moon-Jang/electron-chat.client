import React, { useContext, useState } from "react"
import SocketContext from "./context/SocketContext"
const Footer = (props) => {
    const { userName } = props
    const { socket, isConnect } = useContext(SocketContext)
    const [text, setText] = useState("")
    const handleChange = (e) => {
        const { value } = e.target
        setText(value)
    }
    const sendMessage = (msg) => {
        if (!isConnect) {
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
            console.log("Enter keyup")
            sendMessage(text)
            setText("")
        }
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
            <button type="button" id="send_button">
                전송
            </button>
        </div>
    )
}

export default Footer

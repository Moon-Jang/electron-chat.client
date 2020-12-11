import { IconButton } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { alertDialog } from "../../util"
import { AlertContext } from "../router"
import SocketContext from "./context/SocketContext"
import CloseIcon from "@material-ui/icons/Close"
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
            <div className="icon attachment"></div>
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
            <EmoticonModal />
        </div>
    )
}

const EmoticonModal = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div
            className="emoticon_modal_wrap"
            style={{ display: visible ? "" : "" }}>
            <div className="header_wrap">
                <h4>이모티콘</h4>
                <IconButton onClick={() => setVisible(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="emoticon_wrap">
                <div className="emoticon angel" data-name="angel" />
                <div className="emoticon angry-2" data-name="angry-2" />
                <div className="emoticon baby-1" data-name="baby-1" />
                <div className="emoticon confused-3" data-name="confused-3" />
                <div className="emoticon creepy" data-name="creepy" />
                <div className="emoticon crying-3" data-name="crying-3" />
                <div className="emoticon dead-2" data-name="dead-2" />
                <div className="emoticon dead-4" data-name="dead-4" />
                <div className="emoticon desperate-1" data-name="desperate-1" />
                <div className="emoticon gentleman-3" data-name="gentleman-3" />
                <div className="emoticon happy-6" data-name="happy-6" />
                <div className="emoticon happy-8" data-name="happy-8" />
                <div className="emoticon happy-9" data-name="happy-9" />
                <div className="emoticon happy-10" data-name="happy-10" />
                <div className="emoticon happy-11" data-name="happy-11" />
                <div className="emoticon in-love-2" data-name="in-love-2" />
                <div className="emoticon in-love-3" data-name="in-love-3" />
                <div className="emoticon in-love-4" data-name="in-love-4" />
                <div className="emoticon kiss-1" data-name="kiss-1" />
                <div className="emoticon kiss-2" data-name="kiss-2" />
                <div className="emoticon laughing-1" data-name="laughing-1" />
                <div className="emoticon nerd-3" data-name="nerd-3" />
                <div className="emoticon ninja" data-name="ninja" />
                <div className="emoticon pirate-2" data-name="pirate-2" />
                <div className="emoticon relieved" data-name="relieved" />
                <div className="emoticon rich" data-name="rich" />
                <div className="emoticon sad-1" data-name="sad-1" />
                <div className="emoticon sad-2" data-name="sad-2" />
                <div className="emoticon sad-3" data-name="sad-3" />
                <div className="emoticon sad-4" data-name="sad-4" />
                <div className="emoticon sad-5" data-name="sad-5" />
                <div className="emoticon sceptic-4" data-name="sceptic-4" />
                <div className="emoticon sceptic-5" data-name="sceptic-5" />
                <div className="emoticon sceptic-6" data-name="sceptic-6" />
                <div className="emoticon sceptic" data-name="sceptic" />
                <div className="emoticon secret" data-name="secret" />
                <div className="emoticon shocked-2" data-name="shocked-2" />
                <div className="emoticon shocked-3" data-name="shocked-3" />
                <div className="emoticon sick-2" data-name="sick-2" />
                <div className="emoticon silent" data-name="silent" />
                <div className="emoticon smile" data-name="smile" />
                <div className="emoticon smiling-1" data-name="smiling-1" />
                <div className="emoticon smug-3" data-name="smug-3" />
                <div className="emoticon thinking" data-name="thinking" />
                <div className="emoticon wink-1" data-name="wink-1" />
                <div className="emoticon winking" data-name="winking" />
                <div className="emoticon yawning-2" data-name="yawning-2" />
            </div>
        </div>
    )
}

export default Footer

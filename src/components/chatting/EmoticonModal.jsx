import { IconButton } from "@material-ui/core"
import React, { useContext } from "react"
import CloseIcon from "@material-ui/icons/Close"
import SocketContext from "./context/SocketContext"
import { AlertContext } from "./../router"
import { alertDialog } from "../../util"
const EmoticonModal = (props) => {
    const { visibleState, userName } = props
    const [visible, setVisible] = visibleState
    const { socket, isConnect, isClose } = useContext(SocketContext)
    const alertContext = useContext(AlertContext)
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

    const handleEmoticonClick = (name) => {
        const message = `/emoticon ${name}`
        sendMessage(message)
        setVisible(false)
    }
    return (
        <div
            className="emoticon_modal_wrap"
            style={{ display: visible ? "flex" : "none" }}>
            <div className="header_wrap">
                <h4>이모티콘</h4>
                <IconButton onClick={() => setVisible(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="emoticon_wrap">
                <Emoticon name="angel" onClick={handleEmoticonClick} />
                <Emoticon name="angry-2" onClick={handleEmoticonClick} />
                <Emoticon name="baby-1" onClick={handleEmoticonClick} />
                <Emoticon name="confused-3" onClick={handleEmoticonClick} />
                <Emoticon name="creepy" onClick={handleEmoticonClick} />
                <Emoticon name="crying-3" onClick={handleEmoticonClick} />
                <Emoticon name="dead-2" onClick={handleEmoticonClick} />
                <Emoticon name="dead-4" onClick={handleEmoticonClick} />
                <Emoticon name="desperate-1" onClick={handleEmoticonClick} />
                <Emoticon name="gentleman-3" onClick={handleEmoticonClick} />
                <Emoticon name="happy-6" onClick={handleEmoticonClick} />
                <Emoticon name="happy-8" onClick={handleEmoticonClick} />
                <Emoticon name="happy-9" onClick={handleEmoticonClick} />
                <Emoticon name="happy-10" onClick={handleEmoticonClick} />
                <Emoticon name="happy-11" onClick={handleEmoticonClick} />
                <Emoticon name="in-love-2" onClick={handleEmoticonClick} />
                <Emoticon name="in-love-3" onClick={handleEmoticonClick} />
                <Emoticon name="in-love-4" onClick={handleEmoticonClick} />
                <Emoticon name="kiss-1" onClick={handleEmoticonClick} />
                <Emoticon name="kiss-2" onClick={handleEmoticonClick} />
                <Emoticon name="laughing-1" onClick={handleEmoticonClick} />
                <Emoticon name="nerd-3" onClick={handleEmoticonClick} />
                <Emoticon name="ninja" onClick={handleEmoticonClick} />
                <Emoticon name="pirate-2" onClick={handleEmoticonClick} />
                <Emoticon name="relieved" onClick={handleEmoticonClick} />
                <Emoticon name="rich" onClick={handleEmoticonClick} />
                <Emoticon name="sad-1" onClick={handleEmoticonClick} />
                <Emoticon name="sad-2" onClick={handleEmoticonClick} />
                <Emoticon name="sad-3" onClick={handleEmoticonClick} />
                <Emoticon name="sad-4" onClick={handleEmoticonClick} />
                <Emoticon name="sad-5" onClick={handleEmoticonClick} />
                <Emoticon name="sceptic-4" onClick={handleEmoticonClick} />
                <Emoticon name="sceptic-5" onClick={handleEmoticonClick} />
                <Emoticon name="sceptic-6" onClick={handleEmoticonClick} />
                <Emoticon name="sceptic" onClick={handleEmoticonClick} />
                <Emoticon name="secret" onClick={handleEmoticonClick} />
                <Emoticon name="shocked-2" onClick={handleEmoticonClick} />
                <Emoticon name="shocked-3" onClick={handleEmoticonClick} />
                <Emoticon name="sick-2" onClick={handleEmoticonClick} />
                <Emoticon name="silent" onClick={handleEmoticonClick} />
                <Emoticon name="smile" onClick={handleEmoticonClick} />
                <Emoticon name="smiling-1" onClick={handleEmoticonClick} />
                <Emoticon name="smug-3" onClick={handleEmoticonClick} />
                <Emoticon name="thinking" onClick={handleEmoticonClick} />
                <Emoticon name="wink-1" onClick={handleEmoticonClick} />
                <Emoticon name="winking" onClick={handleEmoticonClick} />
            </div>
        </div>
    )
}

const Emoticon = React.memo((props) => {
    const { name, onClick } = props

    const handleClick = (e) => {
        console.log(name)
        onClick(name)
    }
    return <div className={`emoticon ${name}`} onClick={handleClick} />
})
export default EmoticonModal

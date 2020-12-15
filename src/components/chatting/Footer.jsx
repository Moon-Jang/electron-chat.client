import React, { useContext, useState } from "react"
import { useRef } from "react"
import { API_sendFile } from "../../api"
import { alertDialog, happenApiError, resizeImage } from "../../util"
import { AlertContext } from "../router"
import SocketContext from "./context/SocketContext"
import EmoticonModal from "./EmoticonModal"
const Footer = (props) => {
    const { userName, roomIdx } = props
    const { socket, isConnect, isClose } = useContext(SocketContext)
    const alertContext = useContext(AlertContext)
    const [text, setText] = useState("")
    const emoticonModalVisibleState = useState(false)
    const [visible, setVisible] = emoticonModalVisibleState
    const attachmentInputRef = useRef(null)
    const pictureInputRef = useRef(null)
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
    const handleAttachmentChange = async (e) => {
        const { files } = e.target
        if (!files.length) {
            return
        }
        if (files[0].size > 1024 * 1024 * 5) {
            e.target.value = null
            e.target.setAttribute("value", "")
            alertDialog(alertContext, "5MB 이상의 파일은 업로드 불가능 합니다.")
            return
        }
        console.log(files[0])
        const formData = new FormData()
        formData.append("roomIdx", roomIdx)
        formData.append("file", files[0], files[0].name)
        formData.append("isAttachment", true)
        const response = await API_sendFile(formData)
        if (happenApiError(response, alertContext, null, true)) {
            return
        }
        const attachmentUrl = response.data.result
        const message = `/file ${attachmentUrl}`
        sendMessage(message)
    }
    const handlePictureChange = async (e) => {
        const { files } = e.target
        if (!files.length) {
            return
        }
        if (!files[0].type.match(/image\/*/i)) {
            e.target.value = null
            e.target.setAttribute("value", "")
            alertDialog(
                alertContext,
                "이미지 파일만 업로드 가능합니다.\n다시 시도해주세요."
            )
            return
        }
        let payloadFile
        const resizedImageBlob = await resizeImage(files[0], 640)
        if (!resizedImageBlob) {
            payloadFile = files[0]
        } else {
            payloadFile = resizedImageBlob
        }
        const formData = new FormData()
        formData.append("roomIdx", roomIdx)
        formData.append("file", payloadFile, files[0].name)
        const response = await API_sendFile(formData)
        if (happenApiError(response, alertContext, null, true)) {
            return
        }
        const imageUrl = response.data.result
        const message = `/image ${imageUrl}`
        sendMessage(message)
    }

    return (
        <div className="input_area">
            <div
                className="icon emoticon"
                onClick={() => setVisible(!visible)}></div>
            <div
                className="icon attachment"
                onClick={() => attachmentInputRef.current.click()}></div>
            <div
                className="icon picture"
                onClick={() => pictureInputRef.current.click()}></div>
            <textarea
                className="input_message"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button type="button" id="send_button" onClick={handleButtonClick}>
                전송
            </button>
            <EmoticonModal
                userName={userName}
                visibleState={emoticonModalVisibleState}
            />
            <input
                type="file"
                ref={attachmentInputRef}
                onChange={handleAttachmentChange}
            />
            <input
                type="file"
                ref={pictureInputRef}
                onChange={handlePictureChange}
            />
        </div>
    )
}

export default Footer

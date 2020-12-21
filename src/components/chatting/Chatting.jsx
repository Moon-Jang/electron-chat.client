import React, { useContext, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import SocketContext from "./context/SocketContext"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
const Chatting = (props) => {
    const { userName, roomIdx } = props
    const { isConnect, isClose } = useContext(SocketContext)
    const participants = useSelector((store) => store.chatting.participants)
    const conversation = useSelector((store) => store.chatting.conversation)
    const wrapDivRef = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            if (wrapDivRef.current) {
                wrapDivRef.current.scrollTop = wrapDivRef.current.scrollHeight
            }
        }, 100)
    }, [conversation])
    const renderChat = (conversation) => {
        if (!conversation) {
            return
        }
        if (!participants) {
            return
        }
        if (isClose) {
            return <div>서버 연결이 끊겼습니다. 다시 시도해주세요.</div>
        }
        return conversation.map((el, idx) => {
            switch (el.type) {
                case "system":
                    return <SystemChat key={el.time} message={el.message} />
                case "message":
                    return el.name === userName ? (
                        <MyChat key={el.time} roomIdx={roomIdx} {...el} />
                    ) : (
                        <OtherChat
                            key={el.time}
                            parentChat={conversation[idx - 1]}
                            participants={participants}
                            roomIdx={roomIdx}
                            {...el}
                        />
                    )
                default:
                    return (
                        <SystemChat
                            key={idx}
                            message={"메세지 로딩중 서버 에러가 발생했습니다."}
                        />
                    )
            }
        })
    }
    return (
        <div className="chatting_area" ref={wrapDivRef}>
            {isConnect ? renderChat(conversation) : <div>로딩중입니다.</div>}
        </div>
    )
}

const SystemChat = React.memo(({ message }) => {
    return (
        <div className="chat_wrap system">
            <div className="message_wrap">
                <span className="bar left"></span>
                <span className="message">{message}</span>
                <span className="bar right"></span>
            </div>
        </div>
    )
})

const OtherChat = React.memo((props) => {
    const { name, message, time, parentChat, participants, roomIdx } = props
    const timeString = useMemo(() => formatTime(time), [time])
    const imageUrl = participants.find((el) => el.name === name).profileImageUrl

    return (
        <div className="chat_wrap message other">
            <div className="profile_wrap">
                {parentChat.name !== name && (
                    <>
                        <div
                            className="profile_image"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                            }}></div>
                        <p>{name}</p>
                    </>
                )}
            </div>
            <Message
                message={message}
                userType="other"
                timeString={timeString}
                roomIdx={roomIdx}
            />
        </div>
    )
})

const MyChat = React.memo((props) => {
    const { message, time, roomIdx } = props
    const timeString = useMemo(() => formatTime(time), [time])

    return (
        <div className="chat_wrap message me">
            <Message
                message={message}
                userType="my"
                roomIdx={roomIdx}
                timeString={timeString}
            />
        </div>
    )
})

function formatTime(timestamp) {
    const date = new Date(timestamp)
    const tempHour = date.getHours()
    const offset = tempHour > 12 ? "오후" : "오전"
    let hours = tempHour > 12 ? tempHour - 12 : tempHour
    let minutes = date.getMinutes()
    hours = hours > 10 ? hours : "0" + hours
    minutes = minutes > 10 ? minutes : "0" + minutes
    return `${offset} ${hours}:${minutes}`
}

const Message = (props) => {
    const { message, timeString, userType, roomIdx } = props
    const s3Url = `https://electron-chat-file-storage.s3.ap-northeast-2.amazonaws.com/chatting_room_${roomIdx}/`
    const anchorRef = useRef(null)
    const renderMessage = () => {
        const [type, name] = message.split(" ")
        switch (type) {
            case "/emoticon":
                return (
                    <>
                        <div className="message emoticon">
                            <div className={`emoticon ${name}`}></div>
                        </div>
                    </>
                )
            case "/image":
                return (
                    <>
                        <div className="message">
                            <div
                                className={`image`}
                                style={{
                                    backgroundImage: `url(${s3Url + name})`,
                                }}></div>
                        </div>
                    </>
                )
            case "/file":
                // let blob = await fetch(url).then(r => r.blob());
                // const blob = dataURItoBlob(`${s3Url + name}`)
                // console.log("blob", blob)
                return (
                    <>
                        <div
                            className="message"
                            onClick={() => anchorRef.current.click()}>
                            <div className={`file`}>
                                <div className="svg_wrap">
                                    <InsertDriveFileIcon />
                                </div>
                                <div className="file_name_wrap">
                                    <a href={`${s3Url + name}`} ref={anchorRef}>
                                        {decodeURI(name)}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <div className="message">{message}</div>
                    </>
                )
        }
    }
    return (
        <div className="message_wrap">
            {userType === "other" ? (
                <>
                    <span className="white_space"></span>
                    {renderMessage()}
                    <span className="time">{timeString}</span>
                </>
            ) : (
                <>
                    {renderMessage()}
                    <span className="time">{timeString}</span>
                    <span className="white_space"></span>
                </>
            )}
        </div>
    )
}

export default Chatting

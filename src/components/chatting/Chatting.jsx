import React, { useContext, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import SocketContext from "./context/SocketContext"
const Chatting = (props) => {
    const { userName } = props
    const { isConnect } = useContext(SocketContext)
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
        return conversation.map((el, idx) => {
            switch (el.type) {
                case "system":
                    return <SystemChat key={el.time} message={el.message} />
                case "message":
                    return el.name === userName ? (
                        <MyChat key={el.time} {...el} />
                    ) : (
                        <OtherChat
                            key={el.time}
                            parentChat={conversation[idx - 1]}
                            participants={participants}
                            {...el}
                        />
                    )
                // case "picture":
                //     return
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
    const { name, message, time, parentChat, participants } = props
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
            <div className="message_wrap">
                <span className="white_space"></span>
                <span className="message">{message}</span>
                <span className="time">{timeString}</span>
            </div>
        </div>
    )
})

const MyChat = React.memo((props) => {
    const { message, time } = props
    const timeString = useMemo(() => formatTime(time), [time])

    return (
        <div className="chat_wrap message me">
            <div className="message_wrap">
                <span className="message">{message}</span>
                <span className="time">{timeString}</span>
                <span className="white_space"></span>
            </div>
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

export default Chatting

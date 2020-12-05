import React, { useContext, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import SocketContext from "./context/SocketContext"
const Chatting = (props) => {
    const { userName } = props
    const { isConnect } = useContext(SocketContext)
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
        return conversation.map((el) => {
            switch (el.type) {
                case "system":
                    return <SystemChat key={el.time} message={el.message} />
                case "message":
                    return el.name === userName ? (
                        <MyChat key={el.time} {...el} />
                    ) : (
                        <OtherChat key={el.time} {...el} />
                    )
                // case "picture":
                //     return
                default:
                    throw Error("unExpected type")
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
    const { name, message, time } = props
    const timeString = useMemo(() => formatTime(time), [time])

    return (
        <div className="chat_wrap message other">
            <div className="profile_wrap">
                <div className="profile_image"></div>
                <p>{name}</p>
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

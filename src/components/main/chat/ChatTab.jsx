import React from "react"
import SpeedDials from "../../common/SpeedDials"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { useHistory } from "react-router-dom"
import { createNewWindow } from "../../../util"

const ChatTab = () => {
    const history = useHistory()
    const actions = [
        {
            icon: <PersonAddIcon />,
            name: "친구추가",
            onClick: () => {},
        },
        {
            icon: <ExitToAppIcon />,
            name: "로그아웃",
            onClick: () => {
                localStorage.removeItem("jwt")
                history.push("../")
            },
        },
    ]
    return (
        <>
            <div className="search_area chat">
                <div className="inputWrap">
                    <div className="icon search_icon" />
                    <input id="keyword" type="text" />
                </div>
            </div>
            <div className="main_contents">
                <ChattingRoomWrap />
            </div>
            <SpeedDials actions={actions} />
        </>
    )
}

const ChattingRoomWrap = () => {
    return (
        <div className="chatting_room_wrap">
            <ChattingRoom name={"채팅방1"} />
            <ChattingRoom name={"채팅방2"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
            <ChattingRoom name={"채팅방3"} />
        </div>
    )
}

const ChattingRoom = (props) => {
    const { name } = props
    const openChat = (e) => {
        e.stopPropagation()
        const url = `http://localhost:3030/#/chatting/1?name=${name}`
        createNewWindow(url)
    }
    return (
        <div className="chatting_room" onClick={openChat}>
            <div className="profile_image person_icon"></div>
            <p className="name">{name}</p>
            <div className="whitespace"></div>
        </div>
    )
}

export default ChatTab

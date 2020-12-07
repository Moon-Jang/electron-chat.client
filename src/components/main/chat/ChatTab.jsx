import React from "react"
import SpeedDials from "../../common/SpeedDials"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { useHistory } from "react-router-dom"
import { createNewWindow } from "../../../util"
import { useStore } from "react-redux"

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
                    <input id="keyword" type="text" autoComplete="off" />
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
    const { user } = useStore().getState()
    const { info } = user
    console.log("info.name", info.name)
    return (
        <div className="chatting_room_wrap">
            <ChattingRoom roomName={"채팅방1"} userName={info.name} />
            <ChattingRoom roomName={"채팅방2"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
            <ChattingRoom roomName={"채팅방3"} userName={info.name} />
        </div>
    )
}

const ChattingRoom = (props) => {
    const { roomName, userName } = props
    const history = useHistory()
    const openChat = (e) => {
        e.stopPropagation()
        history.push(`/chatting/1?roomName=${roomName}&userName=${userName}`)
        // const url = `http://localhost:3030/#/chatting/1?roomName=${roomName}&userName=${userName}`
        // createNewWindow(url)
    }
    return (
        <div className="chatting_room" onDoubleClick={openChat}>
            <div className="profile_image person_icon"></div>
            <p className="name">{roomName}</p>
            <div className="whitespace"></div>
        </div>
    )
}

export default ChatTab

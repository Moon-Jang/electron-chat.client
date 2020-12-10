import React, { useContext } from "react"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import CloseIcon from "@material-ui/icons/Close"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { IconButton } from "@material-ui/core"
import { useSelector } from "react-redux"
import { closeWindow, alertDialog } from "../../util"
import jwt from "jsonwebtoken"
import SocketContext from "./context/SocketContext"
import { AlertContext } from "../router"
const Header = (props) => {
    const { roomIdx, roomName, userName, isPersonal } = props
    const parseRoomName = () => {
        if (!roomName.includes("$")) {
            return roomName
        }
        return roomName
            .split("$")
            .filter((el) => el !== userName)
            .join(" ")
    }

    return (
        <div className="header_area">
            <div className="chatting_room_name_wrap">
                <span>{parseRoomName()}</span>
            </div>
            <div className="white_space"></div>
            <div className="hamburger_wrap">
                <div className="hamburger">
                    <input
                        type="checkbox"
                        id="hamburgerInput"
                        onClick={(e) => e.stopPropagation()}></input>
                    <label
                        htmlFor="hamburgerInput"
                        onClick={(e) => e.stopPropagation()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <Menu
                        roomIdx={roomIdx}
                        isPersonal={isPersonal}
                        roomName={parseRoomName()}
                        userName={userName}
                    />
                </div>
            </div>
        </div>
    )
}

const Menu = (props) => {
    return (
        <div className="menu_wrap">
            <div className="title">
                <h4>채팅방 정보</h4>
            </div>
            <Description roomName={props.roomName} />
            <ParticipantList />
            <ButtonWrap {...props} />
        </div>
    )
}

const Description = ({ roomName }) => {
    const roomInfo = useSelector((store) => store.chatting.info)

    return (
        <div className="description">
            <dl>
                <dt>방제</dt>
                <dd>{roomName}</dd>
                <dt>고유코드</dt>
                <dd>{roomInfo?.room_code || "없음"}</dd>
                <dt>비밀번호</dt>
                <dd>{roomInfo?.password || "없음"}</dd>
            </dl>
        </div>
    )
}
const ParticipantList = () => {
    const userInfo = useSelector((store) => store.user.info)
    const participants = useSelector((store) => store.chatting.participants)
    const renderParticipantList = () => {
        const participantList = []
        if (!userInfo || !participants) {
            return
        }
        participantList.push(<Profile key={userInfo.name} {...userInfo} />)
        participants.forEach((el) => {
            if (el.isExited === "N") {
                participantList.push(<Profile key={el.name} {...el} />)
            }
        })
        return participantList
    }
    return (
        <div className="participant_list">
            {renderParticipantList()}
            <Profile name="사용자1" />
            <Profile name="사용자2" />
            <Profile name="사용자3" />
            <Profile name="사용자4" />
            <Profile name="사용자1" />
            <Profile name="사용자2" />
            <Profile name="사용자3" />
            <Profile name="사용자4" />
        </div>
    )
}
const Profile = (props) => {
    const { name, profileImageUrl } = props

    return (
        <div className="profile">
            <div
                className="profile_image"
                style={{ backgroundImage: `url(${profileImageUrl || ""})` }}
            />
            <p className="name">{name || ""}</p>
            <div className="whitespace" />
        </div>
    )
}

const ButtonWrap = (props) => {
    const { roomIdx, userName, isPersonal } = props
    const { idx } = jwt.decode(localStorage.jwt)
    const { socket, isConnect, isClose } = useContext(SocketContext)
    const alertContext = useContext(AlertContext)
    const inviteFriend = () => {}
    const exitRoom = () => {
        if (!isConnect) {
            return
        }
        if (isClose) {
            alertDialog(
                alertContext,
                "연결이 끊겼습니다. 연결후 다시 시도해주세요."
            )
            return
        }
        const message = {
            payload: {
                roomIdx,
                isPersonal,
                userIdx: idx,
                userName,
            },
        }
        const payload = {
            action: "exitRoom",
            body: JSON.stringify(message),
        }
        console.log(payload)
        socket.send(JSON.stringify(payload))
        closeWindow()
    }
    const close = () => {
        //socket.send()
        closeWindow()
    }
    return (
        <div className="button_wrap">
            <Button
                name="invite"
                labelString="친구 초대"
                Icon={PersonAddIcon}
                onClick={inviteFriend}
            />
            <Button
                name="exit"
                labelString="채팅방 나가기"
                Icon={ExitToAppIcon}
                onClick={exitRoom}
            />
            <Button
                name="close"
                labelString="창 닫기"
                Icon={CloseIcon}
                onClick={close}
            />
        </div>
    )
}
const Button = (props) => {
    const { name, labelString, onClick, Icon } = props
    return (
        <div className={`button ${name}_button`}>
            <IconButton
                id={`${name}Button`}
                aria-label={name}
                onClick={() => onClick()}>
                <Icon />
            </IconButton>
            <label htmlFor={`${name}Button`}>{labelString}</label>
        </div>
    )
}
export default Header

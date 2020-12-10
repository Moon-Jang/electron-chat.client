import React, { useEffect, useState } from "react"
import SpeedDials from "../../common/SpeedDials"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined"
import { useHistory } from "react-router-dom"
import { createNewWindow } from "../../../util"
import { useDispatch, useSelector, useStore } from "react-redux"
import { fetchChattingRoomList } from "../../../actions/mainAction"

const ChatTab = () => {
    const history = useHistory()
    const keywordState = useState("")
    const [keyword] = keywordState
    if (history.action === "POP") {
        history.replace("/main/friend")
        return <></>
    }
    const actions = [
        {
            icon: <AddCommentOutlinedIcon />,
            name: "채팅방 생성",
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
            <Search keywordState={keywordState} />
            <div className="main_contents">
                <ChattingRoomWrap keyword={keyword} />
            </div>
            <SpeedDials actions={actions} />
        </>
    )
}
const Search = ({ keywordState }) => {
    const [keyword, setKeyword] = keywordState
    const handleChange = (e) => {
        let { value } = e.target
        // eslint-disable-next-line
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        if (reg.test(value)) {
            value = value.replace(reg, "")
        }
        setKeyword(value)
    }
    return (
        <div className="search_area chat">
            <div className="inputWrap">
                <div className="icon search_icon" />
                <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="채팅방 검색"
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
const ChattingRoomWrap = (props) => {
    const { keyword } = props
    const { user } = useStore().getState()
    const { info } = user
    const chattingRoomList = useSelector((store) => store.chatting.rooms)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchChattingRoomList())
    }, []) //eslint-disable-line

    const renderChattingRoom = () => {
        if (!chattingRoomList) {
            return
        }
        if (!keyword) {
            return chattingRoomList.map((el) => (
                <ChattingRoom key={el.idx} userName={info.name} {...el} />
            ))
        }
        const regExp = new RegExp(keyword)
        return chattingRoomList
            .filter((room) => room.name.match(regExp))
            .map((el) => (
                <ChattingRoom key={el.idx} userName={info.name} {...el} />
            ))
    }
    return (
        <div className="chatting_room_wrap">
            {chattingRoomList !== false
                ? renderChattingRoom()
                : "서버의 오류로 채팅방 목록을 받아오지 못했습니다.\n다시 시도해주세요"}
        </div>
    )
}

const ChattingRoom = (props) => {
    const { idx, name, userName, participants } = props
    const isPersonal = props.is_personal === "Y" ? true : false
    const history = useHistory()
    const openChat = (e) => {
        e.stopPropagation()
        history.push(`/chatting/${idx}?roomName=${name}&userName=${userName}`)
        // const url = `http://localhost:3030/#/chatting/1?roomName=${roomName}&userName=${userName}`
        // createNewWindow(url)
    }
    const parseName = () => {
        if (!name.includes("$")) {
            return name
        }
        return name
            .split("$")
            .filter((el) => el !== userName)
            .join(", ")
    }

    const renderProfileImages = () => {
        let profileImages
        if (isPersonal) {
            return (
                <div className="profile_image_wrap">
                    <div
                        className="profile_image"
                        style={{
                            backgroundImage: `url(${
                                participants.length &&
                                participants[0].profileImageUrl
                            })`,
                        }}
                    />
                </div>
            )
        }
        switch (participants.length) {
            case 2:
                profileImages = (
                    <div className="profile_image_wrap">
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "28px",
                                height: "28px",
                                top: "12px",
                                left: "0px",
                                backgroundImage: `url(${participants[0].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "28px",
                                height: "28px",
                                bottom: "12px",
                                right: "0px",
                                backgroundImage: `url(${participants[1].profileImageUrl})`,
                            }}
                        />
                    </div>
                )
                break
            case 3:
                profileImages = (
                    <div className="profile_image_wrap">
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "24px",
                                height: "24px",
                                top: "12px",
                                left: "11px",
                                zIndex: 2,
                                backgroundImage: `url(${participants[0].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "24px",
                                height: "24px",
                                bottom: "12px",
                                right: "2px",
                                zIndex: 1,
                                backgroundImage: `url(${participants[1].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "24px",
                                height: "24px",
                                bottom: "12px",
                                left: "2px",
                                backgroundImage: `url(${participants[2].profileImageUrl})`,
                            }}
                        />
                    </div>
                )
                break
            default:
                profileImages = (
                    <div className="profile_image_wrap">
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "20px",
                                height: "20px",
                                top: "11px",
                                left: "1px",
                                backgroundImage: `url(${participants[0].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "20px",
                                height: "20px",
                                top: "11px",
                                right: "2px",
                                backgroundImage: `url(${participants[1].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "20px",
                                height: "20px",
                                bottom: "12px",
                                left: "1px",
                                backgroundImage: `url(${participants[2].profileImageUrl})`,
                            }}
                        />
                        <div
                            className={"profile_image_multiple"}
                            style={{
                                width: "20px",
                                height: "20px",
                                bottom: "12px",
                                right: "2px",
                                backgroundImage: `url(${participants[3].profileImageUrl})`,
                            }}
                        />
                    </div>
                )
                break
        }
        return profileImages
    }
    return (
        <div className="chatting_room" onDoubleClick={openChat}>
            {renderProfileImages()}
            <p className="name">{parseName()}</p>
            <p className="participants_number">
                {isPersonal ? "" : `(${participants.length + 1})`}
            </p>
            <div className="whitespace"></div>
        </div>
    )
}

// const ProfileImageWrap = ({ participants }) => {
//     return <div className="profile_image_wrap"></div>
// }

export default ChatTab

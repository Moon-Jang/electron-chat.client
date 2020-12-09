import React from "react"
const Header = (props) => {
    const { roomName, userName } = props
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
                    <Menu />
                </div>
            </div>
        </div>
    )
}

const Menu = () => {
    return (
        <div className="menu_wrap">
            <div className="title">
                <p>채팅방정보</p>
            </div>
            <div className="description">
                <dl>
                    <dt>방제</dt>
                    <dd>방제목입니다</dd>
                    <dt>고유코드</dt>
                    <dd>RRRRRRRRRR</dd>
                    <dt>비밀번호</dt>
                    <dd>없음</dd>
                </dl>
            </div>
            <div className="participant_list"></div>
            <div className="button_wrap"></div>
        </div>
    )
}
export default Header

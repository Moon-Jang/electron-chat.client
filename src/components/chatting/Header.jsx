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
                    <div className="menu_wrap"></div>
                </div>
            </div>
        </div>
    )
}

export default Header

import React from "react"

const ChatTab = () => {
    return (
        <>
            <div className="search_area">
                <div className="inputWrap">
                    <div className="icon search_icon" />
                    <input id="keyword" type="text" />
                </div>
            </div>
            <div className="main_contents"></div>
        </>
    )
}

export default ChatTab

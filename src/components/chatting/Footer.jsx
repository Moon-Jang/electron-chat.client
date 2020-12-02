import React from "react"
const Footer = () => {
    return (
        <div className="input_area">
            <div className="icon emoticon"></div>
            <div className="icon file"></div>
            <div className="icon picture"></div>
            <textarea className="input_message"></textarea>
            <button type="button" id="send_button">
                전송
            </button>
        </div>
    )
}

export default Footer

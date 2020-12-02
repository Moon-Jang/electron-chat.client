import React, { useContext } from "react"
import SocketContext from "./context/SocketContext"
const Chatting = () => {
    const { isConnect } = useContext(SocketContext)
    return (
        <div className="chatting_area">
            {isConnect ? (
                <>
                    <div className="chat_wrap system">
                        <div className="message_wrap">
                            <span className="bar left"></span>
                            <span className="message">
                                홍길동님이 채팅에 참가하셨습니다.
                            </span>
                            <span className="bar right"></span>
                        </div>
                    </div>
                    <div className="chat_wrap message other">
                        <div className="profile_wrap">
                            <div className="profile_image"></div>
                            <p>홍길동</p>
                        </div>
                        <div className="message_wrap">
                            <span className="white_space"></span>
                            <span className="message">
                                {
                                    "안녕하세요? 홍길동님이 채팅에 참가하셨습니다.\n 홍길동님이 채팅에 참가하셨습니다."
                                }
                            </span>
                            <span className="time">{"오후 06:33"}</span>
                        </div>
                    </div>
                    <div className="chat_wrap message me">
                        <div className="message_wrap">
                            <span className="message">
                                {
                                    "안녕하세요? 홍길동님이 채팅에 참가하셨습니다.\n 홍길동님이 채팅에 참가하셨습니다."
                                }
                            </span>
                            <span className="time">{"오후 06:33"}</span>
                            <span className="white_space"></span>
                        </div>
                    </div>
                    <div className="chat_wrap message other">
                        <div className="profile_wrap">
                            <div className="profile_image"></div>
                            <p>홍길동</p>
                        </div>
                        <div className="message_wrap">
                            <span className="white_space"></span>
                            <span className="message">
                                {
                                    "안녕하세요? 홍길동님이 채팅에 참가하셨습니다.\n 홍길동님이 채팅에 참가하셨습니다."
                                }
                            </span>
                            <span className="time">{"오후 06:33"}</span>
                        </div>
                    </div>
                    <div className="chat_wrap message other">
                        <div className="profile_wrap">
                            <div className="profile_image"></div>
                            <p>홍길동</p>
                        </div>
                        <div className="message_wrap">
                            <span className="white_space"></span>
                            <span className="message">
                                {
                                    "안녕하세요? 홍길동님이 채팅에 참가하셨습니다.\n 홍길동님이 채팅에 참가하셨습니다."
                                }
                            </span>
                            <span className="time">{"오후 06:33"}</span>
                        </div>
                    </div>
                </>
            ) : (
                <div>로딩중입니다.</div>
            )}
        </div>
    )
}

export default Chatting

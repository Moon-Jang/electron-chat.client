import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/main.sass"
import { AlertContext } from "../router"
import jwt from "jsonwebtoken"
//import { alertDialog } from "../../util"

const Main = () => {
    const history = useHistory()
    const alertContext = useContext(AlertContext)
    const test = jwt.decode(localStorage.jwt)
    console.log(test)
    return (
        <BasicLayout>
            <div className="main_page">
                <div className="navigation_area">
                    <button id="navigationFriendButton" className={"selected"}>
                        친구
                    </button>
                    <button id="navigationChatButton">채팅</button>
                </div>
                <div className="search_area">
                    <div className="inputWrap">
                        <div className="icon search_icon" />
                        <input id="keyword" type="text" />
                    </div>
                </div>
                <div className="main_contents">
                    <div className="my_profile_wrap">
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                    </div>
                    <div className="friend_profile_wrap">
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                        <div className="profile">
                            <div className="profile_image person_icon"></div>
                            <p className="name">홍길동</p>
                            <div className="whitespace"></div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    )
}

export default Main

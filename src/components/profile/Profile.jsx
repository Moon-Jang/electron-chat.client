import { CircularProgress } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/profile.sass"
import { happenApiError, parseQueryString } from "../../util"
import API_accessPersonalRoom from "./../../api/common/accessPersonalRoom"
import jwt from "jsonwebtoken"
import { AlertContext } from "../router"
import { API_getUserInfo } from "../../api"
const Profile = () => {
    const location = useLocation()
    const queryString = parseQueryString(location.search.slice(1))
    const { friendIdx, friendName, imageUrl } = queryString
    const [isOpen, setIsOpen] = useState(false)
    const alertContext = useContext(AlertContext)
    const { idx } = jwt.decode(localStorage.jwt)
    const history = useHistory()

    const openChat = async (e) => {
        e.stopPropagation()
        setIsOpen(true)
        if (+idx === +friendIdx) {
            setIsOpen(false)
            return
        }
        const response = await API_accessPersonalRoom({
            userIdx: idx,
            friendIdx,
        })
        if (happenApiError(response, alertContext)) {
            setIsOpen(false)
            return
        }
        const { roomIdx, roomName } = response.data.result
        const getUserNameResponse = await API_getUserInfo()
        if (happenApiError(response, alertContext)) {
            setIsOpen(false)
            return
        }
        const { name } = getUserNameResponse.data.result
        history.push(
            `/chatting/${roomIdx}?roomName=${roomName}&userName=${name}&isPersonal=true`
        )
    }
    return (
        <BasicLayout>
            <div className="profile_page">
                <div className="profile_area">
                    <div className="whitespace"></div>
                    <div className="profile_image_wrap">
                        <div
                            className="profile_image"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                            }}></div>
                    </div>
                    <div className="name_wrap">
                        <span>{friendName}</span>
                    </div>
                </div>
                <div className="button_area">
                    <div className="chat_button_wrap" onClick={openChat}>
                        {isOpen ? (
                            <CircularProgress size={36} />
                        ) : +idx !== +friendIdx ? (
                            <>
                                <div className="icon chat"></div>
                                <p>1:1 채팅</p>
                            </>
                        ) : (
                            <>
                                <div className="icon edit"></div>
                                <p>프로필 관리</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </BasicLayout>
    )
}

export default Profile

import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, CircularProgress, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { alertDialog, createNewWindow, happenApiError } from "../../../util"
import { useStore } from "react-redux"
import { AlertContext } from "../../router"
import API_accessRoom from "./../../../api/common/accessRoom"
import { useHistory } from "react-router-dom"

const ParticipateRoomModal = (props) => {
    const { visibleState } = props
    const [visible, setVisible] = visibleState
    const roomDataState = useState({ roomCode: "", password: "" })

    return (
        <div
            className="participate_chatting_room_overlay"
            style={{ display: visible ? "flex" : "none" }}>
            <div className={`participate_chatting_room_wrap `}>
                <div className="header">
                    <p>{"채팅방 입장"}</p>
                    <IconButton onClick={() => setVisible(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <RoomDataWrap visible={visible} roomDataState={roomDataState} />
                <ButtonWrap
                    setVisible={setVisible}
                    roomDataState={roomDataState}
                />
            </div>
        </div>
    )
}
const RoomDataWrap = (props) => {
    const { roomDataState, visible } = props
    const [inputValues, setInputValues] = roomDataState
    const { roomCode, password } = inputValues
    const [hasPassword, setHasPassword] = useState(true)
    const checkIconRef = useRef(null)
    useEffect(() => {
        setInputValues({ roomCode: "", password: "" })
    }, [visible]) //eslint-disable-line

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation()
        if (!hasPassword) {
            setHasPassword(true)
            checkIconRef.current.classList.remove("checked_icon")
            checkIconRef.current.classList.add("check_icon")
            return
        }
        setHasPassword(false)
        checkIconRef.current.classList.add("checked_icon")
        checkIconRef.current.classList.remove("check_icon")
    }
    return (
        <div className="room_data_wrap">
            <label htmlFor="roomCode">고유 코드</label>
            <input
                id="roomCode"
                name="roomCode"
                type="text"
                value={roomCode}
                maxLength={10}
                onChange={handleChange}
            />
            <label className="password_label" onClick={handleCheckboxClick}>
                <span>비밀번호</span>
                <span className="icon check_icon" ref={checkIconRef}></span>
            </label>
            <input
                id="roomPassword"
                name="password"
                type="text"
                disabled={hasPassword}
                value={password}
                maxLength={8}
                onChange={handleChange}
            />
        </div>
    )
}

const ButtonWrap = (props) => {
    const { setVisible, roomDataState } = props
    const { roomCode, password } = roomDataState[0]
    const [isParticipating, setIsParticipating] = useState(false)
    const isApp = window.require
    const { user } = useStore().getState()
    const userName = user.info.name
    const alertContext = useContext(AlertContext)
    const history = useHistory()
    const handleClick = async (e) => {
        if (roomCode.length < 10) {
            alertDialog(alertContext, "고유코드는 10글자 입니다.")
            return
        }
        if (password.length > 0 && password.length < 4) {
            alertDialog(alertContext, "패스워드는 4글자 이상입니다.")
            return
        }
        setIsParticipating(true)
        const userIdx = user.info.idx
        const response = await API_accessRoom({ userIdx, roomCode, password })
        if (happenApiError(response, alertContext, null, true)) {
            setIsParticipating(false)
            return
        }
        const { roomIdx, roomName } = response.data.result
        const queryString = `?roomName=${roomName}&userName=${userName}&isPersonal=${false}&isPassed=${true}`
        if (!isApp) {
            history.push(`/chatting/${roomIdx}${queryString}`)
            return
        }
        const url = `http://localhost:3030/#/chatting/${roomIdx}${queryString}`
        createNewWindow(url)
        setIsParticipating(false)
        setVisible(false)
    }
    const cancel = (e) => {
        setVisible(false)
    }
    return (
        <div className="participate_button_wrap">
            <Button id="cancelButton" variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button
                id="participateButton"
                variant="contained"
                onClick={handleClick}>
                {isParticipating ? <CircularProgress size={20} /> : "입장"}
            </Button>
        </div>
    )
}
export default ParticipateRoomModal

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import {
    Button,
    Checkbox,
    CircularProgress,
    IconButton,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useSelector, useStore } from "react-redux"
import { alertDialog, createNewWindow, happenApiError } from "../../../util"
import { AlertContext } from "./../../router"
import jwt from "jsonwebtoken"
import { API_createRoom } from "../../../api"

const SelectedFriendListContext = createContext(null)
const AddChattingRoomModal = (props) => {
    const { visibleState } = props
    const [visible, setVisible] = visibleState
    const keywordState = useState("")
    const stepState = useState(1)
    const roomDataState = useState({ roomName: "", password: "" })
    const [keyword] = keywordState
    const [step, setStep] = stepState
    const selectedFriendListState = useState([])

    useEffect(() => {
        if (!visible) {
            setStep(1)
        }
    }, [visible]) //eslint-disable-line

    return (
        <div
            className="add_chatting_room_overlay"
            style={{ display: visible ? "flex" : "none" }}>
            <SelectedFriendListContext.Provider value={selectedFriendListState}>
                <div
                    className={`add_chatting_room_wrap ${
                        step === 1 ? "step1" : "step2"
                    }`}>
                    <div className="header">
                        <p>{step === 1 ? "채팅방 생성" : "대화 상대 선택"}</p>
                        <IconButton onClick={() => setVisible(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {step === 1 ? (
                        <RoomDataWrap
                            visible={visible}
                            roomDataState={roomDataState}
                        />
                    ) : (
                        <>
                            <SearchWrap
                                visible={visible}
                                keywordState={keywordState}
                            />
                            <FriendProfileWrap
                                visible={visible}
                                keyword={keyword}
                            />
                        </>
                    )}
                    <ButtonWrap
                        setVisible={setVisible}
                        stepState={stepState}
                        roomDataState={roomDataState}
                        selectedFriendListState={selectedFriendListState}
                    />
                </div>
            </SelectedFriendListContext.Provider>
        </div>
    )
}
const RoomDataWrap = (props) => {
    const { roomDataState, visible } = props
    const [inputValues, setInputValues] = roomDataState
    const { roomName, password } = inputValues
    const [hasPassword, setHasPassword] = useState(true)
    const checkIconRef = useRef(null)
    useEffect(() => {
        setInputValues({ roomName: "", password: "" })
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
            <label htmlFor="roomName">채팅방 이름</label>
            <input
                id="roomName"
                name="roomName"
                type="text"
                value={roomName}
                maxLength={32}
                onChange={handleChange}
            />
            <label className="password_label" onClick={handleCheckboxClick}>
                <span>비밀번호</span>
                <span className="icon check_icon" ref={checkIconRef}></span>
            </label>
            <input
                id="password"
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
const SearchWrap = (props) => {
    const { keywordState, visible } = props
    const [keyword, setKeyword] = keywordState

    useEffect(() => {
        setKeyword("")
    }, [visible]) //eslint-disable-line

    const handleChange = (e) => {
        let { value } = e.target
        setKeyword(value)
    }
    return (
        <div className="search_wrap">
            <div className="inputWrap">
                <div className="icon search_icon" />
                <input
                    id="searchFriendKeyword"
                    type="text"
                    placeholder="이름 검색"
                    value={keyword}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
const Profile = (props) => {
    const {
        name,
        idx,
        profile_image_url,
        visible,
        selectedFriendListState,
    } = props
    const imageUrl = profile_image_url
    const [selectedFriendList, setSelectedFrinedList] = selectedFriendListState
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!visible) {
            setChecked(false)
        }
    }, [visible])
    const handleClick = (e) => {
        e.stopPropagation()
        const newList = [...selectedFriendList]
        if (!checked) {
            newList.push(idx)
        } else {
            newList.splice(newList.indexOf(idx), 1)
        }
        setSelectedFrinedList([...newList])
        setChecked(!checked)
    }
    const handleChange = (e) => {
        const { checked } = e.target
        const newList = [...selectedFriendList]
        if (checked) {
            newList.push(idx)
        } else {
            newList.splice(newList.indexOf(idx), 1)
        }
        setSelectedFrinedList([...newList])
        setChecked(checked)
    }
    return (
        <div className="profile" onClick={handleClick}>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
            />
            <div
                className="profile_image"
                style={{ backgroundImage: `url(${imageUrl || ""})` }}
            />
            <p className="name">{name || ""}</p>
            <div className="whitespace" />
        </div>
    )
}

const FriendProfileWrap = (props) => {
    const { keyword, visible } = props
    const friendList = useSelector((store) => store.user.friendList)
    const selectedFriendListState = useContext(SelectedFriendListContext)
    useEffect(() => {
        selectedFriendListState[1]([])
    }, [visible]) //eslint-disable-line

    const renderProfiles = () => {
        const regExp = new RegExp(keyword)
        return friendList
            ?.filter((el) => el.name.match(regExp))
            .map((el) => (
                <Profile
                    key={el.idx}
                    selectedFriendListState={selectedFriendListState}
                    visible={visible}
                    {...el}
                />
            ))
    }
    return (
        <div className="friend_profile_wrap">
            {friendList !== false
                ? renderProfiles()
                : "서버의 오류로 친구목록을 받아오지 못했습니다.\n다시 시도해주세요"}
        </div>
    )
}

const ButtonWrap = (props) => {
    const {
        setVisible,
        stepState,
        roomDataState,
        selectedFriendListState,
    } = props
    const [selectedFriendList] = selectedFriendListState
    const [step, setStep] = stepState
    const { roomName, password } = roomDataState[0]
    const [isAdding, setIsAdding] = useState(false)
    const { user } = useStore().getState()
    const userName = user.info.name
    const alertContext = useContext(AlertContext)
    const handleClick = async (e) => {
        if (step === 1) {
            if (roomName.length < 4) {
                alertDialog(
                    alertContext,
                    "채팅방 이름을 4글자 이상 적어주세요."
                )
                return
            }
            if (password.length > 0 && password.length < 4) {
                alertDialog(alertContext, "비밀번호을 4글자 이상 적어주세요.")
                return
            }
            setStep(2)
            return
        }
        if (!selectedFriendList.length) {
            alertDialog(alertContext, "대화 상대를 선택해주세요.")
            return
        }
        setIsAdding(true)
        const { idx } = jwt.decode(localStorage.jwt)
        selectedFriendList.push(idx)
        const payload = {
            roomName,
            password: password || false,
            userList: selectedFriendList,
            isPersonalChat: false,
        }
        console.log("payload", payload)
        const response = await API_createRoom(payload)
        if (happenApiError(response, alertContext, null, true)) {
            setVisible(false)
            setIsAdding(false)
            return
        }
        const { roomIdx } = response.data.result
        const queryString = `?roomName=${roomName}&userName=${userName}&isPersonal=${false}`
        const url = `http://localhost:3030/#/chatting/${roomIdx}${queryString}`
        console.log(url)
        createNewWindow(url)
        setVisible(false)
        setIsAdding(false)
    }
    const cancel = (e) => {
        setVisible(false)
    }
    return (
        <div className="add_button_wrap">
            <Button id="cancelButton" variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button id="addButton" variant="contained" onClick={handleClick}>
                {isAdding ? (
                    <CircularProgress size={20} />
                ) : step === 1 ? (
                    "다음 단계"
                ) : (
                    "채팅방 생성"
                )}
            </Button>
        </div>
    )
}
export default AddChattingRoomModal

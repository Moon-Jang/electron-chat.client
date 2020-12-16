import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { Button, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriendList } from "../../actions/mainAction"
import SocketContext from "./context/SocketContext"
import { AlertContext } from "./../router"
import { alertDialog } from "../../util"

const SelectedFriendContext = createContext(null)
const InviteFriendModal = (props) => {
    const { visibleState } = props
    const [visible, setVisible] = visibleState
    const keywordState = useState("")
    const roomDataState = useState({ roomName: "", password: "" })
    const friendList = useSelector((store) => store.user.friendList)
    const [keyword] = keywordState
    const selectedFriendState = useState(0)

    return (
        <div
            className="invite_friend_overlay"
            style={{ display: visible ? "flex" : "none" }}>
            <SelectedFriendContext.Provider value={selectedFriendState}>
                <div className={`invite_friend_wrap`}>
                    <div className="header">
                        <p>{"친구 초대"}</p>
                        <IconButton onClick={() => setVisible(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <SearchWrap visible={visible} keywordState={keywordState} />
                    <FriendProfileWrap
                        visible={visible}
                        keyword={keyword}
                        friendList={friendList}
                    />
                    <ButtonWrap
                        setVisible={setVisible}
                        friendList={friendList}
                        roomDataState={roomDataState}
                        selectedFriendState={selectedFriendState}
                    />
                </div>
            </SelectedFriendContext.Provider>
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
    const { name, idx, profile_image_url, visible, selectedFriendState } = props
    const imageUrl = profile_image_url
    const setSelectedFrined = selectedFriendState[1]
    const profileDivRef = useRef(null)
    useEffect(() => {
        if (!visible) {
            setSelectedFrined(0)
        }
    }, [visible]) //eslint-disable-line

    const handleClick = (e) => {
        e.stopPropagation()
        setSelectedFrined(idx)
        const sibilingElements = profileDivRef.current.parentElement.children
        for (const el of sibilingElements) {
            el.classList.remove("selected")
        }
        profileDivRef.current.classList.add("selected")
    }
    return (
        <div className="profile" onClick={handleClick} ref={profileDivRef}>
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
    const { keyword, visible, friendList } = props
    const participants = useSelector((store) => store.chatting.participants)
    const participantList = participants ? participants.map((el) => el.idx) : []
    const selectedFriendState = useContext(SelectedFriendContext)
    const friendProfileWrapRef = useRef(null)
    const dispatch = useDispatch()
    useEffect(() => {
        selectedFriendState[1](0)
        resetSelection()
    }, [visible]) //eslint-disable-line

    useEffect(() => {
        dispatch(fetchFriendList())
    }, []) //eslint-disable-line

    const resetSelection = () => {
        const profileElements = friendProfileWrapRef.current.children
        if (profileElements) {
            for (const el of profileElements) {
                el.classList.remove("selected")
            }
        }
    }
    const renderProfiles = () => {
        const regExp = new RegExp(keyword)
        return friendList
            ?.filter((el) => el.name.match(regExp))
            .filter((el) => !participantList.includes(el.idx))
            .map((el) => (
                <Profile
                    key={el.idx}
                    selectedFriendState={selectedFriendState}
                    visible={visible}
                    {...el}
                />
            ))
    }
    return (
        <div className="friend_profile_wrap" ref={friendProfileWrapRef}>
            {friendList !== false
                ? renderProfiles()
                : "서버의 오류로 친구목록을 받아오지 못했습니다.\n다시 시도해주세요"}
        </div>
    )
}

const ButtonWrap = (props) => {
    const { setVisible, selectedFriendState, friendList } = props
    const [selectedFriend] = selectedFriendState
    const { socket, isConnect, isClose } = useContext(SocketContext)
    const alertContext = useContext(AlertContext)
    const userInfo = useSelector((store) => store.user.info)
    const userName = userInfo?.name
    const sendMessage = (params) => {
        if (!isConnect) {
            return
        }
        if (isClose) {
            alertDialog(alertContext, "연결이 끊겼습니다. 다시 시도해주세요.")
            return
        }
        const message = {
            payload: params,
        }
        const payload = {
            action: "invite",
            body: JSON.stringify(message),
        }
        console.log(payload)
        socket.send(JSON.stringify(payload))
    }

    const handleClick = async (e) => {
        const userIdx = userInfo.idx
        const friendIdx = selectedFriend
        const friendName = friendList?.find((el) => el.idx === selectedFriend)
            .name
        console.log(userIdx, userName, friendIdx, friendName)
        const params = { userIdx, userName, friendIdx, friendName }
        sendMessage(params)
        setVisible(false)
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
                {"친구 초대"}
            </Button>
        </div>
    )
}
export default InviteFriendModal

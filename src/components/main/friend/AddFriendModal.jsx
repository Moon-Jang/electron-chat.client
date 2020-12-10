import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, CircularProgress, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchFriendList,
    findFriends,
    resetFindFriends,
    selectFriend,
} from "../../../actions/mainAction"
import { AlertContext } from "./../../router"
import { alertDialog, happenApiError } from "../../../util"
import API_addFriend from "./../../../api/friends/idx/addFriend"

const AddFriendModal = (props) => {
    const { visibleState } = props
    const [visible, setVisible] = visibleState

    return (
        <div
            className="add_friend_overlay"
            style={{ display: visible ? "flex" : "none" }}>
            <div className="add_friend_wrap">
                <div className="header">
                    <p>친구 추가</p>
                    <IconButton onClick={() => setVisible(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <SearchWrap visible={visible} />
                <FriendProfileWrap visible={visible} />
                <ButtonWrap setVisible={setVisible} />
            </div>
        </div>
    )
}
const SearchWrap = ({ visible }) => {
    const [keyword, setKeyword] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setKeyword("")
    }, [visible])

    const handleChange = (e) => {
        let { value } = e.target
        // eslint-disable-next-line
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        if (reg.test(value)) {
            value = value.replace(reg, "")
        }
        if (value.length > 1) {
            dispatch(findFriends(value))
        } else {
            dispatch(resetFindFriends())
        }
        console.log("value", value)
        setKeyword(value)
    }
    return (
        <div className="search_wrap">
            <div className="inputWrap">
                <div className="icon search_icon" />
                <input
                    id="searchFriendKeyword"
                    type="text"
                    placeholder="이름, 아이디 검색"
                    value={keyword}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
const Profile = (props) => {
    const { name, id, idx, dispatch, profile_image_url } = props
    const imageUrl = profile_image_url

    const formatId = useCallback((id) => {
        const frontStr = id.slice(0, 4)
        const endStr = id.slice(4).replaceAll(/[0-9a-z]/gi, "*")
        return frontStr + endStr
    }, [])
    const handleClick = (e) => {
        e.stopPropagation()
        dispatch(selectFriend(idx))
        const selectedProfile = document.querySelector(".profile.selected")
        if (selectedProfile) {
            selectedProfile.classList.remove("selected")
        }
        e.currentTarget.classList.add("selected")
    }

    return (
        <div className="profile" onClick={handleClick}>
            <div
                className="profile_image"
                style={{ backgroundImage: `url(${imageUrl || ""})` }}
            />
            <p className="name">{name || ""}</p>
            <p className="id">{id ? formatId(id) : ""}</p>
            <div className="whitespace" />
        </div>
    )
}

const FriendProfileWrap = ({ visible }) => {
    const dispatch = useDispatch()
    const searchedFriendList = useSelector(
        (store) => store.user.searchedFriendList
    )
    useEffect(() => {
        dispatch(resetFindFriends())
    }, [visible]) //eslint-disable-line

    const renderProfiles = () => {
        return searchedFriendList?.map((el) => (
            <Profile key={el.idx} dispatch={dispatch} {...el} />
        ))
    }
    return (
        <div className="friend_profile_wrap">
            {searchedFriendList !== false
                ? renderProfiles()
                : "서버의 오류로 친구목록을 받아오지 못했습니다.\n다시 시도해주세요"}
            <Profile
                name="홍길동"
                id="hellowakiki"
                idx={1}
                dispatch={dispatch}
            />
        </div>
    )
}

const ButtonWrap = (props) => {
    const { setVisible } = props
    const [isAdding, setIsAdding] = useState(false)
    const selectedFriend = useSelector((store) => store.user.selectedFriend)
    const alertContext = useContext(AlertContext)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(selectFriend(null))
    }, []) // eslint-disable-line

    const addFriend = async () => {
        const selectedProfile = document.querySelector(".profile.selected")
        setIsAdding(true)
        if (!selectedFriend) {
            alertDialog(alertContext, "추가할 친구를 선택해주세요.")
            selectedProfile.classList.remove("selected")
            setIsAdding(false)
            return
        }
        console.log(selectedFriend)
        selectedProfile.classList.remove("selected")
        const response = await API_addFriend({ friendIdx: selectedFriend })
        if (happenApiError(response, alertContext, null, true)) {
            setIsAdding(false)
        }
        dispatch(fetchFriendList())
        setIsAdding(false)
        setVisible(false)
    }
    return (
        <div className="add_button_wrap">
            <Button id="addButton" variant="contained" onClick={addFriend}>
                {isAdding ? <CircularProgress size={20} /> : "친구 추가"}
            </Button>
        </div>
    )
}
export default AddFriendModal

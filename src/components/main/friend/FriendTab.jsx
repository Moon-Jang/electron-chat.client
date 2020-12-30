import React, { useEffect, useState } from "react"
import SpeedDials from "../../common/SpeedDials"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriendList, fetchUserInfo } from "../../../actions/mainAction"
import AddFriendModal from "./AddFriendModal"
import { createNewWindow } from "../../../util"

const FriendTab = () => {
    const history = useHistory()
    const keywordState = useState("")
    const [keyword] = keywordState
    const visibleState = useState(false)

    const actions = [
        {
            icon: <PersonAddIcon />,
            name: "친구추가",
            onClick: () => visibleState[1](true),
        },
        {
            icon: <ExitToAppIcon />,
            name: "로그아웃",
            onClick: () => {
                localStorage.removeItem("jwt")
                history.push("../")
            },
        },
    ]

    return (
        <>
            <Search keywordState={keywordState} />
            <div className="main_contents">
                <MyProfileWrap />
                <FriendProfileWrap keyword={keyword} />
                <AddFriendModal visibleState={visibleState} />
            </div>
            <SpeedDials actions={actions} />
        </>
    )
}
const Search = ({ keywordState }) => {
    const [keyword, setKeyword] = keywordState

    const handleChange = (e) => {
        let { value } = e.target
        // eslint-disable-next-line
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        if (reg.test(value)) {
            value = value.replace(reg, "")
        }
        setKeyword(value)
    }
    return (
        <div className="search_area">
            <div className="inputWrap">
                <div className="icon search_icon" />
                <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="이름 검색"
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
const MyProfileWrap = () => {
    const profileProps = useSelector((store) => store.user.info)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!profileProps) {
            dispatch(fetchUserInfo())
        }
    }, []) //eslint-disable-line

    return (
        <div className="my_profile_wrap">
            <Profile {...profileProps} />
        </div>
    )
}

const Profile = (props) => {
    const { idx, name, isApp, imageUrl } = props
    const history = useHistory()
    const handleClick = (e) => {
        e.stopPropagation()
        const queryString = `?friendIdx=${idx}&friendName=${name}&imageUrl=${imageUrl}`
        if (!isApp) {
            history.push("/profile/" + queryString)
            return
        }
        const url = `http://localhost:3030/#/profile/${queryString}`
        createNewWindow(url)
    }
    return (
        <div className="profile" onClick={handleClick}>
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
    const { keyword } = props
    const friendList = useSelector((store) => store.user.friendList)
    const isApp = window.require
    const dispatch = useDispatch()

    useEffect(() => {
        if (!friendList) {
            dispatch(fetchFriendList())
        }
    }, []) //eslint-disable-line

    const renderFriendProfiles = () => {
        if (!friendList) {
            return
        }
        if (!keyword) {
            return friendList.map((el) => {
                return (
                    <Profile
                        key={el.idx}
                        imageUrl={el.profile_image_url}
                        isApp={isApp}
                        {...el}
                    />
                )
            })
        }
        const regExp = new RegExp(keyword)
        return friendList
            .filter((friend) => friend.name.match(regExp))
            .map((el) => (
                <Profile
                    key={el.idx}
                    isApp={isApp}
                    imageUrl={el.profile_image_url}
                    {...el}
                />
            ))
    }

    return (
        <div className="friend_profile_wrap">
            {friendList !== false
                ? renderFriendProfiles()
                : "서버의 오류로 친구목록을 받아오지 못했습니다.\n다시 시도해주세요"}
        </div>
    )
}

export default FriendTab

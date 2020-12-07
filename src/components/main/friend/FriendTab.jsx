import React, { useEffect, useState } from "react"
import SpeedDials from "../../common/SpeedDials"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriendList, fetchUserInfo } from "../../../actions/mainAction"
import AddFriendModal from "./AddFriendModal"

const FriendTab = () => {
    const history = useHistory()
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
            <div className="search_area">
                <div className="inputWrap">
                    <div className="icon search_icon" />
                    <input id="keyword" type="text" autoComplete="off" />
                </div>
            </div>
            <div className="main_contents">
                <MyProfileWrap />
                <FriendProfileWrap />
                <AddFriendModal visibleState={visibleState} />
            </div>
            <SpeedDials actions={actions} />
        </>
    )
}
const MyProfileWrap = () => {
    const profileProps = useSelector((store) => store.user.info)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!profileProps) {
            console.log("test")
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
    const { idx, name, imageUrl } = props
    const history = useHistory()

    const handleClick = (e) => {
        e.stopPropagation()
        const queryString = `?friendIdx=${idx}&friendName=${name}&imageUrl=${imageUrl}`
        history.push("/profile" + queryString)
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

const FriendProfileWrap = () => {
    const friendList = useSelector((store) => store.user.friendList)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!friendList) {
            dispatch(fetchFriendList())
        }
    }, []) //eslint-disable-line

    const friendProfiles =
        friendList &&
        friendList.map((el) => {
            return (
                <Profile key={el.idx} imageUrl={el.profile_image_url} {...el} />
            )
        })

    return (
        <div className="friend_profile_wrap">
            {friendProfiles !== false
                ? friendProfiles
                : "서버의 오류로 친구목록을 받아오지 못했습니다.\n다시 시도해주세요"}
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
    )
}

export default FriendTab

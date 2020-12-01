import React, { useContext, useEffect, useState } from "react"
import { API_getUserInfo, API_getFriendList } from "../../../api"
import { happenApiError } from "../../../util"
import SpeedDials from "../../common/SpeedDials"
import { AlertContext } from "../../router"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { useHistory } from "react-router-dom"

const FriendTab = () => {
    const history = useHistory()
    const actions = [
        { icon: <PersonAddIcon />, name: "친구추가", onClick: () => {} },
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
                    <input id="keyword" type="text" />
                </div>
            </div>
            <div className="main_contents">
                <MyProfileWrap />
                <FriendProfileWrap />
            </div>
            <SpeedDials actions={actions} />
        </>
    )
}
const MyProfileWrap = () => {
    const alertContext = useContext(AlertContext)
    const [profileProps, setProfileProps] = useState({
        name: "",
        imageUrl: "",
    })
    useEffect(() => {
        fetchData()
    }, []) //eslint-disable-line

    const fetchData = async () => {
        const response = await API_getUserInfo()
        if (happenApiError(response, alertContext, null, true)) {
            return
        }
        const { name, profile_image_url } = response.data.result
        setProfileProps({ name, imageUrl: profile_image_url })
    }
    return (
        <div className="my_profile_wrap">
            <Profile {...profileProps} />
        </div>
    )
}

const Profile = (props) => {
    const { name, imageUrl } = props
    return (
        <div className="profile">
            <div
                className="profile_image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <p className="name">{name}</p>
            <div className="whitespace" />
        </div>
    )
}

const FriendProfileWrap = () => {
    const alertContext = useContext(AlertContext)
    const [friendList, setfriendList] = useState([])
    useEffect(() => {
        fetchData()
    }, []) //eslint-disable-line

    const fetchData = async () => {
        const response = await API_getFriendList()
        if (happenApiError(response, alertContext, null, true)) {
            return
        }
        setfriendList(response.data.result)
    }
    const friendProfiles = friendList.map((friend) => {
        const { name, profile_image_url } = friend
        return <Profile key={name} name={name} imageUrl={profile_image_url} />
    })

    return (
        <div className="friend_profile_wrap">
            {friendProfiles}
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

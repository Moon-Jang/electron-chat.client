import React, { useContext, useEffect, useState } from "react"
import { API_getUserInfo, API_getFriendList } from "../../../api"
import { happenApiError } from "../../../util"
import SpeedDials from "../../common/SpeedDials"
import { AlertContext } from "../../router"
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined"
import SaveIcon from "@material-ui/icons/Save"
import PrintIcon from "@material-ui/icons/Print"
import ShareIcon from "@material-ui/icons/Share"
import FavoriteIcon from "@material-ui/icons/Favorite"

const FriendTab = () => {
    const actions = [
        { icon: <FileCopyIcon />, name: "Copy", onClick: (e) => {} },
        { icon: <SaveIcon />, name: "Save", onClick: (e) => {} },
        { icon: <PrintIcon />, name: "Print", onClick: (e) => {} },
        { icon: <ShareIcon />, name: "Share", onClick: (e) => {} },
        { icon: <FavoriteIcon />, name: "Like", onClick: (e) => {} },
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

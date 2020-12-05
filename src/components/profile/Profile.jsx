import React from "react"
import { useLocation } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/profile.sass"
import { parseQueryString } from "../../util"
const Profile = () => {
    const location = useLocation()
    console.log(location)
    const queryString = parseQueryString(location.search.slice(1))
    const { idx, name, imageUrl } = queryString
    console.log(idx)
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
                        <span>{name}</span>
                    </div>
                </div>
                <div className="button_area"></div>
            </div>
        </BasicLayout>
    )
}

export default Profile

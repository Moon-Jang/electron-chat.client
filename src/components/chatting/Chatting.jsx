import React from "react"
import { useParams } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/chatting.sass"
const Chatting = (props) => {
    const { roomNo } = useParams()
    return (
        <BasicLayout>
            <div className="main_page"></div>
        </BasicLayout>
    )
}

export default Chatting

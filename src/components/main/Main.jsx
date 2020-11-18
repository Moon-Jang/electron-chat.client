import React from "react"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/main.sass"
import { Route, Switch, useHistory, useParams } from "react-router-dom"
//import { alertDialog } from "../../util"
import FriendTab from "./friend/friend"
import ChatTab from "./chat/chat"
const Main = (props) => {
    const history = useHistory()
    const { tab } = useParams()
    return (
        <BasicLayout>
            <div className="main_page">
                <div className="navigation_area">
                    <button
                        id="navigationFriendButton"
                        className={tab === "friend" ? "selected" : ""}
                        onClick={() => history.replace("/main/friend")}>
                        친구
                    </button>
                    <button
                        id="navigationChatButton"
                        className={tab === "chat" ? "selected" : ""}
                        onClick={() => history.replace("/main/chat")}>
                        채팅
                    </button>
                </div>
                <Switch>
                    <Route exact path="/main/friend" component={FriendTab} />
                    <Route exact path="/main/chat" component={ChatTab} />
                </Switch>
            </div>
        </BasicLayout>
    )
}

export default Main

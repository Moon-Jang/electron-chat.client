import { IconButton } from "@material-ui/core"
import React from "react"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
const Navigation = ({ history }) => {
    const goBack = () => history.goBack()
    return (
        <div class="navigation_area">
            <IconButton onClick={goBack}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    )
}

export default Navigation

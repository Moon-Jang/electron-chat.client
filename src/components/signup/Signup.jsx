import { IconButton, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/signup.sass"
import Navigation from "./Navigation"
const Signup = () => {
    const history = useHistory()
    //const [isSubmitting, setIsSubmitting] = useState(false)
    const [signupData, setSignupData] = useState({
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        email: "",
    })
    const { id, password, passwordCheck, name, email } = signupData

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const login = async () => {
        // setIsLogin(true)
        // const response = await API_login({ id, password })
        // if (happenApiError(response, null, true)) {
        //     setIsLogin(false)
        //     return
        // }
        // setIsLogin(false)
    }
    return (
        <BasicLayout>
            <div class="signup_page">
                <Navigation history={history} />
                <div class="main_contents">
                    <div class="profile_image_area"></div>
                    <div class="input_area">
                        <TextField variant="outlined" />
                        <TextField
                            id="password"
                            name="password"
                            label="비밀번호"
                            type="password"
                            variant="outlined"
                        />
                        <TextField variant="outlined" />
                        <TextField variant="outlined" />
                        <TextField variant="outlined" />
                    </div>
                    <div class="button_area"></div>
                </div>
                <div class="white_space_bottom" />
            </div>
        </BasicLayout>
    )
}

export default Signup

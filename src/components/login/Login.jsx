import { Button, CircularProgress, TextField } from "@material-ui/core"
import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { API_login } from "../../api"
import BasicLayout from "../../layout/BasicLayout"
import { happenApiError } from "../../util"
import logo from "../../assets/logo/logo.svg"
import "../../styles/login.sass"
import "../../styles/App.css"
const Login = () => {
    const history = useHistory()
    const [isLogin, setIsLogin] = useState(false)
    const [loginData, setLoginData] = useState({
        id: "",
        password: "",
    })
    const { id, password } = loginData

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }
    const moveToSignup = () => history.push("/signup")
    const login = async () => {
        setIsLogin(true)
        const response = await API_login({ id, password })
        if (happenApiError(response, null, true)) {
            setIsLogin(false)
            return
        }
        setIsLogin(false)
    }
    return (
        <BasicLayout name={"로그인"}>
            <div class="login_page">
                <div class="logo_wrap">
                    <img src={logo} className={"App-logo"} alt={"logo"} />
                </div>
                <div class="main_contents">
                    <div class="white_space" />
                    <div class="login_form">
                        <div class="input_wrap">
                            <TextField
                                id="id"
                                name="id"
                                label="아이디"
                                variant="outlined"
                                value={id}
                                onChange={handleChange}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="비밀번호"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="button_wrap">
                            <Button
                                id="signupButton"
                                variant="contained"
                                onClick={moveToSignup}>
                                회원가입
                            </Button>
                            <Button
                                id="loginButton"
                                variant="contained"
                                onClick={login}
                                disabled={isLogin}>
                                {isLogin ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    "로그인"
                                )}
                            </Button>
                        </div>
                    </div>
                    <div class="white_space" />
                </div>
                <div class="white_space" />
            </div>
        </BasicLayout>
    )
}

export default Login

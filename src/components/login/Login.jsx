import { Button, CircularProgress, TextField } from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { API_login } from "../../api"
import BasicLayout from "../../layout/BasicLayout"
import { alertDialog, happenApiError } from "../../util"
import { AlertContext } from "../router"
import API from "../../api/API"
import jwt from "jsonwebtoken"
import logo from "../../assets/logo/logo.svg"
import "../../styles/login.sass"
import "../../styles/App.css"

const Login = () => {
    const history = useHistory()
    const [isLogin, setIsLogin] = useState(false)
    const alertContext = useContext(AlertContext)
    const [loginData, setLoginData] = useState({
        id: "",
        password: "",
    })
    const { id, password } = loginData

    useEffect(() => {
        if (history.action === "PUSH") {
            history.go(0)
        }
    }, []) //eslint-disable-line
    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }
    const moveToSignup = () => history.push("/signup")

    const handleInputKeyUp = (e) => {
        if (e.key === "Enter") {
            login()
        }
    }
    const login = async () => {
        if (!id) {
            alertDialog(alertContext, "아이디를 입력해주세요.")
            return
        }
        if (!password) {
            alertDialog(alertContext, "비밀번호를 입력해주세요.")
            return
        }
        setIsLogin(true)
        const response = await API_login({ id, password })
        if (happenApiError(response, alertContext, null, true)) {
            setIsLogin(false)
            return
        }
        const decoded = jwt.decode(response.data.token)
        console.log(decoded)
        if (typeof decoded !== "string") {
            localStorage.jwt = response.data.token
            API.defaults.headers["Authorization"] = `Bearer ${localStorage.jwt}`
        }
        history.push("/main/friend")
    }
    return (
        <BasicLayout>
            <div className="login_page">
                <div className="logo_wrap">
                    <img src={logo} className={"App-logo"} alt={"logo"} />
                </div>
                <div className="main_contents">
                    <div className="white_space" />
                    <div className="login_form">
                        <div className="input_wrap">
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
                                onKeyUp={handleInputKeyUp}
                            />
                        </div>
                        <div className="button_wrap">
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
                    <div className="white_space" />
                </div>
                <div className="white_space" />
            </div>
        </BasicLayout>
    )
}

export default Login

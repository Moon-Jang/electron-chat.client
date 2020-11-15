import { Button, CircularProgress, TextField } from "@material-ui/core"
import React, { useContext, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import BasicLayout from "../../layout/BasicLayout"
import "../../styles/signup.sass"
import { validate, resizeImage, getPreviewImage, alertDialog } from "../../util"
import { AlertContext } from "../router"
import Navigation from "./Navigation"
const Signup = () => {
    const history = useHistory()
    const alertContext = useContext(AlertContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    const isChecked = useRef(false)
    const iconWrapRef = useRef(null)
    const fileInputRef = useRef(null)
    const [signupData, setSignupData] = useState({
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        email: "",
    })
    const [imageFile, setImageFile] = useState({
        blob: new Blob(),
        fileName: "",
    })
    const { id, password, passwordCheck, name, email } = signupData

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
    }
    const handleIconWrapClick = (e) => {
        e.stopPropagation()
        fileInputRef.current.click()
    }
    const handleImageFileChange = async (e) => {
        const { files } = e.target
        if (!files.length) {
            return
        }
        // console.log(files[0].type.match(/image\/*/i))
        if (!files[0].type.match(/image\/*/i)) {
            e.target.value = null
            e.target.setAttribute("value", "")
            alert("이미지 파일만 업로드 가능합니다.\n다시 시도해주세요.")
            return
        }
        const previewImage = await getPreviewImage(files[0])
        console.log(iconWrapRef.current.classList)
        iconWrapRef.current.classList.remove("person_icon")
        iconWrapRef.current.style.backgroundImage = `url(${previewImage})`
        const resizedImage = await resizeImage(files[0], 620)
        setImageFile({
            blob: resizedImage || files[0],
            fileName: files[0].name,
        })
    }

    const signup = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        let errorMessage = ""
        if (!isChecked.current) {
            errorMessage = "아이디 중복확인을 해주세요."
            alertDialog(alertContext, errorMessage)
        }
        const formData = new FormData(e.target)
        for (const pair of formData.entries()) {
            if (pair[0] === "profileImageFile") {
                console.log("before:", pair[1])
                formData.delete("profileImageFile")
                formData.append(
                    "profileImageFile",
                    new File([imageFile.blob], imageFile.fileName),
                    imageFile.fileName
                )
                console.log(formData.get("profileImageFile"))
                continue
            }
            switch (pair[0]) {
                case "id":
                    if (!validate(pair[0], id)) {
                        errorMessage = "아이디가 유효하지 않습니다."
                    }
                    break
                case "name":
                    if (!validate(pair[0], name)) {
                        errorMessage = "이름이 유효하지 않습니다."
                    }
                    break
                case "password":
                    if (!validate(pair[0], password)) {
                        errorMessage = "비밀번호가 유효하지 않습니다."
                    }
                    break
                case "email":
                    if (!validate(pair[0], email)) {
                        errorMessage = "이메일이 유효하지 않습니다."
                    }
                    break
                default:
                    break
            }
            if (errorMessage) {
                alertDialog(alertContext, errorMessage)
                setIsSubmitting(false)
                return
            }
            console.log(pair[0], pair[1])
        }
    }
    const handleCheckBtnClick = () => {
        setIsChecking(true)
    }
    const checkInput = (type, value) => {
        if (!value) {
            return false
        }
        return !validate(type, value)
    }
    const checkPassword = (value) => {
        if (!value) {
            return false
        }
        return password !== value
    }
    return (
        <BasicLayout>
            <div className="signup_page">
                <Navigation history={history} />
                <div className="main_contents">
                    <div className="profile_image_area">
                        <div
                            className="image_upload_wrap"
                            onClick={handleIconWrapClick}>
                            <div
                                className="icon_wrap person_icon"
                                ref={iconWrapRef}></div>
                            <input
                                id="imageFileInput"
                                name="profileImageFile"
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                style={{ display: "none" }}
                                onChange={handleImageFileChange}
                                ref={fileInputRef}
                            />
                            <p>사진 선택</p>
                        </div>
                    </div>
                    <div className="form_area">
                        <form id="signupForm" onSubmit={signup}>
                            <div className="textfiled_button_wrap">
                                <TextField
                                    id="id"
                                    name="id"
                                    label="아이디"
                                    variant="outlined"
                                    value={id}
                                    onChange={handleChange}
                                    maxLength={4}
                                    error={checkInput("id", id)}
                                    required
                                />
                                <Button
                                    id="idCheckButton"
                                    variant="contained"
                                    onClick={handleCheckBtnClick}
                                    disabled={isChecking}>
                                    {isChecking ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        "중복확인"
                                    )}
                                </Button>
                            </div>
                            <TextField
                                id="password"
                                name="password"
                                label="비밀번호"
                                value={password}
                                type="password"
                                variant="outlined"
                                error={checkInput("password", password)}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                id="passwordCheck"
                                name="passwordCheck"
                                label="비밀번호 확인"
                                value={passwordCheck}
                                type="password"
                                variant="outlined"
                                error={checkPassword(passwordCheck)}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                id="name"
                                name="name"
                                label="이름"
                                value={name}
                                variant="outlined"
                                error={checkInput("name", name)}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="이메일"
                                value={email}
                                variant="outlined"
                                error={checkInput("email", email)}
                                onChange={handleChange}
                                required
                            />
                        </form>
                    </div>
                    <div className="button_area">
                        <Button
                            type={"submit"}
                            form={"signupForm"}
                            id="signupButton"
                            variant="contained"
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                                <CircularProgress size={20} />
                            ) : (
                                "회원가입"
                            )}
                        </Button>
                    </div>
                </div>
                <div className="white_space_bottom" />
            </div>
        </BasicLayout>
    )
}

export default Signup

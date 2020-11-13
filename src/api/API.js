import axios from "axios"

let baseURL

if (process.env.REACT_APP_BUILD_MODE === "prod") {
    baseURL = "https://api.chat.moonjang.net"
} else if (process.env.REACT_APP_BUILD_MODE === "dev") {
    baseURL = "http://localhost:3000/prod"
}

const API = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
    },
    timeout: 6000,
})

export default API

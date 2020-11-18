import jwt from "jsonwebtoken"
import API from "../API"
import API_errorHandling from "../error"

const API_getFriendList = async () => {
    let response
    const { idx } = jwt.decode(localStorage.jwt)
    try {
        response = await API.get(`/users/${idx}/friends?fields=name,profile_image_url`)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_getFriendList

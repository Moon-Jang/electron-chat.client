import jwt from "jsonwebtoken"
import API from "../API"

const API_getFriendList = async () => {
    let response
    const { idx } = jwt.decode(localStorage.jwt)
    try {
        response = await API.get(`/users/${idx}/friends?fields=idx,name,profile_image_url`)
    } catch (e) {
       throw e
    } finally {
        return response
    }
}
export default API_getFriendList

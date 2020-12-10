import API from "../../API"
import API_errorHandling from "./../../error"
import jwt from "jsonwebtoken"
/* payload
 */
const API_getUserInfo = async () => {
    let response
    const { idx } = jwt.decode(localStorage.jwt)
    try {
        response = await API.get(`/users/${idx}?fields=idx,name,profile_image_url`)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_getUserInfo

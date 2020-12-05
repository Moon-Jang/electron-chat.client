import jwt from "jsonwebtoken"
import API from "../../API"
import API_errorHandling from "../../error"

/* payload
    friendIdx
 */
const API_addFriend = async (payload) => {
    let response
    const { friendIdx } = payload
    const { idx } = jwt.decode(localStorage.jwt)
    try {
        response = await API.post(`/users/${idx}/friends/${friendIdx}`)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_addFriend

import API from "../API"
import API_errorHandling from "./../error"
/* payload
    id , password
 */
const API_login = async (payload) => {
    let response
    try {
        response = await API.post("/login", payload)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_login

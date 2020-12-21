import API from "../API"
import API_errorHandling from "../error"

/* params
    roomCode,
    password
 */
const API_accessRoom = async (payload) => {
    let response
    try {
        response = await API.post("/accessRoom", payload)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_accessRoom
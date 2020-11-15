import API from "../API"
import API_errorHandling from "./../error"

/* payload
    id 
 */
const API_confirmIdDuplication = async (payload) => {
    let response
    try {
        response = await API.post("/confirmid", payload)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_confirmIdDuplication

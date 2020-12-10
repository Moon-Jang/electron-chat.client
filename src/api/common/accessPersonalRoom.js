import API from "../API"
import API_errorHandling from "./../error"

/* params
    userIdx,
    friendIdx
 */
const API_accessPersonalRoom = async (payload) => {
    let response
    try {
        response = await API.post("/accessPersonalRoom", payload)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_accessPersonalRoom
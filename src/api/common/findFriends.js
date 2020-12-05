import API from "../API"
import API_errorHandling from "../error"

/* payload
    keyword
 */
const API_findFriends = async (payload) => {
    let response
    const { keyword } = payload
    try {
        response = await API.get(`/findFriends?keyword=${keyword}`)
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_findFriends

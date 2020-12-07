import API from "../API"

/* payload
    keyword
 */
const API_findFriends = async (payload) => {
    let response
    const { keyword } = payload
    try {
        response = await API.get(`/findFriends?keyword=${keyword}`)
    } catch (e) {
        throw e
    } finally {
        return response
    }
}
export default API_findFriends

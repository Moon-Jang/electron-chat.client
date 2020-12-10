import API from "../API"
/* payload
 */
const API_getChattingRooms = async () => {
    let response
    try {
        response = await API.get(`/rooms`)
    } catch (e) {
        throw e
    } finally {
        return response
    }
}
export default API_getChattingRooms

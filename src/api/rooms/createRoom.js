import API from "../API"
/* payload 
    {
        roomName: string,
        userList: number[],
        isPersonalChat: boolean,
        password: string
    }
 */
const API_createRoom = async (payload) => {
    let response
    try {
        response = await API.post(`/rooms`,payload)
    } catch (e) {
        throw e
    } finally {
        return response
    }
}
export default API_createRoom

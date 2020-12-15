import API from "../API"
import API_errorHandling from "./../error"

/* payload
    formData
 */
const API_sendFile = async (payload) => {
    let response
    try {
        response = await API.post(`/sendFile`,payload,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (e) {
        response = API_errorHandling(e)
    } finally {
        return response
    }
}
export default API_sendFile
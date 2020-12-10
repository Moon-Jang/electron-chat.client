import API from "../API"
/*
  payload {
      roomIdx: number | string
  }
*/
const API_getParticipantList = async (payload) => {
    let response
    console.log(payload)
    const { roomIdx } = payload
    try {
        response = await API.get(`/rooms/${roomIdx}/participants`)
    } catch (e) {
       throw e
    } finally {
        return response
    }
}
export default API_getParticipantList

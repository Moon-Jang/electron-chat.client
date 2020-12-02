export default function API_errorHandling( error ) {
    if ( !error.response ) {
        console.log("error",error)
        return null
    }
    return error.response
}
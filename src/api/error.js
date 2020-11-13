export default function API_errorHandling( error ) {
    if ( !error.response ) {
        console.log("authorizer 권한 문제")
        console.log("error",error)
        return null
    }
    return error.response
}
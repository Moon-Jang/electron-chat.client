export const happenApiError = (response, ApiName, isSummaray) => {
    if (!response || response.status !== 200 ) {
        if ( isSummaray ) {
            alert(`${response?.data?.errorString || 
                "Error: 서버 에러입니다. 잠시후 시도해 주세요"}`)
        } else {
        ApiName && alert(`에러가 발생했습니다.\n API: ${ApiName}\n`+
                        `Error: ${response?.data?.errorString || "서버 에러입니다. 잠시후 시도해 주세요"}\n`+
                        `담당자 전화: 010-3994-0745`
                        )
        }
        console.warn("ERROR",response)
        return true
    }
    return false
}
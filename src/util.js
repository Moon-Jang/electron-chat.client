export const happenApiError = (response,context, ApiName, isSummaray) => {
    if (!response || response.status !== 200 ) {
        if ( isSummaray ) {
            alertDialog(context,`${response?.data?.errorString || 
                "Error: 서버 에러입니다. 잠시후 시도해 주세요"}`)
        } else {
        ApiName && alertDialog(context,`에러가 발생했습니다.\n API: ${ApiName}\n`+
                        `Error: ${response?.data?.errorString || "서버 에러입니다. 잠시후 시도해 주세요"}\n`+
                        `담당자 전화: 010-3994-0745`
                        )
        }
        console.warn("ERROR",response)
        return true
    }
    return false
}

const validateList = {
    id: (value) => value.match(/^[a-zA-Z0-9]{4,20}$/i),
    email: (value) => value.match(/^[\w-+.]+@([\w-]+\.)+[\w-]{2,}$/g),
    emailCheck: (value) => value.match(/^[0-9a-zA-Z]{8}/i),
    password: (value) => value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i),
    passwordCheck: (value) => value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i),
    name: (value) => value.match(/^[가-힣]{2,}|[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/i),
    tel: (value) => value.match(/^\d{2,3}-\d{3,4}-\d{4,}$/i),
}

export const validate = (type,value) => {
    if(validateList[type] === undefined) {
        return 'error'
    }
    return validateList[type](value)
}

const dataURItoBlob = (dataURL) => {
    //canvas의 dataurl를 blob(file)화 하는 과정
   const byteString = atob(dataURL.split(',')[1])
   const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
   const ab = new ArrayBuffer(byteString.length)
   const ia = new Uint8Array(ab)
   for (let i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i)
   }
   //리사이징된 file 객체
   const resizedFile = new Blob([ab], {type: mimeString})
   return resizedFile
}

export const shrinkImage = (_IMG, width, height) => {
    //canvas에 이미지 객체를 리사이징해서 담는 과정
    const canvas = document.createElement("canvas")
    canvas.width = width //리사이징하여 그릴 가로 길이
    canvas.height = height //리사이징하여 그릴 세로 길이
    canvas.getContext("2d").drawImage(_IMG, 0, 0, width, height)
    //canvas의 dataurl를 blob(file)화 하는 과정
    const resizedFile = dataURItoBlob(canvas.toDataURL("image/jpeg")) //png => jpg 등으로 변환 가능
    return resizedFile
}

const calcRatio = (width, height,minSize) => {
    const shortSide = width < height ? "height" : "width"
    let ratio
    if(shortSide === "width") {
        if(height <= minSize) {
            return []
        }
        ratio = minSize / height
    }
    else if(shortSide === "height") {
        if(width <= minSize) {
            return []
        }
        ratio = minSize / width
    }
    width *= ratio
    height *= ratio
    console.log("width",width,"height",height)
    return [Math.round(width), Math.round(height)]
}

export const resizeImage = (imageFile, minSize) => {
    return new Promise( (resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            const img = new Image()
            img.onload = function() {
                const resizeData = calcRatio(img.width, img.height,minSize)
                console.log("resizeData",resizeData)
                if( !resizeData.length ) {
                    resolve(null)
                }
                const shrinkedFile = shrinkImage(img, resizeData[0], resizeData[1])
                resolve(shrinkedFile)
            }
            img.onerror = function() {
                alert("Error: fail to load Image")
                reject()
            }
            img.src = e.target?.result
        }
        reader.readAsDataURL(imageFile)
    })
}

export const getPreviewImage = (imageFile) => {
    return new Promise( (resolve,reject) => {
        const reader = new FileReader()
            reader.onload = function (e) {
                const src = e.target?.result
                resolve(src)
            }
            reader.onerror = () => {
                alert("Error: fail to load imageFile")
                reject()
            }
            reader.readAsDataURL(imageFile)
    })
}

export const alertDialog = (context,description) => {
    const { setVisible, setDescription } = context
    setVisible(true)
    setDescription(description)
}

export const parseQueryString = (queryString) => {
    const params = queryString.split('&')
    const result = {}
    params.forEach( param => {
      const [key,value] = param.split('=')
      result[key] = decodeURI(value)
    })
    return result
}

export function createNewWindow(url) {
    const remote = window.require("electron").remote
    const curWindow = remote.getCurrentWindow()
    const [curX, curY] = curWindow.getPosition()
    const BrowserWindow = remote.BrowserWindow
    const win = new BrowserWindow({
        width: 390,
        height: 645,
        minWidth: 390,
        minHeight: 645,
        x: curX - 420 < 0 ? 0 : curX - 400,
        y: curY,
        show: true,
        frame: true,
        fullscreenable: false,
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    win.setMenuBarVisibility(false)
    win.loadURL(url)
}

export async function closeWindow() {
    const remote = window.require("electron").webFrame.context
    remote.close()
}
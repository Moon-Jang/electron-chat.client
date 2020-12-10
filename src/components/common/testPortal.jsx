import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const WindowScope = (props) => {
    const containerEl = useRef(document.createElement("div"))
    const externalWindow = useRef(null)

    console.log(externalWindow)
    useEffect(() => {
        externalWindow.current = window.open(
            "",
            "modal",
            "width=600,height=400,left=200,top=200"
        )
        const currentWindow = externalWindow.current
        console.log(currentWindow)
        if (currentWindow) {
            currentWindow.document.body.appendChild(containerEl.current)
            return () => currentWindow.close()
        }
    }, [])

    return createPortal(props.children, containerEl.current)
}

export default WindowScope

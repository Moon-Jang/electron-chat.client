import React from "react"
const BasicLayout = ({ children }) => {
    return (
        <div className={"layout basic_layout"}>
            <main>{children}</main>
        </div>
    )
}

export default BasicLayout

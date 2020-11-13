import React from "react"
const BasicLayout = ({ name, children }) => {
    return (
        <div className={"layout basic_layout"}>
            <main>{children}</main>
        </div>
    )
}

export default BasicLayout

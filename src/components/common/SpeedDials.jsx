import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SpeedDial from "@material-ui/lab/SpeedDial"
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon"
import SpeedDialAction from "@material-ui/lab/SpeedDialAction"

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "absolute",
        "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
    exampleWrapper: {
        position: "relative",
        marginTop: theme.spacing(3),
        height: 380,
    },
    root: {
        transform: "translateZ(0px)",
        flexGrow: 1,
    },
    speedDialAction: {
        backgroundColor: "rgba(255,255,255,0.3)",
    },
}))

export default function SpeedDials({ actions }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleActionClick = (callback) => {
        setOpen(false)
        setTimeout(() => callback(), 200)
    }
    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={"up"}>
            {actions &&
                actions.map((action) => (
                    <SpeedDialAction
                        className={classes.speedDialAction}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleActionClick(action.onClick)}
                    />
                ))}
        </SpeedDial>
    )
}

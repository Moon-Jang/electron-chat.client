import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core"

const Alert = (props) => {
    const { visible, setVisible, description } = props

    const handleClose = () => setVisible(false)
    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Alert

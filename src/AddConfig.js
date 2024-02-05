import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [configList,setConfigList] = React.useState([]);

    React.useEffect(()=>{
        localStorage.setItem('configList',JSON.stringify(configList));
    },[configList])

    React.useEffect(()=>{
        const configList = JSON.parse(localStorage.getItem('configList'));
        if(configList){
            setConfigList(configList);
        }
        window.dispatchEvent(new Event("storage"));
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function createData(id, name, file) {
        return { id, name, file };
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Config
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const configName = formJson.configName;
                        const configFile = formJson.configFile;
                        setConfigList([createData(1, configName, configFile),...configList])
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Config Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="config-name"
                        name="configName"
                        label="Config Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="config-file"
                        name="configFile"
                        label="Config File"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
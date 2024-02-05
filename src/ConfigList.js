import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function BasicTable() {

    const [openAdd, setOpenAdd] = React.useState(false);
    const [configList, setConfigList] = React.useState([]);

    React.useEffect(() => {
        localStorage.setItem('configList', JSON.stringify(configList) || []);
        setRows(JSON.parse(localStorage.getItem('configList')) || []);
    }, [configList])

    React.useEffect(() => {
        setRows(JSON.parse(localStorage.getItem('configList')) || []);
    }, []);

    const handleClickAddOpen = () => {
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
    };
    function createData(name, file) {
        return { name, file };
    }

    const configData = [
        {
            "C1": {
                "tablename": "Table First",
                "schemname": "Schema First",
                "databasename": "",
                "s3bucketname": "",
                "s3key": ""
            },
            "C2": {
                "tablename": "table2",
                "schemname": "",
                "databasename": "",
                "s3bucketname": "",
                "s3key": ""
            },
            "C3": {
                "tablename": "table3",
                "schemname": "",
                "databasename": "",
                "s3bucketname": "",
                "s3key": ""
            }
        },

    ];
    const [rows, setRows] = React.useState([]);
    const name = localStorage.setItem('config', JSON.stringify(configData))
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState('');
    const handleClickOpen = (name) => {
        setOpen(true)
        setSelectedFile(name)
    }
    const handleClose = () => {
        setOpen(false)
        setSelectedFile('')
    }
    console.log(selectedFile)
    return (
        <>
            <Button variant="outlined" onClick={handleClickAddOpen}>
                Add Config
            </Button>
            <Dialog
                open={openAdd}
                onClose={handleAddClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const configName = formJson.configName;
                        const configFile = formJson.configFile;
                        setConfigList([createData(configName, configFile), ...configList])
                        handleAddClose();
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
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Config Data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            JSON.parse(localStorage.getItem('configList') || []).map(row => {
                                return (
                                    <>
                                        {
                                            <div key={row.name}>{row.name}</div>
                                        }
                                    </>
                                )
                            })
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Config Name</TableCell>
                            <TableCell >Config Files</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, element) => (
                            <TableRow key={row.id}>
                                <TableCell > {row.name} </TableCell>
                                <TableCell ><Button onClick={(e) => handleClickOpen(element)}>{row.file}</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
import React, { useState } from 'react'

import { Typography, Stack, Paper, MenuList, MenuItem, ListItemIcon, Tooltip, Fab } from '@mui/material'
import { Add } from '@mui/icons-material';

import { sideBar } from '../constant'
import ModalCreatePost from './modals/ModalCreatePost';

const SideBar = () => {

    const [open, setOpen] = useState(false);

    return (
        <Paper sx={{ height: '60vh', boxShadow: 'none' }} position="relative">
            <Stack sx={{ padding: "34px 0" }}>
                <MenuList >
                    {sideBar.map((item, index) => (
                        <MenuItem key={index} sx={{ marginBottom: '25px', gap: 3, paddingLeft: "30px", textAlign: 'center' }} >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <Typography variant="h5" fontSize="18px">{item.content}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Stack>
            <Tooltip position="fixed"
                sx={{
                    bottom: "-30%",
                    left: "20px"
                }}
                onClick={e => setOpen(true)}
            >
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
            <ModalCreatePost open={open} close={() => setOpen(false)} showImgUpload={false} />
        </Paper>
    )
}

export default SideBar

import React, { useEffect, useState } from 'react'

import { AppBar, Badge, Grid, InputBase, Toolbar, Typography, Avatar, Stack, Box, } from '@mui/material'
import styled from '@emotion/styled'
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';

import { isEmpty } from '../ultils/IsEmpty'
import { useDispatch } from 'react-redux';
import { listPosts, searchPosts } from '../store/reducers/postSlice';
import { Link, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "50px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    opacity: "0.5"
}));

const Navbar = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    const handleSearch = () => {
        if (!isEmpty(search)) {
            dispatch(searchPosts({ text: search }))
        }
    }

    useEffect(() => {
        if (isEmpty(search)) {
            dispatch(listPosts())
        }
    }, [search])

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container direction="row" alignItems="center">
                    <Grid item md={3} xs={6}>
                        <Box >
                            <Link to="/">
                                <Typography variant='body2' sx={{ cursor: "pointer", textDecoration: "none", color: "#fff" }}>HAIPHU DEV</Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
                        <Search>
                            <InputBase
                                placeholder="Search title…"
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ width: "90%", paddingLeft: "5px" }}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <SearchIcon sx={{ color: "gray", width: "10%", cursor: "pointer" }} fontSize='large' onClick={handleSearch} />
                        </Search>
                    </Grid>
                    <Grid item md={3} xs={6} >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            sx={{ gap: 3 }}
                        >
                            <Badge badgeContent={4} color="error" component="div">
                                <MailIcon color="gray" />
                            </Badge>
                            <Badge badgeContent={4} color="error" component="div">
                                <MailIcon color="gray" />
                            </Badge>
                            <Avatar src="/images/travel.jpg" alt="avatar" width={15} height={15} />
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar

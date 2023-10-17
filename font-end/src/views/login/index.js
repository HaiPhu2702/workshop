import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
} from '@mui/material';

import { isEmpty } from '../../ultils/IsEmpty';
import { login } from '../../store/reducers/usersSlice';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})

    const handleValidateUserName = (e) => {
        if (isEmpty(e.target.value)) {
            setError(prev => ({ ...prev, username: true }))
        } else {
            setError(prev => ({ ...prev, username: false }))
            setUsername(e.target.value)
        }
    }

    const handleValidatePassword = (e) => {
        if (isEmpty(e.target.value)) {
            setError(prev => ({ ...prev, password: true }))
        } else {
            setError(prev => ({ ...prev, password: false }))
            console.log({ password })
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        if (isEmpty(username)) {
            setError(prev => ({ ...prev, username: true }))
        }
        if (isEmpty(password)) {
            setError(prev => ({ ...prev, password: true }))
        }

        console.log({ username })
        console.log({ password })

        if (!isEmpty(username) && !isEmpty(password)) {
            console.log(1111)
            const res = await dispatch(login({ username, password }))
            if (res.meta.requestStatus == "fulfilled") {
                navigate('/home')
            }
        } else {
            console.log('koo dc de trong')
        }
    }

    return (
        <Container >
            <Box sx={{
                width: "500px",
                height: "500px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column"
                , gap: "10px"
            }}>
                <Typography variant='h5' textAlign={"center"} >Login</Typography>
                <TextField id="outlined-basic" label="User name" variant="outlined" onChange={handleValidateUserName} error={error.username} />
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={handleValidatePassword} error={error.password} />
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button sx={{ width: "200px" }} variant="contained" onClick={handleSubmit}>Login</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login

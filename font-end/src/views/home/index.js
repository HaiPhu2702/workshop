import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Avatar,
    Stack,
    Paper,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Alert,
    Box,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/icons-material/MoreVert';
import { ExpandLess } from '@mui/icons-material';

import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar';
import { getPostDetail, listPosts, deletePost } from '../../store/reducers/postSlice';
import { maxlengthContentPost } from '../../constant';


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const listPost = useSelector((state) => state.posts.list)
    const [showContentShort, setShowContentShort] = useState(true)
    const [showModalLocation, setShowModalLocation] = useState(Array(listPost.length).fill(false));
    const [showModalAction, setShowModalAction] = useState(false)

    useEffect(() => {
        dispatch(listPosts())
    }, [])

    const handlePostDetail = async (postId) => {
        await dispatch(getPostDetail(postId));
        navigate(`/post-detail/${postId}`);
    }

    const handleDeletePost = (idPost) => {
        dispatch(deletePost(idPost));
        setShowModalAction(false)
    }

    const handlePopupUpdate = (index) => {
        const updatedShowModalLocation = [...showModalLocation];
        updatedShowModalLocation[index] = !updatedShowModalLocation[index];
        setShowModalLocation(updatedShowModalLocation);
        setShowModalAction(true)
    }

    return (
        <Container sx={{ padding: { xs: 0 } }}>
            <Navbar />
            <Stack paddingTop="64px"  >
                <Grid container spacing={4}>
                    <Grid item md={2} position="sticky">
                        <SideBar />
                    </Grid>
                    {/* search ma tra ve mang []  show anh img error */}
                    <Grid item md={7} overflow >
                        <Paper sx={{ boxShadow: "none" }}>
                            {listPost.map((post, ind) => (
                                <Card sx={{ marginBottom: "30px", bgcolor: "#f7f7f8" }} key={post._id}>

                                    <Box position="relative">
                                        <CardHeader
                                            avatar={<Avatar src="/images/travel.jpg" alt="avatar" width={30} height={30} />}
                                            action={
                                                <Box>
                                                    <IconButton aria-label="settings" onClick={() => handlePopupUpdate(ind)} sx={{ cursor: "pointer" }}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </Box>
                                            }
                                            title="Avatar"
                                            subheader={post.createAt}
                                        />
                                        {showModalLocation[ind] && (
                                            showModalAction && <Box position="absolute" sx={{
                                                top: 0,
                                                right: 0,
                                                marginTop: "40px"
                                            }}>
                                                <Button component="button" sx={{ paddingLeft: 5, paddingRight: 5, color: "inherit" }} onClick={() => handleDeletePost(post._id)}>Delete</Button>
                                            </Box>
                                        )}
                                    </Box>
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="div">
                                            {post.title}
                                        </Typography>
                                        {post.content.length > maxlengthContentPost ? (
                                            showContentShort
                                                ?
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                                        {post.content.slice(0, maxlengthContentPost)}
                                                        <Typography component="span" sx={{ cursor: 'pointer', border: "none", bgcolor: 'inherit' }} onClick={() => setShowContentShort(!showContentShort)}>
                                                            ......xem thêm
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                                :
                                                <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                                    {post.content}
                                                    <Typography component="span" sx={{ cursor: 'pointer', border: "none", bgcolor: 'inherit', display: "flex", alignItems: "center" }} onClick={() => setShowContentShort(!showContentShort)}>
                                                        <ExpandLess />
                                                    </Typography>
                                                </Typography>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                {post.content}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    {post.img && <CardMedia
                                        component="img"
                                        height="700"
                                        image={post.img}
                                        alt="Paella dish"
                                    />
                                    }
                                </Card>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item md={3} >
                        <Paper sx={{ boxShadow: "none" }} position="sticky" >
                            {listPost.map((post, ind) => (
                                <Card sx={{ marginBottom: "30px", bgcolor: "#f7f7f8" }} key={ind} >
                                    {post.img && <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.img}
                                        alt="Paella dish"
                                    />}
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div"
                                            sx={{
                                                cursor: "pointer",
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                            onClick={() => handlePostDetail(post._id)}
                                            noWrap
                                        >
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {post.content.slice(0, 50)}....
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}

export default Home

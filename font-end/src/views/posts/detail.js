import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

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

import Navbar from '../../components/Navbar';
import { deletePost, getPostDetail, listPosts } from '../../store/reducers/postSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const [showModalAction, setShowModalAction] = useState(false)

    const listPost = useSelector((state) => state.posts.list)
    const postDetail = useSelector((state) => state.posts.detail)

    useEffect(() => {
        dispatch(listPosts());
        dispatch(getPostDetail(id))
    }, [])

    const handlePostDetail = async (postId) => {
        setShowModalAction(false)
        await dispatch(getPostDetail(postId));
        navigate(`/post-detail/${postId}`);
    }

    const handleDeletePost = (idPost) => {
        dispatch(deletePost(idPost));
        setShowModalAction(false)
    }

    return (
        <Container sx={{ padding: { xs: 0 } }}>
            <Navbar />
            <Stack paddingTop="64px"  >
                <Grid container spacing={4}>
                    <Grid item md={9} overflow>
                        <Paper sx={{ boxShadow: "none", paddingLeft: "30px" }}>
                            <Card sx={{ marginBottom: "30px", bgcolor: "#f7f7f8" }} >
                                <Box position="relative">
                                    <CardHeader
                                        avatar={<Avatar src="/images/travel.jpg" alt="avatar" width={30} height={30} />}
                                        action={
                                            <IconButton aria-label="settings" onClick={() => setShowModalAction(!showModalAction)} sx={{ cursor: "pointer" }}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title="Avatar"
                                        subheader={postDetail.createAt}
                                    />
                                    {
                                        showModalAction && <Box position="absolute" sx={{
                                            top: 0,
                                            right: 0,
                                            marginTop: "40px"
                                        }}>
                                            <Button component="button" sx={{ paddingLeft: 5, paddingRight: 5, color: "inherit" }} onClick={() => handleDeletePost(postDetail._id)}>Delete</Button>
                                        </Box>
                                    }
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {postDetail.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }} >
                                        {postDetail.content}
                                    </Typography>
                                </CardContent>
                                {postDetail.img && <CardMedia
                                    component="img"
                                    height="700"
                                    image={postDetail.img}
                                    alt="Paella dish"
                                />}
                            </Card>
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
                                    />
                                    }
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
                                            {post.content}
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

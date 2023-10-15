import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { app } from '../../config/firebase'

import { Typography, Avatar, Box, Stack, Modal, TextField, Button, ButtonGroup, Input, Alert } from '@mui/material'
import { EmojiEmotions, Image, VideoCameraBack, PersonAdd } from '@mui/icons-material';
import { addPosts } from '../../store/reducers/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../ultils/IsEmpty';

const ModalCreatePost = ({ open, close, showImagUpload }) => {
    const dispatch = useDispatch()

    const [error, setError] = useState({});
    let [post, setPost] = useState({});
    const [showImgUpload, setShowImgUpload] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    useEffect(() => {
        if (open) {
            setShowImgUpload(false)
        }
    }, [open])

    const handlePostTitle = (e) => {
        const title = e.target.value;
        if (title === "") {
            setError(prev => ({ ...prev, title: true }));
        } else {
            setError(prev => ({ ...prev, title: false }));
        }
        setPost(prev => ({ ...prev, title: title }));
    }

    const handlePostContent = (e) => {
        const content = e.target.value;
        if (content === "") {
            setError(prev => ({ ...prev, content: true }));
        } else {
            setError(prev => ({ ...prev, content: false }));
        }
        setPost((prevPost) => ({ ...prevPost, content: content }));
    }

    const handleImageUpload = async (e) => {
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const imageData = reader.result;
                const storage = getStorage(app);
                const storageRef = ref(storage, 'images/' + file.name);
                // Tải lên hình ảnh dưới dạng dữ liệu base64
                await uploadString(storageRef, imageData, 'data_url');
                // Lấy URL của hình ảnh đã tải lên
                const downloadURL = await getDownloadURL(storageRef);
                setUrlImage(downloadURL);
                setShowImgUpload(true)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!isEmpty(post.title) && !isEmpty(post.content)) {
            const posts = { title: post.title, content: post.content, img: urlImage }
            // dispatch(addPosts(posts, onSuccess, onError));
            dispatch(addPosts(posts));
            close()
        } else {
            close()
        }
    }

    return (
        <Box position="relative">
            <Stack position="relative" height={"100vh"} >
                <Modal
                    open={open}
                    onClose={e => close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        width={600}
                        height="auto"
                        bgcolor='white'
                        borderRadius={5}
                        padding={5}
                    >
                        <Typography variant="h6" textAlign="center" color="gray" fontWeight="bold">
                            Create Post
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Avatar src="/images/travel.jpg" alt="avatar" width={30} height={30} />
                            <Typography variant='h6' fontWeight="bold">Hai Phu</Typography>
                        </Box>
                        <TextField
                            sx={{ width: "100%", paddingTop: "15px" }}
                            placeholder="Title"
                            multiline
                            rows={1}
                            variant="standard"
                            onChange={handlePostTitle}
                            error={error.title}
                        />
                        <TextField
                            sx={{ width: "100%", paddingTop: "15px" }}
                            placeholder="What' s on your mind?"
                            multiline
                            rows={3}
                            variant="standard"
                            onChange={handlePostContent}
                            error={error.content}
                        />

                        {showImgUpload && <Avatar src={urlImage} alt="Uploaded" sx={{ width: "200px", height: "200px", borderRadius: 0, paddingTop: "5px" }} />}

                        <Stack direction="row" gap={1} mt={2} mb={3}>
                            <EmojiEmotions color="primary" />
                            <label style={{ cursor: 'pointer' }}>
                                <Image color="secondary" />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageUpload}
                                />
                            </label>
                            <VideoCameraBack color="success" />
                            <PersonAdd color="error" />
                        </Stack>
                        <ButtonGroup
                            variant='contained'
                            fullWidth
                        >
                            <Button onClick={handleSubmit}  >POST</Button>
                        </ButtonGroup>
                    </Box>
                </Modal>
            </Stack>
        </Box>
    )
}

export default ModalCreatePost

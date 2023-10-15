import { sendGet, sendPatch, sendPost, sendDelete } from './axiosIntance'


export const apiAddPosts = (posts) => sendPost('posts', posts);

export const apiListPosts = () => sendGet('posts')

export const apiSearchPost = (textSearch) => sendPost('posts/search', textSearch)

export const apiGetPostDetail = (postId) => sendGet(`posts/${postId}`)

export const apiDeletePost = (postId) => sendDelete(`posts/${postId}`)

export const apiEditPost = (postId) => sendPatch(`posts/${postId}`)

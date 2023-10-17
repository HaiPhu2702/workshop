import { lazy } from 'react';

const Home = lazy(() => import('../views/home'))
const PostDetail = lazy(() => import('../views/posts/detail'))
const Login = lazy(() => import('../views/login'))

const routes = [
    { path: '/', exact: true, public: true, name: 'Login', component: Login, public: true },
    { path: '/home', exact: true, name: 'Home', component: Home, },
    { path: '/post-detail/:id', exact: true, name: 'Post Detail', component: PostDetail },
]

export default routes;

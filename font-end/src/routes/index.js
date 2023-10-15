import { lazy } from 'react';

const Home = lazy(() => import('../views/home'))
const PostDetail = lazy(() => import('../views/posts/detail'))

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home, public: true },
    { path: '/post-detail/:id', exact: true, name: 'Post Detail', component: PostDetail },
]

export default routes;

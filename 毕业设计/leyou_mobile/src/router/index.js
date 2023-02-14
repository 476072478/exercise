import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import My from '../pages/My'
import Map from '../pages/Map'
import Search from '../pages/Search'
import Details from '../pages/Details'
import List from '../pages/List'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Tabel from '../pages/Tabel'
import Collection from '../pages/Collection'
import Myfoot from '../pages/Myfoot'
import Mymeans from '../pages/Mymeans'
import Etouch from '../pages/Etouch'
import Changeheader from '../pages/Changeheader'
const route = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: "/my",
        element: <My />
    },
    {
        path: '/map/:id',
        element: <Map />
    },
    {
        path: '*',
        element: < Navigate to='/home' />
    },
    {
        path: "/search",
        element: <Search />
    },
    {
        path: '/details/:id',
        element: <Details />
    },
    {
        path: '/list',
        element: <List />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/tabel/:id',
        element: <Tabel />,
    },
    {
        path: '/mycollection',
        element: <Collection />
    },
    {
        path: '/myfoot',
        element: <Myfoot />
    },
    {
        path: '/mymeans',
        element: <Mymeans />
    },
    {
        path: '/etouch',
        element: <Etouch />
    },
    {
        path: '/Changeheader',
        element: <Changeheader />
    }
]
export default route
import React from 'react'
import IndexRouter from './router/IndexRouter';
import { HashRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
export default function App() {
    return (
        <HashRouter>
            <IndexRouter>
            </IndexRouter>
        </HashRouter>
    )
}

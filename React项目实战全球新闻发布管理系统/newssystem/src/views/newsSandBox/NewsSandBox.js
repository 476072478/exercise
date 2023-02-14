import React from 'react'
import SideMenu from '../../component/sandbox/SideMenu'
import TopHeader from '../../component/sandbox/TopHeader'
import { Layout } from 'antd';
import './NewsSandBox.css'
import NewsRouter from '../../component/sandbox/NewsRouter'
import 'nprogress/nprogress.css'
const { Content } = Layout;
export default function NewsSandBox() {
    return (
        <Layout>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <NewsRouter />
                </Content>
            </Layout>
        </Layout>
    )
}

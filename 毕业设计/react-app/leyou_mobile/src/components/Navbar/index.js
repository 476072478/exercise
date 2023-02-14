import React from 'react'
import { NavBar, Space } from 'antd-mobile'
import { connect } from 'react-redux'
import { SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import './index.css'
function NavBars(props) {
    const navigate = useNavigate()
    const { exhibit, rights } = props.exhibit
    return (
        <div className='componentNavbarDiv'>
            <NavBar back={exhibit} onBack={() => { navigate(-1) }} right={rights && <div style={{ fontSize: 24 }}>
                <Space style={{ '--gap': '16px' }} onClick={() => { navigate('/search', { state: { name: '搜索' } }) }}>
                    <SearchOutline />
                </Space>
            </div>}>{props.children}</NavBar>
        </div>
    )
}
const mapReducerState = (state) => {
    return {
        exhibit: state.navbarreducer
    }
}
export default connect(mapReducerState)(NavBars)
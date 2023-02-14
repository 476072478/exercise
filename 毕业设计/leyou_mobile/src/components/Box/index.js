import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
export default function Box(props) {
    const { data } = props
    const naviagate = useNavigate()
    function boxpoint(index, name) {
        naviagate(`/details/${index}`, { state: { name } })
    }
    return (
        <div className='componentBox'>
            {data.map((item, index) => {
                return <div className={'childbox'} key={index} onClick={() => { boxpoint(index, item) }}>
                    {item}
                </div>
            })}
            <div className={'childbox'} onClick={() => { naviagate(`/etouch`, { state: { name: '武侯天气' } }) }}>
                武侯天气
            </div>
        </div>
    )
}

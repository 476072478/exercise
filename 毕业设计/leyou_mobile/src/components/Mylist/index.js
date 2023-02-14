import React from 'react'
import { Rate } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default function Mylist(item) {
    const navigate = useNavigate()
    //跳转到详情页面
    function toTabel(id, name) {
        navigate('/tabel/' + id, { state: { name } })
    }
    return (
        <div>
            {item && <li className='DetailsLi' key={item.id} onClick={() => { toTabel(item.id, item.name) }}>
                <div>
                    <img alt='' src={item.imgsrc} width='100%' height='100%'></img>
                </div>
                <div className='DetailsText'>
                    <div>
                        <div className='Detailsname'>
                            {item.name}
                        </div>
                        <div className='Detailsjieshao' >
                            {item.text}
                        </div>
                        <div className='Detailsposition' >
                            {item.position}
                        </div>
                    </div>
                    <div>
                        <div className='Detailsprice'>
                            {item.price}元/起
                        </div>
                        <div className='Detailsfraction'>
                            <Rate readOnly defaultValue={item.fraction} />
                        </div>
                    </div>
                </div>
            </li>}
        </div>
    )
}

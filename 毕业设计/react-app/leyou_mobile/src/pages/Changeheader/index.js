import React, { useEffect } from 'react'
import { Image, } from 'antd-mobile'
import { connect } from 'react-redux'
import { portrait, requesheader } from '../../require/request'
import './index.css'
function Changeheader(state) {
    const { portrait, data } = state
    useEffect(() => {
        portrait()
    }, [portrait])
    function unloadphoto(e) {
        const flie = document.getElementById("select")
        const fd = new FormData()
        fd.append(flie.files[0].name, flie.files[0])
        requesheader(fd)
    }
    return (
        <div>
            <div className='Changeheaderbox'>
                {data.map(item => {
                    return <Image
                        src={item.imgsrc}
                        width={64}
                        height={64}
                        fit='cover'
                        style={{ borderRadius: 32, margin: '5px 10px' }}
                        key={item.id}
                    />
                })}
            </div>
            <div className="upload-wrap anticon" uploader="uploader">
                <input className="file-ele" type="file" file-model="image" name="image" uploader="uploader" id='select' multiple onChange={(e) => { unloadphoto(e) }} />
                <div className="file-open"><em className="icon icon-upload"></em>&nbsp;从相册获取</div>
            </div>
        </div>
    )
}
const mapReduxState = (state) => {
    return {
        data: state.changeheader.data
    }
}
const mapReduxDispatch = {
    portrait
}
export default connect(mapReduxState, mapReduxDispatch)(Changeheader)
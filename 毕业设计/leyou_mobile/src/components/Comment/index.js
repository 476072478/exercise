import React, { useState } from 'react'
import './index.css'
import { useParams } from 'react-router-dom'
import { requestsUserComment } from '../../require/request'
export default function Comment(props) {
    const [value, setvalue] = useState('')
    const param = useParams()
    function changeComment(e) {
        setvalue(e.target.value)
    }
    function sendComment() {
        const { username, id: user_id } = JSON.parse(localStorage.getItem('tokenleyou'))
        const { id: spot_id } = param
        requestsUserComment(username, value, spot_id, user_id).then(res => {
            setvalue('');
            props.soncomponent()
        })
    }
    return (
        <div>
            <div className='CommentBox'>
                <input onChange={(e) => { changeComment(e) }} value={value} /><button disabled={value === '' || value === undefined ? true : false} onClick={sendComment}>发送</button>
            </div>
            <div className='Commentopticy'>

            </div>
        </div>
    )
}

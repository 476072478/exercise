import React, { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { requestLogin } from '../../require/request'
export default function Login() {
    const [err, seterr] = useState({
        number: false,
        password: false,
    })
    const [username, setusername] = useState()
    const [passwords, setpasswords] = useState()
    const { number, password } = err
    const navigate = useNavigate()
    function toRegister() {
        navigate("/register", { state: { name: '注册' } })
    }
    //获取登录号码
    function numberInput(e) {
        setusername(e.target.value)
    }
    //获取注册密码
    function passwordInput(e) {
        setpasswords(e.target.value)
    }
    function userLogin() {
        //判断号码或密码不能为空
        if (!username && !passwords) {
            seterr({ password: true, number: true })
        } else if (!username && password) {
            seterr({ password: false, number: true })
        } else if (username && !passwords) {
            seterr({ number: false, password: true })
        } else {
            seterr({ number: false, password: false })
            requestLogin(username, passwords).then(res => {
                if (res.data.status === 1) {
                    alert('账号或密码输入错误')
                } else {
                    localStorage.setItem("tokenleyou", JSON.stringify(res.data))
                    navigate("/home", { state: { name: '首页' } })
                }
            })
        }
    }
    return (
        <div className='RegisterBox'>
            <h1>WELCOME</h1>
            <div className='componentRegister'>
                <div>
                    <input type='text' placeholder='请输入登录名称' onChange={(e) => { numberInput(e) }} />
                    {number && <span>号码不能为空!</span>}
                </div>
                <div>
                    <input type='password' placeholder='请输入密码' onChange={(e) => { passwordInput(e) }} />
                    {password && <span>密码不能为空!</span>}
                </div>
                <button onClick={userLogin}>登录</button>
                <div id='LoginText'>
                    <span onClick={toRegister}>注册账号</span>|<span>忘记密码</span>
                </div>
            </div>
        </div >
    )
}

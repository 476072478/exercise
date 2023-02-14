import React, { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { requestRegUser } from '../../require/request'
export default function Register() {
    const [err, seterr] = useState({
        number: false,
        emails: false,
        name: false,
        password: false,
        surepassword: false
    })
    const { number, emails, name, password, surepassword } = err
    const [allState, setallState] = useState({
        username: "",
        nickname: "",
        passwords: "",
        repetpasswords: "",
        email: ""
    })
    const { username, nickname, passwords, repetpasswords, email } = allState
    const navigate = useNavigate()
    function toLogin() {
        navigate("/login", { state: { name: '登录' } })
    }
    function registerNumber(e) {
        setallState({ ...allState, username: e.target.value })
    }
    function registeremail(e) {
        setallState({ ...allState, email: e.target.value })
    }
    function registername(e) {
        setallState({ ...allState, nickname: e.target.value })
    }
    function passwordsNumber(e) {
        setallState({ ...allState, passwords: e.target.value })
    }
    function repetpasswordsNumber(e) {
        setallState({ ...allState, repetpasswords: e.target.value })
    }
    function userregister() {
        if (!username) {
            seterr({ ...err, number: true })
        } else if (!email) {
            seterr({ ...err, emails: true })
        } else if (!nickname) {
            seterr({ ...err, name: true })
        } else if (!passwords) {
            seterr({ ...err, password: true })
        } else if (!repetpasswords) {
            seterr({ ...err, surepassword: true })
        } else {
            seterr({
                number: false,
                emails: false,
                name: false,
                password: false,
                surepassword: false
            })
            requestRegUser(username, passwords, nickname, email).then(res => { toLogin() })
        }
    }
    return (
        <div className='RegisterBox'>
            <h1>WELCOME</h1>
            <div className='componentRegister'>
                <div>
                    <input type='text' placeholder='请输入注册号码' onChange={(e) => { registerNumber(e) }} />
                    {number && <span>号码不能为空!</span>}
                </div>
                <div>
                    <input type='text' placeholder='请输入邮箱地址' onChange={(e) => { registeremail(e) }} />
                    {emails && <span>号码不能为空!</span>}
                </div>
                <div>
                    <input type='text' placeholder='请输入昵称' onChange={(e) => { registername(e) }} />
                    {name && <span>名称不能为空!</span>}
                </div>
                <div>
                    <input type='password' placeholder='请输入密码' onChange={(e) => { passwordsNumber(e) }} />
                    {password && <span>密码不能为空!</span>}
                </div>
                <div>
                    <input type='password' placeholder='确认密码' onChange={(e) => { repetpasswordsNumber(e) }} />
                    {surepassword && <span>前后密码不一致!</span>}
                </div>
                <button onClick={userregister}>注  册</button>
                <div id='LoginText'>
                    <span>已有账号？</span>|<span onClick={toLogin}>去登录</span>
                </div>
            </div>
        </div>
    )
}

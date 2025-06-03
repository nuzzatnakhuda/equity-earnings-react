import React, { useEffect, useRef } from "react";
import '../LoginRegister.css';
import { login } from "../../../services/userServices"
import { FaUser, FaLock } from "react-icons/fa";
import { TbChevronsDownLeft } from "react-icons/tb";
import { redirect } from "react-router-dom";

const Login = () => {

    useEffect(()=>{
        document.title = "Login Page"
    },[])
    const username = useRef(null);
    const password = useRef(null);

    async function handleClick() {
        const data = {
            username: username.current.value, // kminchelle
            password: password.current.value, // 0lelplR
        }
        if (data != null) {
            login(data).then(res => {
                console.log("Hi");
                if (res.status === 200) {
                        console.log(res);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.id);
                        window.location.href = "#/dashboard";        
                }
            }).catch(err=>alert("Wrong User Name And Password"));
        }
    }

    return (
        <div className='wrapper'>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" ref={username} required />
                <FaUser className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" ref={password} required />
                <FaLock className="icon" />
            </div>

            <button type="button" onClick={handleClick}>Login</button>

            <div className="register-link">
                <p>Don't have an account? <a href='#/register'>Register Here.</a></p>
            </div>
        </div>
    )
}

export default Login
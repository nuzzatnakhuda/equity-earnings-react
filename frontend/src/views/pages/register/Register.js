import React, {useState} from "react";
import { FaUser, FaLock } from "react-icons/fa";
import '../LoginRegister.css';
import { FaEnvelope } from "react-icons/fa6";
import axios from 'axios';
import Validation from './registerValidation';
import { useNavigate } from "react-router-dom";

const Register = () => {
    
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: ''        
    })

    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        console.log(values);
        
        // let token = localStorage.getItem('token');
        // axios.post('http://localhost:8080/api/users/addUser', values, { headers: { Authorization: `Bearer ${token}` } })

        axios.post('http://localhost:8080/api/users/addUser', values)
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    return (
        <form>
            <div className='wrapper'>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleInput} 
                            placeholder="Enter Your Email" 
                            required
                            />
                            <FaEnvelope className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="username"
                            onChange={handleInput} 
                            placeholder="Enter Your Username" 
                            required
                            />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleInput} 
                            placeholder="Enter Password" 
                            required
                        />
                        <FaLock className="icon"/>
                    </div>

                    <button type="button" onClick={handleSubmit}>Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#/login">Login here</a></p>
                    </div>
            </div>
        </form>    
    )
}

export default Register
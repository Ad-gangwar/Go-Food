import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
require('dotenv').config();
const url=process.env.BASE_URL;
export default function Login() {
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setInfo((prevInfo) => ({
            ...prevInfo,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${url}/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: info.email,
                password: info.password
            })
        });

        if (response.status === 200) {
            const json = await response.json();

            if (!json.success) {
                alert('Enter valid credentials');
            }
            else {
                localStorage.setItem("authToken", json.authToken)
                localStorage.setItem("userEmail", info.email)
                navigate("/");
            }


        } else {
            alert('Server error');
        }
    }
    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={info.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
                <Link to="/signup" className="btn m-3 btn-danger">
                    New User
                </Link>
            </form>
        </div>
    )
}

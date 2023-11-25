import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        userName: '',
        email: '',
        location: '',
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
        const response = await fetch('https://food-548g.onrender.com/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.userName,
                email: info.email,
                location: info.location,
                password: info.password
            })
        });

        if (response.status === 200) {
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert('Enter valid credentials');
            } else{
                navigate("/login");
            }
        } else {
            alert('Server error');
        }
    }

    return (

        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={info.userName}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={info.location}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
                <Link to="/login" className="btn m-3 btn-danger">
                    Already a User
                </Link>
            </form>
        </div>
    );
}


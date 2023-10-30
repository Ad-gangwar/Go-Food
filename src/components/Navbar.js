import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Model from '../model';
import Cart from './screen/Cart';
import { useCart} from '../components/ContextReducer';

export default function Navbar() {
    let data = useCart();
    const navigate = useNavigate();
    const [cartView, setCartView] = React.useState(false);
    function handleLogout() {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/" style={{ color: "white", fontWeight: "bold" }}>Go Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active mx-2" aria-current="page" to="/" style={{ color: "white", fontWeight: "bold" }}>Home</Link>
                            </li>
                            {localStorage.getItem("authToken") ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 active mx-2" aria-current="page" to="/myOrders" style={{ color: "white", fontWeight: "bold" }}>My Orders</Link>
                                </li> : " "
                            }
                        </ul>
                        {!localStorage.getItem("authToken") ?
                            <div className='d-flex'>
                                <Link className="fs-6 btn bg-white m-2 text-success" to="/login" style={{ color: "white", fontWeight: "bold" }}>Login</Link>
                                <Link className="fs-6 btn bg-white m-2 text-success" to="/signup" style={{ color: "white", fontWeight: "bold" }}>Signup</Link>
                            </div> :
                            <div>
                                <button className="fs-6 btn bg-white m-2 text-success" style={{ color: "white", fontWeight: "bold" }} onClick={() => {
                                    setCartView(true);
                                }}>My Cart {data.length===0?null:<Badge pill bg="danger"> {data.length} </Badge> }</button>
                                {cartView ? <Model onClose={() => setCartView(false)}><Cart/></Model>: null}
                                <div className="fs-6 btn bg-white m-2 text-danger" style={{ color: "white", fontWeight: "bold" }} onClick={handleLogout}>Log out</div>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}

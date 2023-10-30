import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();
            setOrderData(data);

        } catch (error) {
            console.error('Error fetching data:', error);
            // You can add error handling logic here (e.g., displaying an error message)
        }
    }

    useEffect(() => {
        fetchMyOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(orderData);
    if (orderData === null) {
        return <h2>Loading...</h2>; // Display a loading message while data is being fetched
    } 

    return (
        <div>
            <div><Navbar /></div>
            <div className='container'>
                <div className='row'>
                    {Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.order_date ? <div className='m-auto mt-5'>
                                                        {data = arrayData.order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "190px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : <h3 className='m-5 text-danger'>No data is available! Please order something.</h3>
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    )
};
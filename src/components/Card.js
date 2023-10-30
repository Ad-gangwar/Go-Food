import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card({ foodInfo }) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let options = foodInfo.options[0];
    let priceOptn = Object.keys(options);

    let totalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodInfo._id) {
                food = item;
                break;
            }
        }

        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", payload: { foodInfo, qty, size, totalPrice } })

                return;
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", payload: { foodInfo, qty, size, totalPrice } });

                return;
            }
        }
        await dispatch({ type: "ADD", payload: { foodInfo, qty, size, totalPrice } });

    }
    return (
        <div>
            <div className="card m-3" style={{ "width": "18rem" }}>
                <img src={foodInfo.img} alt='food' className='rounded' style={{ height: "200px", objectFit: "fill" }}></img>
                <div className="card-body">
                    <h5 class="card-title">{foodInfo.name}</h5>
                    <div className='container' w-100>
                        <select className=' m-2 bg-success h-100 rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className=' m-2 bg-success h-100 rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptn.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline mx-2'>
                            ₹{totalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className="fs-6 btn bg-success ms-2" id='cardbtn' style={{ color: "white", fontWeight: "600" }} onClick={handleCart}>Add to Cart </button>
                </div>
            </div>
        </div>
    )
}

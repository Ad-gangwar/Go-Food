import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, { type, payload }) {

    switch (type) {
        case "ADD":
            return [...state, { id: payload.foodInfo._id, name: payload.foodInfo.name, qty: payload.qty, size: payload.size, price: payload.totalPrice, img: payload.foodInfo.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(payload.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === payload.foodInfo._id) {
                    console.log(food.qty, parseInt(payload.qty), payload.totalPrice + food.totalPrice)
                    arr[index] = { ...food, qty: parseInt(payload.qty) + food.qty, price: payload.totalPrice + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            if(payload.isPlaced){
               alert("Your order has been placed!");
               payload.isPlaced=false; 
            }
            
            const empArr=[]
            return empArr;
            default:
                console.log("Error!")
            }
      
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatchContext);
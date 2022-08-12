import { useReducer } from 'react';
import CartContext from "./CartContext";

const defaultCartData = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD"){
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingItem = state.items[existingCartItemIndex]
        let updatedItems;
        if (existingItem){
            const updatedItem = {...existingItem, amount:existingItem.amount + action.item.amount }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        else{
            updatedItems = state.items.concat(action.item)
        }
        
        
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if (action.type === "REMOVE"){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updateItems;
        if (existingItem.amount === 1){
            updateItems = state.items.filter(item => item.id !== action.id)
        }
        else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updateItems = [...state.items]
            updateItems[existingCartItemIndex] = updatedItem
        }
        
        return {items:updateItems, totalAmount: updatedTotalAmount}
        
    }
    return defaultCartData;
}

const CartProvider = (props) => {
    const [cartData, cartDispatchFn] = useReducer(cartReducer, defaultCartData);
    const addItemToCartHandler = item => {
        cartDispatchFn({type:"ADD", item:item})
    };

    const removeItemFromCartHandler = id => {
        cartDispatchFn({type:"REMOVE", id:id})
    }; 
    const cartContext = {
        items: cartData.items,
        totalAmount: cartData.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
    return <CartContext.Provider value={cartContext}>
                {props.children}
            </CartContext.Provider>
}

export default CartProvider
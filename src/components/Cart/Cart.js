import React, { useContext } from "react";
import classes from './Cart.module.css'
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const addItemHandler = item => {
        cartCtx.addItem({...item, amount:1})
    };
    const removeItemHandler = id => {
        cartCtx.removeItem(id)
    };
    const cartItems = cartCtx.items.map(item => <CartItem key={item.id} {...item} onAdd={addItemHandler.bind(null, item)} onRemove={removeItemHandler.bind(null, item.id)} />)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;
    return (
        <Modal onClick={props.onHideCart}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onHideCart} className={classes["button--alt"]}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;
import React, {useContext, useEffect, useState} from 'react';
import CardContext from '../../store/CartContext'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CardContext);
    const [bumpClassOn, setBumpClassOn] = useState(false)
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((currItem, nxtItem) =>{ return currItem + nxtItem.amount}, 0)
    const btnClasses = `${classes.button} ${bumpClassOn ? classes.bump :''}`;
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBumpClassOn(true)
        const timer = setTimeout(()=>{ setBumpClassOn(false) }, 300)
        return(() => {
            clearTimeout(timer)
        })
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;
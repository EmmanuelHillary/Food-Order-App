import React, {useContext} from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/CartContext';

const MealItem = props => {
    const price = `$${props.price}`
    const cartCtx = useContext(CartContext)
    const addAmountHandler = (amount) => {
        cartCtx.addItem({
            id:props.id,
            name: props.name,
            amount: amount,
            price:props.price
        })
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} addAmount={addAmountHandler} />
            </div>
        </li>
    )
};

export default MealItem;
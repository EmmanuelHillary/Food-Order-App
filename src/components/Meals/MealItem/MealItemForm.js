import React, {useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input/Input';


const MealItemForm = (props) => {
    const amountRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitAmountHandler = event => {
        event.preventDefault()
        const amountEntered = amountRef.current.value;
        const amountEnteredNumber = +amountEntered;
        if (amountEntered.trim().length === 0 || amountEnteredNumber < 1 || amountEnteredNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.addAmount(amountEnteredNumber)
    };
    return (
        <form className={classes.form} onSubmit={submitAmountHandler}>
            <Input label="Amount" ref={amountRef} input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
        </form>
    )

};

export default MealItemForm;
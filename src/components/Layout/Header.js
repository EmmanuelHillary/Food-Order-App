import React, { Fragment } from "react"
import foodImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton"

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Hillz Meals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={foodImage} alt="a table with food" />
        </div>
    </Fragment>
}

export default Header;
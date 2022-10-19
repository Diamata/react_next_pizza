import React from 'react';
import styles from "../styles/Products.module.css";
import PizzaList from "../components/PizzaList";

const Products = ({ pizzaList }) => {

    return (
        <div className={styles.container}>
            <PizzaList pizzaList={pizzaList}/>
        </div>
    );
}

export default Products;

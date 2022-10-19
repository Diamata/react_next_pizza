import React, {useState} from 'react';
import styles from '../../styles/Product.module.css';
import Image from "next/image";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {addProduct} from "../../redux/cartSlice";

const Product = ({pizza}) => {

    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const [highlight, setHighlight] = useState(0);
    const dispatch = useDispatch();

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        setHighlight(sizeIndex);
        changePrice(difference);
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if(checked){
            changePrice(option.price);
            setExtras(prev => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter(extra => extra._id !== option._id));
        }
    };

    const handleClick = () => {
        dispatch(addProduct({...pizza, extras, price, quantity}));
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} layout='fill' objectFit='contain' alt=''/>
                </div>
            </div>
            <div className={styles.right}>
                <h2 className={styles.title}>{pizza.title}</h2>
                <span className={styles.price}>${price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h4 className={styles.choose}>Choose the size</h4>

                <div className={styles.sizes}>

                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image className={styles.size} src='/img/size.png' layout='fixed' width={30} height={30} alt='' />
                        <span className={highlight === 0 ? styles.sizeChosen : null}/>
                        <span className={styles.pizzaSize}>Small</span>
                    </div>

                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image className={styles.size} src='/img/size.png' layout='fixed' width={40} height={40} alt='' />
                        <span className={highlight === 1 ? styles.sizeChosen : null}/>
                        <span className={styles.pizzaSize}>Medium</span>
                    </div>

                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image className={styles.size} src='/img/size.png' layout='fixed' width={50} height={50} alt='' />
                        <span className={highlight === 2 ? styles.sizeChosen : null}/>
                        <span className={styles.pizzaSize}>Large</span>
                    </div>
                </div>

                <h4 className={styles.choose}>Choose additional ingredients</h4>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map((option) => (
                        <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e, option)}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return {
        props: {
            pizza: res.data,
        },
    };
};

export default Product;

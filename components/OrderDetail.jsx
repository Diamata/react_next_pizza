import React, {useState} from 'react';
import styles from '../styles/OrderDetail.module.css'

const  OrderDetail = ({ total, createOrder }) => {

    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = () => {
        createOrder({customer, address, total, method: 0});
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <h2 className={styles.title}>You will pay cash on delivery</h2>
                <div className={styles.item}>
                    <label className={styles.label}>Your name and surname</label>
                    <input
                        placeholder='Enter your name'
                        type="text"
                        className={styles.input}
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Phone number</label>
                    <input
                        placeholder='Enter your phone'
                        type="text"
                        className={styles.input}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea
                        rows={5}
                        placeholder='Address of delivery'
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={handleClick}>
                    Order
                </button>

            </div>
        </div>
    );
}

export default OrderDetail;
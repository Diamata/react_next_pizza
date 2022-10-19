import React from 'react';
import styles from '../styles/Footer.module.css';
import Image from "next/image";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src='/img/bg.png' layout='fill' objectFit='cover' alt=''/>
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h3 className={styles.motto}>
                        PROBABLY THE BEST PIZZA YOU CAN IMAGINE!
                    </h3>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.title}>FIND OUR RESTAURANTS</h2>
                    <p className={styles.text}>
                        1654 R. Don Road #304.
                        <br/>New York, 85022
                        <br/>(602) 867-1010
                    </p>
                    <p className={styles.text}>
                        1654 R. Don Road #305.
                        <br/>New York, 85022
                        <br/>(602) 867-1010
                    </p>
                    <p className={styles.text}>
                        1654 R. Don Road #306.
                        <br/>New York, 85022
                        <br/>(602) 867-1010
                    </p>
                    <p className={styles.text}>
                        1654 R. Don Road #307.
                        <br/>New York, 85022
                        <br/>(602) 867-1010
                    </p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.title}>WORKING HOURS</h2>
                    <p className={styles.text}>
                        MONDAY - FRIDAY
                        <br/>9:00 - 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br/>12:00 - 24:00
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
import React, {useState} from 'react';
import styles from '../styles/Navbar.module.css';
import Image from "next/image";
import { useSelector } from 'react-redux';
import Link from "next/link";

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity);

    const [isNavExpanded, setIsNavExpanded] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Link href='tel: 0123456789' passHref>
                        <a><Image src='/img/telephone.png' width='32' height='32'/></a>
                    </Link>
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>
                        <Link href='tel: 0123456789' passHref>
                            <a>ORDER NOW!</a>
                        </Link>
                    </div>
                    <div className={styles.text}>
                        <Link href='tel: 0123456789' passHref>
                            <a>+0 123 456 789</a>
                        </Link>
                    </div>
                </div>

            </div>
            <div className={styles.item}>
                <Link href='/' passHref>
                    <a><Image src='/img/logo.png' className={styles.logo} width='515px' height='78px'/></a>
                </Link>
            </div>
            <div className={styles.item}>
                <Link href='/' passHref>
                    <a><Image src='/img/logo_mini.png' className={styles.logo_mini} width='60px' height='60px'/></a>
                </Link>
            </div>
            <div className={styles.hamburger} onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
                <span className={styles.hamStyle} />
                <span className={styles.hamStyle} />
                <span className={styles.hamStyle} />
            </div>
            <div className={styles.item}>
                <div className={isNavExpanded ? styles.list : styles.listActive}>
                    <div className={styles.listWrapper} onClick={() => {setIsNavExpanded(!isNavExpanded)}}>

                        <Link href='/' passHref>
                            <li className={styles.listItem}>Home</li>
                        </Link>

                        <Link href='/products' passHref>
                            <li className={styles.listItem}>Products</li>
                        </Link>

                        <Link href='#' passHref>
                            <li className={styles.listItem}>Menu</li>
                        </Link>

                        <Link href='#' passHref>
                            <li className={styles.listItem}>Events</li>
                        </Link>

                        <Link href='#' passHref>
                            <li className={styles.listItem}>Blog</li>
                        </Link>

                        <Link href='#' passHref>
                            <li className={styles.listItem}>Contacts</li>
                        </Link>
                    </div>
                </div>
            </div>
            <Link href='/cart' passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src='/img/cart.png' width='30px' height='30px'/>
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Navbar;
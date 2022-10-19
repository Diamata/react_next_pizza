import React, {useState} from 'react';
import styles from "../../styles/Login.module.css";
import {useRouter} from "next/router";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const  router = useRouter();

    const handleClick = async () => {
        try {
            await axios.post('http://localhost:3000/api/login', {username, password});
            await router.push('/admin');
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Admin Dashboard</h2>
                <input
                    placeholder='username'
                    className={styles.input}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='password'
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleClick} className={styles.button}>
                    Sign In
                </button>
                {error && <span className={styles.error}>Wrong Credentials!</span>}
            </div>
        </div>
    );
};

export default Login;
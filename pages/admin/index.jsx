import React, {useState} from 'react';
import styles from '../../styles/Admin.module.css';
import Image from "next/image";
import axios from "axios";

const Index = ({orders, products}) => {

    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ['preparing', 'on the way', 'delivered'];

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete('http://localhost:3000/api/products/' + id);
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch(err) {
            console.log(err);
        }
    };

    const handleStatus = async (id) => {

        const item = orderList.filter(order => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put('http://localhost:3000/api/orders/' + id, {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter(order => order._id !== id),
            ]);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h2 className={styles.title}>Products</h2>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {pizzaList.map(product => (
                        <tbody key={product._id}>
                        <tr className={styles.trItem}>
                            <td>
                                <Image
                                    src={product.img}
                                    width={50}
                                    height={50}
                                    objectFit='cover'
                                    alt=''
                                    className={styles.pizzaPic}/>
                            </td>
                            <td  className={styles.pizzaId}>{product._id.slice(0, 5)}...</td>
                            <td  className={styles.pizzaTitle}>{product.title.slice(0, 5)}...</td>
                            <td  className={styles.pizzaPrice}>${product.prices[0]}</td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
                <h2 className={styles.title}>Orders</h2>
                <table className={styles.table}>
                    <tbody>
                    <tr className={styles.trTitleOrders}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </tbody>
                    {orderList.map(order => (
                        <tbody key={order._id}>
                        <tr className={styles.trItem}>
                            <td className={styles.orderId}>{order._id.slice(0, 5)}...</td>
                            <td className={styles.customer}>{order.customer.slice(0, 5)}...</td>
                            <td className={styles.total}>${order.total}</td>
                            <td className={styles.payment}>
                                {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                            </td>
                            <td className={styles.status}>{status[order.status]}</td>
                            <td>
                                <button className={styles.buttonNext} onClick={() => handleStatus(order._id)}>Next stage</button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export async function getServerSideProps (ctx)  {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    const productRes = await axios.get('http://localhost:3000/api/products');
    const orderRes = await axios.get('http://localhost:3000/api/orders');

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        },
    };
}

export default Index;
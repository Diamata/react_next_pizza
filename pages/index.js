import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import AddButton from "../components/AddButton";
import Add from "../components/Add";

export default function Home({pizzaList, admin}) {

    const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Paparazzi</title>
        <meta name="description" content="Best pizza you have ever imagined!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
        {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList} />
        {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export async function getServerSideProps (ctx){
    const myCookie = ctx.req?.cookies || "";
    let admin = false;

    if (myCookie.token === process.env.TOKEN) {
        admin = true;
    }

    const res = await axios.get("http://176.99.11.170:88/api/products");
    return {
        props: {
            pizzaList: res.data,
            admin,
        },
    };
};

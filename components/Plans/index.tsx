import { CheckIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";
import Table from "../Table";

interface Props {
  products: [] | null;
}
const Plans = ({ products }: Props) => {
  const { logout } = useAuth();
  // console.log(products);

  return (
    <div>
      <Head>
        <title>Netflix - Plans</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="Plans__Header">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Button
          className="Button__SignOut"
          onClick={logout}
        >
          Sign Out
        </Button>
      </header>

      <main className="Plans__Container">
        <h1 className="Plans__Heading">Please Choose the Plan</h1>
        <ul>
          <li className="Plans__List">
            <CheckIcon className="Plans__CheckIcon" /> Watch all you want.
            Ad-free.
          </li>
          <li className="Plans__List">
            <CheckIcon className="Plans__CheckIcon" /> Recommendations
            just for you.
          </li>
          <li className="Plans__List">
            <CheckIcon className="Plans__CheckIcon" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="Plans">
          <div className="Plans__Info">
            {products?.map((product) => {
              // console.log(product.premium.price)
              return (
                <div className="Plans__Box" key={Object.keys(product)[0]}>
                  {Object.keys(product)[0]}
                </div>
              );
            })}
          </div>
        </div>

        <Table products={products}/>

        <Button>Subscribe</Button>
      </main>
    </div>
  );
};

export default Plans;

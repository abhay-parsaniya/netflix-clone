import Head from "next/head";
import Link from "next/link";
import React from "react";
import useAuth from "../../hooks/useAuth";
import requests from "../../utils/requests";

interface Props {
  user_products: {
    email: string;
    plan: string;
  };
}

const Account = ({ user_products }: Props) => {
  const { logout } = useAuth();

  const date = new Date();

  const current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const subscription_date = current_date + " " + current_time;

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription_date}
            </p>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
            <div>
              <p className="font-medium">{user_products?.email}</p>
              <p className="text-[gray]">Password: ********</p>
            </div>
            <div className="md:text-right">
              <p className="membershipLink">Change email</p>
              <p className="membershipLink">Change password</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {/* {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            } */}
            {user_products.plan}
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
            // onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps = async () => {
  const user_products = await fetch(requests.fetchUserProducts, {
    headers: {
      "Content-Type": "application/json",
      method: "GET",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return {
    props: {
      user_products,
    },
  };
};

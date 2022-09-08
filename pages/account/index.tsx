import Link from "next/link";
import React from "react";
import HeadName from "../../components/HeadName";
import LogoImage from "../../components/LogoImage";
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
      <HeadName name="Account Settings - Netflix" />

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <LogoImage width={120} height={120} />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="Account">
        <div className="Account__Info">
          <h1 className="Account__Info__Title">Account</h1>
          <div className="Account__Info__Member">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="Account__Info__MembershipDate">
              Member since {subscription_date}
            </p>
          </div>
        </div>

        {/* this all values are satic at the moment */}

        <div className="col-span-3">
          <div className="Account__Profile">
            <div>
              <p className="font-medium">{user_products?.email}</p>
              <p className="text-[gray]">Password: ********</p>
            </div>
            <div className="md:text-right">
              <p className="Account__Profile__MembershipLink">Change email</p>
              <p className="Account__Profile__MembershipLink">Change password</p>
            </div>
          </div>
        </div>

        <div className="Account__Plan">
          <h4 className="Account__Plan__Heading">Plan Details</h4>
          {/* Find the current plan */}
          <div className="Account__Plan__Detail">
            {user_products.plan}
          </div>
          <p
            className="Account__Plan__ChangeLink"
          >
            Change plan
          </p>
        </div>

        <div className="Account__Settings">
          <h4 className="Account__Settings__Heading">Settings</h4>
          <p
            className="Account_Settings__SignOut"
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

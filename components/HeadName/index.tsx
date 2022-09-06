import React from "react";
import Head from "next/head";

interface Props {
  name: string;
}
const HeadName = ({ name }: Props) => {
  return (
    <Head>
      <title>{name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadName;

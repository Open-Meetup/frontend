import classnames from "classnames/bind";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import style from "./index.module.scss";

const cx = classnames.bind(style);

const Home = () => (
  <div className={cx("home")}>
    <Head>
      <title>Open Meetup</title>
      <meta content="Find new friends and meetup together" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <header>Header</header>

    <main className={cx("main")}>Main</main>

    <footer className={cx("footer")}>Footer</footer>
  </div>
);

export default Home;

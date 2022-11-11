import classnames from "classnames/bind";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import style from "./index.module.scss";

const cx = classnames.bind(style);

const Home = () => (
  <div className={cx("home")}>
    <h1>HP</h1>
  </div>
);

export default Home;

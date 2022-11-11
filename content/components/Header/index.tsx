import classNames from "classnames/bind";
import React from "react";
import LogoImage from "../Svgs/logo";
import UserStatus from "../UserStatus";
import style from "./index.module.scss";

const cx = classNames.bind(style);

const Header = () => (
  <header className={cx("header")}>
    <div className={cx("header__logo")}>
      <LogoImage />
      <span className={cx("header__logo-text")}>
        <span>Open</span>
        Meetup
      </span>
    </div>
    <nav className={cx("header__actions")}>
      <UserStatus />
    </nav>
  </header>
);

export default Header;

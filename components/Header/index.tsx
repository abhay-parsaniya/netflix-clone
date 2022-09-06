import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import BasicMenu from "../BasicMenu";
import LogoImage from "../LogoImage";
import MenuList from "../MenuList";
import { Menu__List } from "../../constants/menu";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Header__Background = `${isScrolled && "bg-[#141414]"}`;

  return (
    <header className={Header__Background}>
      <div className="Header__Menu">
        <LogoImage width={100} height={100} />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          {Menu__List.map((menu) => (
            <MenuList
              key={menu.menu_title}
              path={menu.path}
              className={menu.className}
              menu_title={menu.menu_title}
            />
          ))}
        </ul>
      </div>
      <div className="Header__Menu__Options">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6 sm:inline" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
        {user && (
          <p onClick={logout} className="Header__SignOut">
            Sign Out
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import BasicMenu from "../BasicMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          <li className="Header__Menu__Link Header__Home__Link">
            Home
          </li>
          <li className="Header__Menu__Link">TV Shows</li>
          <Link href='/movies'><li className="Header__Menu__Link">Movies</li></Link>
          <Link href='/new&popular'><li className="Header__Menu__Link">New & Popular</li></Link>
          <Link href='/mylist'><li className="Header__Menu__Link">My List</li></Link>
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
      </div>
    </header>
  );
};

export default Header;

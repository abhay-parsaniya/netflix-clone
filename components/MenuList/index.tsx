import Link from "next/link";
import React from "react";

interface Props{
    path: string,
    className: string,
    menu_title: string
}

const MenuList = ({path, className, menu_title}: Props) => {
  return (
    <Link href={path}>
      <li className={className}>{menu_title}</li>
    </Link>
  );
};

export default MenuList;

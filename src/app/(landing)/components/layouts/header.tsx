"use client";

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";

const Header = () => {
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const { items } = useCartStore();

  return (
    <header className="relative z-50">
      <div className="flex justify-between gap-10 container mx-auto py-7 px-24">
        <Link href="/">
          <Image src="/images/logo.svg" alt="Sport E-Commerce Logo" width={127} height={30}></Image>
        </Link>

        <nav className="flex gap-36 font-medium">
          <Link
            href="#"
            className="relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-0.75 after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1">
            Home
          </Link>
          <Link href="#">Category</Link>
          <Link href="#">Explore Products</Link>
        </nav>

        <div className="relative flex gap-10">
          <FiSearch size={24} />

          <button className="relative cursor-pointer" onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}>
            <FiShoppingBag size={24} />
            {items.length ? (
              <div className="bg-primary rounded-full w-4 h-4 absolute -top-1.5 -right-1 text-[12px] text-white text-center">
                {items.length}
              </div>
            ) : (
              <></>
            )}
          </button>
          {isCartPopupOpen && <CartPopup />}
        </div>
      </div>
    </header>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCaretDown } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";

export default function Header() {
  const [showCategory, setShowCategory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const showSubMenu = () => setShowCategory(true);
  const hideSubMenu = () => setShowCategory(false);

  return (
    <header id="header" className="bg-slate-900 text-gray-300 py-2">
      <div className="container flex items-center justify-between md:justify-start gap-10">
        <div className="logo_area">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={80} height={53} />
          </Link>
        </div>

        <nav
          id="navbar"
          className="nav_btn_container md:flex md:ml-auto fixed top-0 right-0 md:static duration-300"
          style={{ right: showMenu ? 0 : -260 }}
        >
          <ul className="nav_item_wrapper md:flex md:gap-6 text-lg bg-neutral-900 md:bg-slate-900 h-[100vh] md:h-auto w-[200px] md:w-auto px-12 md:px-0 pt-14 md:p-0 z-40">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li
              className="relative"
              onMouseOver={showSubMenu}
              onMouseLeave={hideSubMenu}
            >
              <span
                className="flex items-center gap-1"
                onClick={() => setShowCategory(!showCategory)}
              >
                Category <BsCaretDown className="text-base pt-1" />
              </span>

              <ul
                className="sub-menu min-w-[130px] absolute top-10 -left-4 bg-neutral-800 md:bg-slate-900 px-4 pb-2 text-gray-400 text-sm"
                style={{
                  height: showCategory ? "auto" : 0,
                  visibility: showCategory ? "visible" : "hidden",
                }}
              >
                <li>
                  <a href="">Smartphone</a>
                </li>
                <li>
                  <a href="">PC</a>
                </li>
                <li>
                  <a href="">Gaming</a>
                </li>
                <li>
                  <a href="">Tips and Tricks</a>
                </li>
                <li>
                  <a href="">Programming</a>
                </li>
                <li>
                  <a href="">Science & Tech</a>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5">
          <div className="btn_container flex gap-3">
            <Link href={"/create"} className="btn__primary bg_create">
              Create a Blog
            </Link>
            <Link href={"/login"} className="btn__primary bg_purple">
              Login
            </Link>
          </div>

          <div
            className="hamburger-close md:hidden z-50 text-2xl"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <AiOutlineCloseCircle /> : <FaHamburger />}
          </div>
        </div>
      </div>
    </header>
  );
}

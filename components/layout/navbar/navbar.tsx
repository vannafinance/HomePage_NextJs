"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./style.css";
import Button from "../../button";

interface AppMenuItem {
  name: string;
  link: string;
}

interface DevelopersMenuItem {
  name: string;
  link: string;
}

interface CommunityMenuItem {
  name: string;
  link: string;
  icon: string;
}

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showDevelopersDropdown, setShowDevelopersDropdown] =
    useState<boolean>(false);
  const [showCommunityDropdown, setShowCommunityDropdown] =
    useState<boolean>(false);
  const [showAppDropdown, setShowAppDropdown] = useState<boolean>(false);

  const developersMenu: DevelopersMenuItem[] = [
    { name: "Whitepaper", link: "https://docsend.com/v/4hxps/whitepaper" },
    // { name: "Bug Bounty", link: "" },
  ];

  const communityMenu: CommunityMenuItem[] = [
    {
      name: "Discord",
      link: "https://discord.gg/MmK9rsWdzS",
      icon: "/icons/discordLogo.svg",
    },
    {
      name: "Twitter",
      link: "https://x.com/vannaprotocol",
      icon: "/icons/xLogo.svg",
    },
    {
      name: "Telegram",
      link: "https://t.me/vannaprotocolann",
      icon: "/icons/telegramLogo.svg",
    },
    {
      name: "Telegram Group",
      link: "https://t.me/vannaprotocol",
      icon: "/icons/telegramLogo.svg",
    },
  ];

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  const closeMenuDropdown = (): void => {
    // close menu on mobile
    if (typeof window !== "undefined" && window.innerWidth <= 1150) {
      setShowMenu(false);
    }

    // close dropdowns
    if (showDevelopersDropdown) {
      setShowDevelopersDropdown(false);
    }
    if (showCommunityDropdown) {
      setShowCommunityDropdown(false);
    }
    if (showAppDropdown) {
      setShowAppDropdown(false);
    }
  };
  return (
    <>
      <header className="header bg-white">
        <nav className="bg-white relative z-[100] w-full max-w-screen mx-auto h-[65px] flex items-center justify-between md:px-10 px-[30px]">
          <div className="w-[134px] h-full flex items-center">
            <Link href="/" className="nav__logo" target="_blank">
              <Image
                src="/images/vannaLogo.svg"
                className="w-[33.46px] object-contain"
                alt="Vanna Finance Logo"
                width={34}
                height={34}
              />
            </Link>
          </div>

          <div
            className={`nav__menu ${
              showMenu ? "show-menu bg-white" : "bg-transparent"
            } transition-all`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <div className="relative inline-block">
                <li className="nav__item">
                  <Link
                    href="#"
                    className="nav__link"
                    onClick={() =>
                      setShowDevelopersDropdown(!showDevelopersDropdown)
                    }
                  >
                    Developers
                    <Image
                      src="/icons/downArrow.svg"
                      className="w-4 h-4 inline-block ml-1"
                      alt="Dropdown arrow"
                      width={16}
                      height={16}
                    />
                  </Link>
                </li>
                {showDevelopersDropdown && (
                  <div className="bg-white origin-top-right absolute -left-4 w-40 mt-0.5 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 top-10 z-50 transition-all duration-300 p-1.5">
                    {developersMenu.map((item, index) => (
                      <Link
                        className="flex items-center p-3 text-sm font-medium text-[#181822] w-full rounded-lg hover:bg-[#f4f4ff]"
                        key={"dev-" + index}
                        href={item.link}
                        onClick={closeMenuDropdown}
                        target="_blank"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <li className="nav__item">
                <Link
                  href="/"
                  className="nav__link"
                  onClick={closeMenuDropdown}
                  target="_blank"
                >
                  Governance
                </Link>
              </li>
              <div className="relative  inline-block">
                <li className="nav__item">
                  <Link
                    href="#"
                    className="nav__link"
                    onClick={() =>
                      setShowCommunityDropdown(!showCommunityDropdown)
                    }
                  >
                    Community
                    <Image
                      src="/icons/downArrow.svg"
                      className="w-4 h-4 inline-block ml-1"
                      alt="Dropdown arrow"
                      width={16}
                      height={16}
                    />
                  </Link>
                </li>
                {showCommunityDropdown && (
                  <div className="bg-white origin-top-right absolute -left-4 w-44 mt-0.5 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 top-10 z-50 transition-all duration-300 p-1.5">
                    {communityMenu.map((item, index) => (
                      <Link
                        className="flex items-center p-3 text-sm font-medium text-[#181822] w-full rounded-lg hover:bg-[#f4f4ff]"
                        key={"com-" + index}
                        href={item.link}
                        onClick={closeMenuDropdown}
                        target="_blank"
                      >
                        <Image
                          src={item.icon}
                          className="w-6 h-w-6 inline-block mr-2"
                          alt={item.name}
                          width={24}
                          height={24}
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {showMenu && (
                <Button
                  containerClassName="w-full"
                  className="w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
                  redirectTo="/join_waitlist"
                >
                  Join Waitlist
                </Button>
              )}
            </ul>
          </div>

          <Button
            className="nav__button w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
            redirectTo="/join_waitlist"
          >
            Join Waitlist
          </Button>

          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <Image
              src={showMenu ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={showMenu ? "Close menu" : "Open menu"}
              width={24}
              height={24}
            />
          </div>
        </nav>
      </header>
      <div className="w-full h-[65px]" />
    </>
  );
};

export default Navbar;
export type { AppMenuItem, DevelopersMenuItem, CommunityMenuItem };

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="custom-container w-full max-w-screen py-16 bg-white rounded-2xl flex-col justify-start items-start gap-10 inline-flex">
      <div className="p-10 w-full  flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-[433px] flex-col justify-start items-start gap-3.5 inline-flex">
          <Link
            href="/"
            className="w-[140px] justify-start items-center gap-2 inline-flex"
            target="_blank"
          >
            <Image
              src="/images/vannaLogo.svg"
              className="w-[33.46px] object-contain"
              width={33.46}
              height={33.46}
              alt="Vanna logo"
            />
            <div className="text-[#181822] text-2xl font-extrabold uppercase">
              Vanna
            </div>
          </Link>
          <div className="pb-[0.51px] flex-col justify-start items-start flex">
            <div className="text-[#76737b] text-base text-left font-medium leading-tight">
              Vanna&apos;s goal is to empower users with seamless crypto trading
              and lending, offering advanced tools for maximizing growth and
              control.
            </div>
          </div>
          <div className="justify-start items-center gap-5 inline-flex">
            <Link
              href="https://discord.gg/MmK9rsWdzS"
              className="justify-start items-start flex"
              target="_blank"
            >
              <Image
                src="/icons/discordLogo.svg"
                className="w-[20.89px] h-[22px] relative"
                width={20.89}
                height={22}
                alt="Discord logo"
              />
            </Link>
            <Link
              href="https://x.com/vannaprotocol"
              className="justify-start items-start flex"
              target="_blank"
            >
              <Image
                src="/icons/xLogo.svg"
                className="w-[20.89px] h-[22px] relative"
                width={20.89}
                height={22}
                alt="X logo"
              />
            </Link>
            <Link
              href="https://t.me/vannaprotocolann"
              className="justify-start items-start flex"
              target="_blank"
            >
              <Image
                src="/icons/telegramLogo.svg"
                className="w-[20.89px] h-[22px] relative"
                width={20.89}
                height={22}
                alt="Telegram logo"
              />
            </Link>
          </div>
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className="flex flex-wrap justify-start items-start gap-[72px]">
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="h-[17px] flex-col justify-start items-start flex">
                <div className="text-[#181822] text-sm font-semibold leading-[16.80px] text-left">
                  Developers
                </div>
              </div>
              <div className="h-[130.20px] flex-col justify-start items-start gap-2.5 flex">
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <a
                      href="https://docsend.com/v/4hxps/whitepaper"
                      target="_blank"
                    >
                      <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                        Whitepaper
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

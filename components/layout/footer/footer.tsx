"use client";


import React from "react";
import Link from "next/link";

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
            <img
              src="/images/vannaLogo.svg"
              className="w-[33.46px] object-contain"
            />
            <div className="text-[#181822] text-2xl font-extrabold uppercase">
              Vanna
            </div>
          </Link>
          <div className="pb-[0.51px] flex-col justify-start items-start flex">
            <div className="text-[#76737b] text-base text-left font-medium leading-tight">
              Vanna&apos;s goal is to empower users with seamless crypto trading and
              lending, offering advanced tools for maximizing growth and
              control.
            </div>
          </div>
          <div className="justify-start items-center gap-5 inline-flex">
            <Link
              href="https://discord.gg/MmK9rsWdzS"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/discordLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link>
            <Link
              href="https://x.com/vannaprotocol"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/xLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link>
            <Link
              href="https://t.me/vannaprotocolann"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/telegramLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link>
            
            
            {/* <Link
              to="/"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/youtubeLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link>
            <Link
              href="/"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/redditLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link>
            <Link
              href="/"
              className="justify-start items-start flex"
              target="_blank"
            >
              <img
                src="/icons/farcasterLogo.svg"
                className="w-[20.89px] h-[22px] relative"
              />
            </Link> */}
          </div>
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className="flex flex-wrap justify-start items-start gap-[72px]">
            {/* <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="h-[17px] flex-col justify-start items-start flex">
                <div className="text-[#181822] text-sm font-semibold leading-[16.80px] text-left">
                  About
                </div>
              </div>
              <div className="h-[130.20px] flex-col justify-start items-start gap-2.5 flex">
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Mission
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Blog
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      FAQs
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.61px] pb-[0.43px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Help & Support
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.61px] pb-[0.43px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Governance
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="h-[17px] flex-col justify-start items-start flex">
                <div className="text-[#181822] text-sm font-semibold leading-[16.80px] text-left">
                  Developers
                </div>
              </div>
              <div className="h-[130.20px] flex-col justify-start items-start gap-2.5 flex">
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <a href="https://docs.vanna.finance/docs" target="_blank">
                      <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                        User Docs
                      </div>
                    </a>
                  </div>
                </div>
                {/* <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <a href="https://github.com/vanna-protocol" target="_blank">
                      <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                        Github
                      </div>
                    </a>
                  </div>
                </div> */}
                {/* <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                <div className="justify-start items-start inline-flex">
                    <a
                      href="https://docs.vanna.finance/tech"
                      target="_blank"
                    >
                      <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                        Technical Docs
                      </div>
                    </a>
                  </div>
                </div> */}
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
                {/* <div className="h-[18.04px] pt-[0.61px] pb-[0.43px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Bug Bounty
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="h-[17px] flex-col justify-start items-start flex">
                <div className="text-[#181822] text-sm font-semibold leading-[16.80px] text-left">
                  Company
                </div>
              </div>
              <div className="h-[130.20px] flex-col justify-start items-start gap-2.5 flex">
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Privacy Policy
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Terms of Use
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.61px] pb-[0.43px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Brand
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.60px] pb-[0.44px] flex-col justify-center items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Legal
                    </div>
                  </div>
                </div>
                <div className="h-[18.04px] pt-[0.61px] pb-[0.43px] flex-col justify-start items-start flex">
                  <div className="justify-start items-start inline-flex">
                    <div className="text-[#76737b] text-sm font-normal leading-[16.80px] text-left">
                      Careers
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

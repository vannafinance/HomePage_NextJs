"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./button";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionData = [
    {
      title: "Perpetual",
      content: [
        {
          detail: "1. Advanced Hedge Mode",
          description: "Protect perpetual trades on both sides.",
        },
        {
          detail: "2. Cross-Chain Access",
          description: "Trade on multiple platforms with top liquidity.",
        },
      ],
      tryNowRedirectTo: "https://app.vanna.finance/trade/future",
      imgSrc: "/images/traders/futures.webp",
    },
    {
      title: "Options",
      content: [
        {
          detail: "1. Flexible Strategies",
          description: "Customize your options trades for any market scenario.",
        },
        {
          detail: "2. Platform Choice",
          description:
            "Trade across multiple options platforms with diverse assets.",
        },
      ],
      tryNowRedirectTo: "https://app.vanna.finance/trade/options",
      imgSrc: "/images/traders/option.webp",
    },
    {
      title: "Spot",
      content: [
        {
          detail: "1. Instant Execution",
          description:
            "Swap assets in real-time with immediate settlements, ensuring full ownership of your trades without delays.",
        },
        {
          detail: "2. Cross-Chain Trading",
          description:
            "Trade seamlessly across multiple chains and access the best liquidity pools for diverse assets, all from a single platform.",
        },
      ],
      tryNowRedirectTo: "https://app.vanna.finance/trade/spot",
      imgSrc: "/images/traders/spot.webp",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <div className="custom-container py-[80px] md:py-[100px] flex-col justify-start items-center gap-20 inline-flex">
      <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-20 flex-wrap">
        <Image
          className="hidden lg:block max-w-[560px] object-contain rounded-2xl"
          src={accordionData[openIndex].imgSrc}
          alt={`${accordionData[openIndex].title} trading interface`}
          width={560}
          height={300}
        />
        <div className="flex-1 py-2 justify-start items-start flex flex-col gap-8 w-full text-white">
          {accordionData.map((item, index) => (
            <React.Fragment key={index}>
              <Image
                className={`block lg:hidden w-full object-contain rounded-xl ${
                  openIndex === index ? "" : "hidden"
                }`}
                src={accordionData[openIndex].imgSrc}
                alt={`${item.title} trading interface`}
                width={400}
                height={300}
              />
              <div
                className={`w-full lg:w-fit lg:max-w-[360px] pl-5 border-l-4 flex flex-col gap-6 ${
                  openIndex === index
                    ? "border-[#9064e0]"
                    : "border-transparent"
                }`}
              >
                <div
                  className="w-full justify-start items-start gap-6 inline-flex cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex-1 md:min-w-[280px] flex-col justify-start items-start gap-7 inline-flex">
                    <div className="w-full justify-start items-center gap-4 inline-flex">
                      <div
                        className={`${
                          openIndex !== index
                            ? "text-[#8D8896]"
                            : "text-[#9064e0]"
                        } text-2xl font-bold leading-[33.60px] text-left`}
                      >
                        {item.title}
                      </div>
                    </div>
                  </div>
                  {openIndex === index ? (
                    <Image
                      src="/icons/upArrow.svg"
                      className="w-8 h-8"
                      alt="Collapse section"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/icons/downArrow.svg"
                      className="w-8 h-8"
                      alt="Expand section"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                {openIndex === index && (
                  <div className="flex flex-col gap-6">
                    <div className="flex-col justify-start items-start gap-4 flex">
                      {item.content.map((elm, index) => (
                        <div
                          key={index}
                          className="h-fit flex-col justify-start items-start gap-1.5 flex"
                        >
                          <div className="text-white text-base font-semibold leading-tight text-left">
                            {elm.detail}
                          </div>
                          <div className="text-[#b5b3b3] text-base font-normal leading-tight text-left">
                            {elm.description}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-fit p-2.5 rounded-[10px] border-style justify-center items-center gap-2 inline-flex cursor-pointer"
                      redirectTo={item.tryNowRedirectTo}
                    >
                      <div className="gradient-text text-base font-semibold leading-tight">
                        Trade now
                      </div>
                      <Image
                        src="/icons/arrow.svg"
                        className="w-5 h-5 relative"
                        alt="Arrow icon"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

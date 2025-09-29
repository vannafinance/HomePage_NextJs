import React from "react";
import Image from "next/image";
import Button from "../button";

const LenderSection = () => {
  return (
    <div id="lender" className="custom-container w-full flex flex-col">
      <div className="p-10 w-full">
        <div className="w-full py-[40px] md:py-[60px] flex justify-center items-center gap-8 flex-col lg:flex-row">
          <Image
            className="md:max-w-[650px] w-full object-contain shadow rounded-2xl"
            src="/images/earnDetails.webp"
            alt="Vanna lending and earning interface"
            width={650}
            height={400}
          />
          <div className="flex-col justify-center items-start gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-2.5 flex">
              <div className="text-left text-[#181822] text-[40px] font-bold leading-[50px]">
                Lend and Grow with Vanna
              </div>
              <div className="text-left text-[#636060] text-xl font-normal leading-normal">
                Maximize your returns by supplying liquidity to our secure
                crypto pools.
              </div>
            </div>
            <Button
              className="px-6 py-3 rounded-md !border-l !border-r-4 !border-t !border-b-4 border-white-style justify-center items-center gap-2 inline-flex cursor-pointer"
              redirectTo="https://app.vanna.finance/earn"
            >
              <div className="gradient-text text-base font-semibold leading-tight">
                Start Earning Now
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className=" w-full pb-[60px] flex flex-col lg:flex-row justify-center items-start gap-6">
        <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-8 h-8 relative">
              <Image
                src="/icons/wallet.svg"
                className="w-8 h-8 left-0 top-0 absolute"
                alt="Wallet icon"
                width={32}
                height={32}
              />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-[#201c1c] text-base font-semibold leading-snug">
                Connect your Wallet
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-[#636060] text-base font-medium leading-tight text-left">
              Start by connecting your preferred crypto wallet. This allows you
              to access the platform and manage your investments seamlessly.
            </div>
          </div>
        </div>
        <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-8 h-8 relative">
              <Image
                src="/icons/explore.svg"
                className="w-8 h-8 left-0 top-0 absolute"
                alt="Explore icon"
                width={32}
                height={32}
              />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-[#201c1c] text-base font-semibold leading-snug">
                Explore and Choose pool
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-[#636060] text-base font-medium leading-tight text-left">
              Browse our available pools across various assets. Choose the one
              that fits your strategy and view detailed stats like APY and pool
              size.
            </div>
          </div>
        </div>
        <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-8 h-8 relative">
              <Image
                src="/icons/supplyLiquidity.svg"
                className="w-8 h-8 left-0 top-0 absolute"
                alt="Supply liquidity icon"
                width={32}
                height={32}
              />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-[#201c1c] text-base font-semibold leading-snug">
                Supply Liquidity
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-[#636060] text-base font-medium leading-tight text-left">
              Deposit your chosen asset into the pool. This instantly begins
              generating rewards, and you can track your earnings in real time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderSection;

import React from "react";
import Image from "next/image";

const BenefitsSection = () => {
  return (
    <section className="p-22  w-full bg-bgColor flex items-center justify-center min-h-screen">
      <div className="custom-container mx-auto py-[80px] md:py-[100px] flex flex-col gap-12 items-center justify-center">
        <div className="max-w-[650px] flex flex-col gap-4 justify-center items-center text-center">
          <h6 className="text-[#969B9C] font-bold text-base ">
            Experience the Power of Vanna
          </h6>
          <h3 className=" font-bold text-white text-3xl md:text-[40px]  md:leading-[50px]">
            Look Beyond Limits
          </h3>
        </div>
        <div className="flex flex-col gap-5 pt-10 ">
          <div className="grid grid-cols-6 lg:grid-cols-8 gap-5 text-white">
            <div className="col-span-6 md:col-span-3 lg:col-span-5 border-style p-8 px-[27px] rounded-[24px] flex flex-col">
              <div className="order-2 md:order-1 text-start text-[24px]">
                <h3>Amplify Your Margin Balance with Composable Leverage</h3>
                <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                  Maximize your trading potential with undercollateralized
                  loans and allocate it across derivatives, spot, automated
                  vaults, yield strategies, and money markets.
                </p>
              </div>
              <div className="order-1 md:order-2 flex justify-center pb-5 md:p-0 md:pt-5 lg:p-4">
                <Image
                  src="/images/benefits/leverage.webp"
                  className="max-h-[298px] w-full object-contain rounded-2xl"
                  alt="Composable leverage trading interface"
                  width={560}
                  height={298}
                />
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-3 border-style flex flex-col justify-between p-8 px-[27px]">
              <div className="flex justify-center">
                <Image
                  src="/images/benefits/pool.webp"
                  className="w-full max-h-[180px] md:max-h-fit object-contain pb-6"
                  alt="Advanced lending pools interface"
                  width={360}
                  height={180}
                />
              </div>
              <div className="text-start text-[24px]">
                <h3>Earn Superior Yields with Advanced Lending Pools</h3>
                <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                  Our innovative lending pools offer higher yields than
                  traditional platforms, thanks to leveraged borrowing and
                  shared liquidation fees.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 lg:grid-cols-8 gap-5 text-white">
            <div className="col-span-6 md:col-span-3 lg:col-span-3 border-style flex flex-col p-8 px-[27px]">
              <div className="flex items-start justify-center">
                <Image
                  src="/images/benefits/borrow.webp"
                  className="w-full max-h-[180px] md:max-h-fit object-contain"
                  alt="LSTs and LRTs borrowing interface"
                  width={360}
                  height={180}
                />
              </div>
              <div className="text-start text-[24px] mt-[32px]">
                <h3>Leverage Your Assets with LSTs and LRTs</h3>
                <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                  Unlock liquidity by using these assets as collateral to
                  borrow additional margin, maximizing capital efficiency
                  while keeping your assets actively in play.
                </p>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-5 border-style p-8 px-[27px] flex flex-col gap-5">
              <div className="order-2 md:order-1 text-start text-[24px]">
                <h3>Complete Control with the Greeks Dashboard</h3>
                <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                  Gain advanced insights into your positions with our Greeks
                  Dashboard, empowering you to make smarter, data-driven
                  decisions and manage your risk with precision.
                </p>
              </div>
              <div className="order-1 md:order-2 flex justify-center items-center ">
                <Image 
                  src="/images/benefits/chart.webp" 
                  alt="Greeks dashboard analytics chart"
                  width={560}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

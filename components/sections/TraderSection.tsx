import React from "react";
import Image from "next/image";
import Button from "../button";
import Accordion from "../accordion";

const TraderSection = () => {
  return (
    <div id="trader" className="p-10 md:p-20 w-full bg-bgColor flex flex-col pb-4 md:pb-20">
      <div className="w-full h-full custom-container pt-[60px] md:pt-[80px] pb-[60px] flex-col justify-start items-start gap-12 inline-flex">
        <div className="pt-6 pb-10 flex flex-col lg:flex-row justify-start items-center gap-12">
          <div className="order-2 lg:order-1 flex-col justify-start items-start gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-8 flex">
              <div className="flex-col justify-start items-start gap-2.5 flex">
                <div className="flex-col justify-start items-start gap-2.5 flex">
                  <div className="text-white text-[40px] font-bold text-left leading-[50px]">
                    Multiply your Trading Power with Leveraged Borrowing
                  </div>
                  <div className="text-white text-xl font-normal text-left leading-normal">
                    Maximize trading limit with simple steps.
                  </div>
                </div>
              </div>
              <div className="py-2 flex-col justify-start items-start gap-4 flex">
                <div className="justify-start items-start gap-4 inline-flex">
                  <Image src="/icons/cube.svg" className="w-4 h-4 relative" alt="Cube icon" width={16} height={16} />
                  <div className="w-full flex flex-col">
                    <span className="text-white text-base font-medium text-left leading-tight">
                      Deposit Collateral
                    </span>
                    <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                      Securely provide your LSTs, LRTs, or native assets to
                      obtain an undercollateralized loan and boost your
                      trading capacity.
                    </span>
                  </div>
                </div>
                <div className="justify-start items-start gap-4 inline-flex">
                  <Image src="/icons/cube.svg" className="w-4 h-4 relative" alt="Cube icon" width={16} height={16} />
                  <div className="w-full flex flex-col">
                    <span className="text-white text-base font-medium text-left leading-tight">
                      Borrow with Leverage
                    </span>
                    <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                      Choose your leverage up to 10x and borrow instantly
                      against your collateral to increase your market
                      exposure across derivatives, spot, and other markets.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="px-6 py-3 rounded-md !border-l !border-r-4 !border-t !border-b-4 border-style justify-center items-center gap-2 inline-flex cursor-pointer"
              redirectTo="https://app.vanna.finance/borrow"
            >
              <div className="gradient-text text-base font-semibold leading-tight">
                Borrow & Trade
              </div>
            </Button>
          </div>
          <div className="order-1 lg:order-2 lg:w-full">
            <Image
              className="w-full object-contain rounded-[10px]"
              src="/images/traders/borrow.webp"
              alt="Leveraged borrowing trading interface"
              width={650}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="pt-26 md:pt-10 h-screen w-full flex flex-col justify-center items-center">
        <Accordion />
      </div>

      

      {/* Greeks Dashboard Section */}
      <div className=" w-full min-h-screen flex flex-col justify-center items-center py-8 md:py-20">
        <div className="custom-container w-full flex flex-col justify-center items-center gap-8 md:gap-16">
          {/* Header */}
          <div className="max-w-[650px] flex-col justify-center items-center gap-5 flex text-center">
            <div className="pt-26 md:pt-10 text-white text-[40px] font-bold leading-[50px]">
              Greeks Dashboard
            </div>
            <div className="text-center text-[#9f9c9c] text-base font-normal leading-normal">
              Track and manage your risk with real-time Greeks data. Optimize
              your options and futures positions to align with your trading
              strategies and market conditions
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-8 px-4 md:px-8">
            {/* Feature Cards - Mobile/Tablet Layout */}
            <div className="xl:hidden w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                <div className="flex items-start gap-3 mb-3">
                  <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                  <span className="text-white text-base font-semibold leading-tight">
                    Multi-Leg Strategies & Payoff Graphs:
                  </span>
                </div>
                <p className="text-[#b5b3b3] text-sm leading-relaxed">
                  Build complex multi-leg options strategies like straddles
                  and spreads, visualized with real-time payoff graphs for
                  better strategy management.
                </p>
              </div>
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                <div className="flex items-start gap-3 mb-3">
                  <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                  <span className="text-white text-base font-semibold leading-tight">
                    Live Position Simulation:
                  </span>
                </div>
                <p className="text-[#b5b3b3] text-sm leading-relaxed">
                  Monitor live simulations of your open options and futures
                  positions, with real-time profit/loss and payoff graphs to
                  dynamically adjust your strategies.
                </p>
              </div>
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                <div className="flex items-start gap-3 mb-3">
                  <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                  <span className="text-white text-base font-semibold leading-tight">
                    Real-Time Greeks Calculation:
                  </span>
                </div>
                <p className="text-[#b5b3b3] text-sm leading-relaxed">
                  Get instant insights into key Greeks (Delta, Gamma, Theta,
                  Vega, Rho) to understand how your positions react to market
                  changes, volatility, and time decay.
                </p>
              </div>
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                <div className="flex items-start gap-3 mb-3">
                  <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                  <span className="text-white text-base font-semibold leading-tight">
                    Live PnL Tracking:
                  </span>
                </div>
                <p className="text-[#b5b3b3] text-sm leading-relaxed">
                  Track real-time profit and loss across individual options or
                  entire strategies, refining your hedging approaches to
                  maximize profitability.
                </p>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:flex w-full justify-between items-center gap-8">
              {/* Left Feature Cards */}
              <div className="flex flex-col gap-6 max-w-[280px] flex-shrink-0">
                <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                    <span className="text-white text-base font-semibold leading-tight">
                      Multi-Leg Strategies & Payoff Graphs:
                    </span>
                  </div>
                  <p className="text-[#b5b3b3] text-sm leading-relaxed">
                    Build complex multi-leg options strategies like straddles
                    and spreads, visualized with real-time payoff graphs for
                    better strategy management.
                  </p>
                </div>
                <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                    <span className="text-white text-base font-semibold leading-tight">
                      Live Position Simulation:
                    </span>
                  </div>
                  <p className="text-[#b5b3b3] text-sm leading-relaxed">
                    Monitor live simulations of your open options and futures
                    positions, with real-time profit/loss and payoff graphs to
                    dynamically adjust your strategies.
                  </p>
                </div>
              </div>

              {/* Central Dashboard */}
              <div className="flex justify-center items-center flex-grow">
                <Image
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  src="/images/traders/dashboard.webp"
                  alt="Greeks dashboard interface showing trading analytics"
                  width={1000}
                  height={700}
                />
              </div>

              {/* Right Feature Cards */}
              <div className="flex flex-col gap-6 max-w-[280px] flex-shrink-0">
                <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                    <span className="text-white text-base font-semibold leading-tight">
                      Real-Time Greeks Calculation:
                    </span>
                  </div>
                  <p className="text-[#b5b3b3] text-sm leading-relaxed">
                    Get instant insights into key Greeks (Delta, Gamma, Theta,
                    Vega, Rho) to understand how your positions react to market
                    changes, volatility, and time decay.
                  </p>
                </div>
                <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Image src="/icons/cube.svg" className="w-5 h-5 mt-1 flex-shrink-0" alt="Cube icon" width={20} height={20} />
                    <span className="text-white text-base font-semibold leading-tight">
                      Live PnL Tracking:
                    </span>
                  </div>
                  <p className="text-[#b5b3b3] text-sm leading-relaxed">
                    Track real-time profit and loss across individual options or
                    entire strategies, refining your hedging approaches to
                    maximize profitability.
                  </p>
                </div>
              </div>
            </div>

            {/* Central Dashboard - Mobile/Tablet */}
            <div className="xl:hidden w-full flex justify-center items-center">
              <Image
                className="w-full h-auto object-contain rounded-2xl shadow-2xl max-w-[800px]"
                src="/images/traders/dashboard.webp"
                alt="Greeks dashboard interface showing trading analytics"
                width={1000}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderSection;

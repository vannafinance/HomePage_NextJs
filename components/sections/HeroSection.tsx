"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Button from "../button";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 pt-16 md:pt-28">
      <div className="custom-container w-full flex flex-col justify-center items-center gap-8 text-center">
        <div className="max-w-[950px] flex-col justify-center items-center gap-6 flex">
          <h1 className="text-3xl md:text-5xl font-bold md:leading-[60px] lg:leading-[70px] transition-all">
            Unlock <span className="text-primary">Major Liquidity </span>
            with LSTs and LRTs,{" "}
            <span className="text-primary">Trade Across Markets</span>, and{" "}
            <span className="text-primary">Hedge Smart</span> with Advanced
            Strategies
          </h1>
          <p className="text-base lg:text-xl font-medium text-[#76737B] max-w-[800px] mx-auto">
            Vanna provides superior APYs for lenders and empowers traders with
            cross-market strategies using composable leverage and chain
            abstraction.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
            <Button
              className="rounded-[8px] flex gap-2.5 bg-[#F2ECFE] p-3 px-4"
              redirectTo="https://discord.gg/MmK9rsWdzS"
            >
              <Image src="/icons/discordLogo.svg" alt="Discord logo" width={20} height={20} />
              <p className="text-base font-[600] text-primary">Join Discord</p>
            </Button>
            <Button
              className="gradient-button text-base font-semibold"
              redirectTo="/join-waitlist"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image 
            src="/images/heroImage.webp" 
            className="block lg:hidden w-full h-auto rounded-xl max-w-[700px]" 
            alt="Vanna Finance hero illustration"
            width={900}
            height={600}
            priority
          />
          <div className="hidden lg:block w-full max-w-[900px] h-screen">
            <Suspense fallback={<div className="w-full h-screen bg-gray-100 rounded-xl animate-pulse flex items-center justify-center"><div className="text-gray-500">Loading 3D Scene...</div></div>}>
              <Spline
                scene="https://prod.spline.design/IBk2UFq-Ep8YlEIb/scene.splinecode"
                className="w-full h-full rounded-xl"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

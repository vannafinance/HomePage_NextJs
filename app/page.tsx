"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import RoleSelector from "../components/sections/RoleSelector";
import LenderSection from "../components/sections/LenderSection";
import TraderSection from "../components/sections/TraderSection";
import PartnersSection from "../components/sections/PartnersSection";

interface Partner {
  name: string;
  icon: string;
  link: string;
}

type UserRole = "lender" | "trader";

const Home = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("lender"); // Default to lender

  const partners: Partner[] = [
    {
      name: "The Graph",
      icon: "/images/partnerLogos/thegraph.svg",
      link: "https://www.thegraph.com/",
    },
    {
      name: "Derive",
      icon: "/images/partnerLogos/derive.svg",
      link: "https://www.derive.xyz/",
    },
    {
      name: "Pivot",
      icon: "/images/partnerLogos/pivot.svg",
      link: "https://www.0xpivot.com/",
    },
    {
      name: "1 Inch",
      icon: "/images/partnerLogos/1inch.svg",
      link: "https://www.1inch.io/",
    },
    {
      name: "Optimism",
      icon: "/images/partnerLogos/optimism.svg",
      link: "https://www.optimism.io/",
    },
    {
      name: "Base",
      icon: "/images/partnerLogos/base.svg",
      link: "https://www.base.org/",
    },
    {
      name: "MUX",
      icon: "/images/partnerLogos/mux.svg",
      link: "https://www.mux.network/",
    },
    {
      name: "GMX",
      icon: "/images/partnerLogos/gmx.svg",
      link: "https://www.gmx.io/",
    },
    {
      name: "Premia",
      icon: "/images/partnerLogos/premia.svg",
      link: "https://www.premia.blue/ ",
    },
    {
      name: "Arbitrum",
      icon: "/images/partnerLogos/arbitrum.svg",
      link: "https://www.arbitrum.io/",
    },
    {
      name: "Perp",
      icon: "/images/partnerLogos/perp.svg",
      link: "https://www.perp.com/",
    },
    {
      name: "Spectral Labs",
      icon: "/images/partnerLogos/spectrallabs.svg",
      link: "https://www.spectrallabs.xyz/",
    },
  ];

  // Function to scroll to the selected section
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to track the section in view
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const lenderSection = document.getElementById("lender");
      const traderSection = document.getElementById("trader");

      const lenderRect = lenderSection?.getBoundingClientRect();
      const traderRect = traderSection?.getBoundingClientRect();

      // Check if the lender section is in view
      if (
        lenderRect &&
        lenderRect.top <= window.innerHeight / 2 &&
        lenderRect.bottom >= window.innerHeight / 2
      ) {
        setSelectedRole("lender");
      }

      // Check if the trader section is in view
      if (
        traderRect &&
        traderRect.top <= window.innerHeight / 2 &&
        traderRect.bottom >= window.innerHeight / 2
      ) {
        setSelectedRole("trader");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <section className="relative h-fit w-full flex flex-col">
        <RoleSelector
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          scrollToElement={scrollToElement}
        />
        <LenderSection />
        <TraderSection />
      </section>
      <PartnersSection partners={partners} />
    </>
  );
};

export default Home;

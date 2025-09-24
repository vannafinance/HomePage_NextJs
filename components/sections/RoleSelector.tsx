"use client";

import React from "react";

interface RoleSelectorProps {
  selectedRole: "lender" | "trader";
  setSelectedRole: (role: "lender" | "trader") => void;
  scrollToElement: (id: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  setSelectedRole,
  scrollToElement,
}) => {
  return (
    <>
      {/* Section 3 - Choose your Role */}
      <section className=" custom-container pt-[60px] pb-[40px] flex flex-col gap-6 justify-center items-center">
        <h3 className="pt-20 text-[#181822] text-[36px] md:text-5xl md:font-bold md:leading-[60px] text-center">
          Choose your Role
        </h3>
      </section>
      <div className="w-fit sticky top-[60px] mx-auto z-[200] p-1 mb-8">
        <div className="bg-[#181822] p-2.5 flex gap-2 justify-center items-center rounded-[14px]">
          <div
            className={`w-[120px] md:w-[220px] py-3 flex justify-center items-center border ${
              selectedRole === "lender"
                ? "text-[#181822] border-white-style"
                : "text-white bg-transparent border-transparent"
            } font-semibold text-base rounded-[10px] transition-all cursor-pointer`}
            onClick={() => {
              scrollToElement("lender");
              setTimeout(() => {
                setSelectedRole("lender"); // Delay the role change
              }, 450);
            }}
          >
            Lender
          </div>
          <div
            className={`w-[120px] md:w-[220px] py-3 flex justify-center items-center border ${
              selectedRole === "trader"
                ? "text-[#181822] border-white-style"
                : "text-white bg-transparent border-transparent"
            } font-semibold text-base rounded-[10px] transition-all cursor-pointer`}
            onClick={() => {
              scrollToElement("trader");
              setTimeout(() => {
                setSelectedRole("trader"); // Delay the role change
              }, 500);
            }}
          >
            Trader
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelector;

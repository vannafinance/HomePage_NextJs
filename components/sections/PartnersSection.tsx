import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  icon: string;
  link: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="custom-container flex flex-col justify-center items-center gap-8">
        <div className="flex-col justify-center items-center flex text-center">
          <div>
            <span className="text-[#7b44e1] text-4xl font-semibold leading-10">
              Vanna
            </span>
            <span className="text-black text-4xl font-semibold leading-10">
              {" "}
              Ecosystem Partner
            </span>
          </div>
        </div>
        <div className="max-w-[680px] w-full flex justify-center items-center gap-10 flex-wrap">
          {partners.map((item, index) => (
            <div
              key={index}
              className="w-20 h-20 p-[12.50px] justify-center items-center flex"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.icon}
                  className="w-[55px] h-[55px] relative"
                  alt={item.name}
                  title={item.name}
                  width={55}
                  height={55}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PartnersSection;

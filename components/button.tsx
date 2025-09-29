"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  redirectTo?: string;
  containerClassName?: string;
  target?: LinkTarget;
}

type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

const Button = ({
  className = "",
  children,
  redirectTo = "/",
  containerClassName = "",
  target = "_blank",
}: ButtonProps) => {
  const isInternal = redirectTo.startsWith("/") && !redirectTo.startsWith("//");
  const computedTarget = isInternal ? "_self" : target;
  return (
    <Link
      href={redirectTo}
      className={`w-fit ${containerClassName}`}
      target={computedTarget}
    >
      <button className={className}>{children}</button>
    </Link>
  );
};

export default Button;

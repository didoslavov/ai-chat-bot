import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1440px] px-28 py-8 ${className}`}>
      {children}
    </div>
  );
}

export default Container;

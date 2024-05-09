import React from "react";

type Variant = "function" | "assistant" | "system" | "user" | "data" | "tool";

const variants = {
  user: { bg: "bg-secondary", align: "justify-end" },
  assistant: { bg: "bg-primary", align: "justify-start" },
};

function Message({
  variant,
  children,
  className,
  onClick,
}: {
  variant: Variant;
  children?: React.ReactNode;
  className?: string;
  onClick?: (s: string) => void;
}) {
  return (
    <div
      onClick={() => onClick && onClick(children as string)}
      className={`${variants[variant as keyof typeof variants].align} flex w-full ${onClick && "cursor-pointer"}`}
    >
      <p
        className={`${variants[variant as keyof typeof variants].bg} w-fit rounded-2xl p-3 text-[15px] ${className}`}
      >
        {children}
      </p>
    </div>
  );
}

export default Message;

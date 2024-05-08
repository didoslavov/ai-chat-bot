import React from "react";

const variants = {
  user: { bg: "bg-secondary", align: "justify-end" },
  bot: { bg: "bg-primary", align: "justify-start" },
};

function Message({
  variant,
  children,
  className,
}: {
  variant: "user" | "bot";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${variants[variant].align} flex w-full`}>
      <p
        className={`${variants[variant].bg} w-fit rounded-2xl p-3 text-[15px] ${className}`}
      >
        {children}
      </p>
    </div>
  );
}

export default Message;

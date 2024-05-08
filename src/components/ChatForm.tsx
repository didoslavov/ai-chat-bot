import React from "react";
import Icon from "./Icon";
import { IconType } from "@/types/IconType";

const icons = [
  { id: 3, type: "send" },
  { id: 2, type: "mic" },
  { id: 1, type: "img" },
];

function ChatForm({ className }: { className?: string }) {
  return (
    <form className={`${className}`}>
      <div className="flex items-center justify-between rounded-2xl bg-primary p-3">
        <input
          type="text"
          placeholder="Ask for opportunities"
          className="w-full bg-transparent"
        />
        <div className="flex w-fit items-center gap-1">
          {icons.map((icon) => (
            <Icon key={icon.id} type={icon.type as IconType} />
          ))}
        </div>
      </div>
    </form>
  );
}

export default ChatForm;

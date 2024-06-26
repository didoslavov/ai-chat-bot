import Image from "next/image";
import imgIcon from "/public/img-icon.png";
import micIcon from "/public/mic-icon.png";
import sendIcon from "/public/send-icon.png";
import { IconType } from "@/types/icon-type";

const icons = {
  img: imgIcon,
  mic: micIcon,
  send: sendIcon,
};

function Icon({ type, className }: { type: IconType; className?: string }) {
  return (
    <div className="mx-auto cursor-pointer">
      <Image
        className={`max-w-5 ${className}`}
        src={icons[type]}
        alt="Chat icon"
      />
    </div>
  );
}

export default Icon;

import { useEffect } from "react";

export const useScrollBlur = (
  scrollContainer: React.RefObject<HTMLDivElement>,
) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = scrollContainer.current;

      if (element) {
        if (element.scrollLeft > 0) {
          element.classList.remove("blur-right");
          element.classList.add("blur-left");
        } else {
          element.classList.remove("blur-left");
          element.classList.add("blur-right");
        }
      }
    };

    if (scrollContainer.current) {
      const currentScrollContainer = scrollContainer.current;
      currentScrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentScrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollContainer]);
};

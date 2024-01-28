import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<"up" | "down">();
  let prevScrollPosition = 0;
  let currScrollPosition = 0;

  const handleScroll = () => {
    currScrollPosition = document.documentElement.scrollTop;

    if (prevScrollPosition === currScrollPosition) return;
    if (prevScrollPosition < currScrollPosition) {
      setDirection("down");
    } else {
      setDirection("up");
    }

    prevScrollPosition = currScrollPosition;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    direction,
  };
};

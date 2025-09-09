import { useEffect, useState } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', onResize);
    onResize();

    return () => { window.removeEventListener('resize', onResize); };
  }, []);

  return [width, height];
}
import { useContext, useEffect, useState, createContext } from "react";

import { BREAKPOINTS } from "../../constants";

interface ScreenSize {
  width: number;
  height: number;
}

interface ScreenSizeContextProviderProp {
  children: JSX.Element;
}
const ScreenSizeContext = createContext<ScreenSize>({ width: 0, height: 0 });
function ScreenSizeContextProvider(prop: ScreenSizeContextProviderProp) {
  const { children } = prop;
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.document.body.clientWidth,
    height: window.document.body.clientHeight,
  });

  const handleScreenSizeEvent = () => {
    setScreenSize({
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeEvent, false);
    window.addEventListener("load", handleScreenSizeEvent, false);

    return function cleanup() {
      window.removeEventListener("resize", handleScreenSizeEvent);
      window.removeEventListener("load", handleScreenSizeEvent);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

type ScreenBreakpoint = { [key in keyof typeof BREAKPOINTS]: boolean } & {
  width: number;
  height: number;
  [key: string]: any;
};

const useScreenSize = () => {
  const dimension = useContext(ScreenSizeContext);

  return Object.entries(BREAKPOINTS).reduce((accumulator, [size, value]) => {
    accumulator[size] =
      size === "LG" ? dimension.width >= value : dimension.width < value;
    accumulator.width = dimension.width;
    accumulator.height = dimension.height;
    return accumulator;
  }, {} as ScreenBreakpoint);
};

export { ScreenSizeContext, useScreenSize, ScreenSizeContextProvider };

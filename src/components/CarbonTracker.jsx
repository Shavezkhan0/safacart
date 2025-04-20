// components/CarbonTracker.js
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { increaseCarbon } from "@/redux/features/carbonSlice";
import CarbonPopup from "./CarbonPopup";

const CarbonTracker = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const prevPath = useRef(null);

  useEffect(() => {
    if (prevPath.current !== pathname) {
        const randomCarbon = Math.random() * (0.5 - 0.2) + 0.2;
        dispatch(increaseCarbon(randomCarbon));
      prevPath.current = pathname;
    }
  }, [pathname, dispatch]);

  return <CarbonPopup />;
};

export default CarbonTracker;

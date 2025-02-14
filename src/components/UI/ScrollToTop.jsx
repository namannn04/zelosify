"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [router.pathname]);

  return null; // This component doesn't need to render anything
};

export default ScrollToTop;

"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GlobalToast = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme class on document element
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Observe documentElement class changes to automatically update ToastContainer theme
    const observer = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains("dark");
      setTheme(isNowDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      limit={3}
      toastClassName="rounded-xl shadow-lg border border-border text-xs font-medium"
    />
  );
};

export default GlobalToast;

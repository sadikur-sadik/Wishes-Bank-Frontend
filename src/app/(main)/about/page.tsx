import React from "react";
import { Metadata } from "next";
import { About } from "@/components/about/About";

export const metadata: Metadata = {
  title: "About Us | Wishes Bank LTD",
  description:
    "Learn about Wishes Bank LTD — our philosophy, mission, vision, and the core principles driving progressive, secure, and accessible digital banking.",
};

export default function AboutUsPage() {
  return <About />;
}

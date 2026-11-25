import React from "react";

export interface SectionContainerProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionContainerProps) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export default SectionContainer;

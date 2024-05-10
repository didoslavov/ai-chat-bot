import React from "react";

const Container = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`mx-auto max-w-[1440px] px-28 py-8 ${className}`}>
      {children}
    </div>
  );
});

//* Set the displayName for the Container component, for easier debugging
Container.displayName = "Container";

export default Container;

import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="container mx-auto max-w-[1440px] px-4 md:px-3 lg:px-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Container;

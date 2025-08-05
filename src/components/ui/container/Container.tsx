import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="container mx-auto md:max-w-[768px] lg:max-w-[1440px] xl:max-w-[1600px] px-4 md:px-3 lg:px-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Container;

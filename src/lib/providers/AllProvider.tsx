// src/providers/AllProvider.tsx
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { HeroUIProvider } from "@heroui/react";
import { store } from "@/store/store";

type AllProviderProps = {
  children: ReactNode;
};

const AllProvider = ({ children }: AllProviderProps) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </Provider>
  );
};

export default AllProvider;

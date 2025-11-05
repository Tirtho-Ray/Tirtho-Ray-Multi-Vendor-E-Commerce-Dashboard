// src/providers/AllProvider.tsx
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { Toaster } from "sonner";

type AllProviderProps = {
  children: ReactNode;
};

const AllProvider = ({ children }: AllProviderProps) => {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
};

export default AllProvider;

"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const NextUiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  );
};

export default NextUiProvider;

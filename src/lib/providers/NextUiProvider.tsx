"use client"

import { ReactNode } from "react";

const NextUiProvider = ({children}:{children:ReactNode}) => {
    return (
        <div>
            {children}   
        </div>
    );
};

export default NextUiProvider;
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { StateProvider } from "@/context/StateProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <StateProvider>{children}</StateProvider>
    </SessionProvider>
  );
};

export default Providers;

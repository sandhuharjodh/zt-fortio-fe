"use client"; // Mark this component as a client component

import React from "react";
import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  // Exclude layout for the root page
  const noLayout = pathname === "/";

  return <MainLayout noLayout={noLayout}>{children}</MainLayout>;
};

export default ClientWrapper;

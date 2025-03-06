import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  noLayout?: boolean; // Determines if the layout should be excluded
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, noLayout = false }) => {
  if (noLayout) {
    // Render only the children when noLayout is true
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className=" p-6 w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

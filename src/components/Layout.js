import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mt-4">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 GovernanceApp - All Rights Reserved
      </footer>
    </div>
  );
};

export default Layout;

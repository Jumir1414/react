import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <main style={{ height: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

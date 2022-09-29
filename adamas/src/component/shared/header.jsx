import React from "react";
import Info from "./info";
import Navbar from "./nav";

function Header() {
  return (
    <header className="header">
      <Info />
      <Navbar />
    </header>
  );
}

export default Header;

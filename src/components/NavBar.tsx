import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/discover">Discover movies</NavLink>
    </div>
  );
}

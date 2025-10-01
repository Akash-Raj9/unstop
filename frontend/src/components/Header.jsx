import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <h2>SynapHack</h2>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

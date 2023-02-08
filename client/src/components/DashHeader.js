import React from "react";
import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 className="dash-header__title">TeachNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* <Link to="/dash/notes">Notes</Link>
          <Link to="/dash/notes/new">New Note</Link>
          <Link to="/dash/notes/archive">Archive</Link>
          <Link to="/dash/notes/trash">Trash</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;

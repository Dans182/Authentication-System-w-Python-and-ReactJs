import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        {store.user == null ? (
          <div className="ml-auto">
            <Link to="/signup">
              <button className="btn btn-primary me-3">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-secondary">Login</button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to="/">
              <button
                className="btn btn-primary me-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  actions.setStoreUser(null);
                }}
              >
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

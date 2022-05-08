import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="" style={{ color: "black" }}>
          <span className="navbar-brand mb-0 h1 text-sucess">HOME</span>
        </Link>
        {store.user == null ? (
          <div className="ml-auto">
            <Link to="/login" className="me-3">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-success">Sign up</button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to="/protected">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  localStorage.clear();
                  actions.setStoreUser(null);
                }}
              >
                Log out
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

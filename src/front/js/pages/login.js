import React from "react";

export const Login = () => {
  return (
    <div className="text-center mt-5">
      <div className="row">
        <label htmlFor="email" className="col-1">
          Email
        </label>
        <input id="email" className="col-3"></input>
        <label htmlFor="password" className="col-1">
          Password
        </label>
        <input id="password" className="col-3"></input>

        <button className="col-2 offset-1">Log in</button>
      </div>
    </div>
  );
};

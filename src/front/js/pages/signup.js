import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  const sendUserInfo = async () => {
    if (
      user.email != null &&
      user.email.trim() != "" &&
      user.password != null &&
      user.password.trim() != ""
    ) {
      const response = await fetch(
        "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/signup",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // A través del JSON get de routes, estamos recogiendo una informacion (request.json.get)(body_email y body_password), entonces necesitamos pasarles el body tambien y al estarlo enviando desde el frontend debemos parsearlo a JSON
          body: JSON.stringify(user), //aca pasamos el user (useState User) que seria el objeto donde se guarda el email y el password
        }
      );
      const data = await response.json();
      if (data.created) {
        history.push("/login");
      } else {
        alert("ERROR");
      }
    } else {
      setError("Bad info");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1 className="mb-5">SIGN UP</h1>
      <div className="row">
        <label htmlFor="email" className="col-1">
          Email
        </label>
        <input
          id="email"
          className="col-3"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        ></input>
        <label htmlFor="password" className="col-1">
          Password
        </label>
        <input
          id="password"
          className="col-3"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        ></input>

        <button className="col-2 offset-1" onClick={() => sendUserInfo()}>
          Register new user
        </button>
      </div>
      {error != null ? <h3 className="text-danger">{error}</h3> : null}
    </div>
  );
};

// para crear el usuario, necesito enviar los datos que se ingresan en el input a nuestro API. Esto usando un fetch. Esto lo logramos con el onclick y el onchange.
// El useState para guardar nuestras informaciones

import React, { useState } from "react";

export const Signup = () => {
  const [user, setUser] = useState({});
  const sendUserInfo = async () => {
    const response = await fetch(
      "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu43.gitpod.io/api/signup",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        // A través del JSON get de routes, estamos recogiendo una informacion (request.json.get)(body_email y body_password), entonces necesitamos pasarles el body tambien y al estarlo enviando desde el frontend debemos parsearlo a JSON
        body: JSON.stringify(user), //aca pasamos el user (useState User) que seria el objeto donde se guarda el email y el password
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="text-center mt-5">
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
    </div>
  );
};

// para crear el usuario, necesito enviar los datos que se ingresan en el input a nuestro API. Esto usando un fetch. Esto lo logramos con el onclick y el onchange.
// El useState para guardar nuestras informaciones
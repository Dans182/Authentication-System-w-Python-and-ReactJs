import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
  let history = useHistory();
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    get_protected_info();
  }, []);

  const get_protected_info = async () => {
    const response = await fetch(
      "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/protected",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if (data.planets) {
      setPlanets(data.planets);
      setError(null);
    } else if (data.msg) {
      setError(data.msg);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Protected view</h1>
      {planets.map((planet, i) => {
        return <h1 key={i}>{planet}</h1>;
      })}
      <h1>{error}</h1>
    </div>
  );
};

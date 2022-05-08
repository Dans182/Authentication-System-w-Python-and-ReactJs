import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.production.min";
import "../../styles/home.css";

export const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {}, []);

  const getPlanets = async () => {
    const response = await fetch(
      "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/planet"
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
      <h1>Private view</h1>
      {planets.map((planet, i) => {
        return <h1 hey={i}>planet</h1>;
      })}
    </div>
  );
};

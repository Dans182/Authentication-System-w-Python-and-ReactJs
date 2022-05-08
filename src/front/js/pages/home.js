import React, { useEffect, useState } from "react";
import "../../styles/home.css";

export const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlanets();
  }, []);

  const getPlanets = async () => {
    const response = await fetch(
      "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/planet",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer KASLÑDKASLÑDKASLÑDKLASÑDKLÑASFSADLFÑKSDLFKSLÑDKFLÑSDKFKSLÑDFKÑSLDFKLÑSDMFASDMF.ASDLAFÑKLSDKFLASKDFLAÑAAKSDLFÑAKSDFÑLSDLKLFÑ",
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
      <h1>Private view</h1>
      {planets.map((planet, i) => {
        return <h1 hey={i}>{planet}</h1>;
      })}
      <h1>{error}</h1>
    </div>
  );
};

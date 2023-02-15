import React from "react";
import { useState, useEffect, useRef } from "react";
import Content from "./Content";
import vehicleInfo from "./vehicleInfo";
import HistoryInfo from "./HistoryInfo";
import "./index.css";
import { BsXOctagonFill } from "react-icons/bs";
import logo from "./assets/ninja-svgrepo-com (1).svg";
import Saves from "./Saved";

export default function App() {
  let vehicleType = "cars";
  let inputRef = useRef();

  const [link, setNewLink] = useState(
    `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands`
  );
  const [data, setData] = useState();
  const [vehicleData, setVehicleData] = useState();
  const [brandID, setBrandID] = useState(null);
  const [modelID, setModelID] = useState(null);
  const [vehicleYear, setVehicleYear] = useState(null);
  const [query, setQuery] = useState("");
  const [lastSearchs, setLastSearchs] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });
  const [saved, setSaved] = useState(() => {
    return JSON.parse(localStorage.getItem("saved")) || [];
  });

  function getVehicleId(item) {
    setBrandID(item.code);
  }
  function getModelID(item) {
    setModelID(item.code);
  }
  function getYear(item) {
    setVehicleYear(item.code);
  }

  function queryVehicle(e) {
    setQuery(e.target.value);
  }
  function getCarDataToStore(info, car) {
    if (car) {
      return;
    } else {
      setLastSearchs((oldValue) => [...oldValue, info]);
    }
  }

  function getInfoFromStorage(storeInfo) {
    const vehicleInfoJSON = lastSearchs.find((item) => {
      return item.codeFipe === storeInfo;
    });
    const carFromSearch = true;
    setVehicleData(
      vehicleInfo({
        carFromSearch,
        vehicleInfoJSON,
        handleCarInfo: getCarDataToStore,
        handleFav: getFavorites,
      })
    );
  }

  function getFavorites(fav) {
    const findDuplicates = saved.find((item) => {
      return item.codeFipe === fav.codeFipe;
    });
    if (findDuplicates === undefined) {
      setSaved([...saved, fav]);
    } else {
      return;
    }
  }
  function getFavData(fav) {
    const find = saved.filter((item) => {
      return item.codeFipe != fav.codeFipe;
    });
    setSaved(find);
  }

  function goToSelectedItem(data) {
    console.log(data);
    const vehicleInfoJSON = saved.find((item) => {
      return item.codeFipe === data.codeFipe;
    });
    const carFromSearch = true;
    setVehicleData(
      vehicleInfo({
        carFromSearch,
        vehicleInfoJSON,
        handleCarInfo: getCarDataToStore,
        handleFav: getFavorites,
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(lastSearchs));
  }, [lastSearchs]);

  useEffect(() => {
    const itmes = localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    let myArr = JSON.parse(localStorage.getItem("items"));

    if (myArr.length > 5) {
      myArr.shift();
      setLastSearchs(myArr);
    }
  }, [lastSearchs]);

  useEffect(() => {
    fetch(link)
      .then((data) => data.json())
      .then((resp) =>
        setData(
          Content({
            resp,
            handleClick: getVehicleId,
            handleQuery: queryVehicle,
          })
        )
      );
  }, [link, vehicleYear]);

  useEffect(() => {
    if (brandID === null) {
      return;
    } else {
      fetch(
        `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandID}/models`
      )
        .then((data) => data.json())
        .then((resp) => setData(Content({ resp, handleClick: getModelID })));
    }
  }, [brandID]);
  useEffect(() => {
    if (modelID === null) {
      return;
    } else {
      fetch(
        `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandID}/models/${modelID}/years`
      )
        .then((data) => data.json())
        .then((resp) =>
          setData(Content({ resp, handleClick: getYear, query }))
        );
    }
  }, [modelID]);

  useEffect(() => {
    const carFromSearch = false;

    if (vehicleYear === null) {
      return;
    } else {
      fetch(
        `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandID}/models/${modelID}/years/${vehicleYear}`
      )
        .then((data) => data.json())
        .then((vehicleInfoJSON) =>
          setVehicleData(
            vehicleInfo({
              carFromSearch,
              vehicleInfoJSON,
              handleCarInfo: getCarDataToStore,
              handleFav: getFavorites,
            })
          )
        );
    }
    setBrandID(null);
    setModelID(null);
    setVehicleYear(null);
  }, [vehicleYear]);

  return (
    <>
      <div className="navBar">
        <div className="logo">
          <h1>Ninjas inc.</h1>
          <img src={logo} width={"50px"} />
        </div>
      </div>
      <div className="main-container">
        {" "}
        <div className="left-div">
          {vehicleData}
          <div className="pesquisa">
            <div className="header-pesquisas">
              <h2>Últimas pesquisas</h2>{" "}
              <BsXOctagonFill
                style={{ fontSize: "30px", cursor: "pointer" }}
                className="clean-story"
                onClick={() => {
                  setLastSearchs([]);
                }}
              />
            </div>

            {lastSearchs.length > 0 ? "" : "Nenhum item na pesquisa"}
            <HistoryInfo
              data={lastSearchs}
              hadleStoreQuickInfo={getInfoFromStorage}
            />
          </div>
          <div className="salvos">
            <h2 style={{ fontSize: "1em", cursor: "pointer" }}>Salvos</h2>
            <Saves
              data={saved}
              handleSave={getFavData}
              hadleStoreQuickInfo={getInfoFromStorage}
              handleGetItem={goToSelectedItem}
            />
          </div>
        </div>
        <div className="right-div">{data}</div>
      </div>
    </>
  );
}

import React from "react";
import "./index.css";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

export default function vehicleInfo({
  vehicleInfoJSON,
  handleCarInfo,
  carFromSearch,
  handleFav,
}) {
  handleCarInfo(vehicleInfoJSON, carFromSearch);

  const teste = false;

  const check = teste ? (
    <HiHeart
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={() => {
        handleFav(vehicleInfoJSON);
      }}
    />
  ) : (
    <HiOutlineHeart
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={() => {
        handleFav(vehicleInfoJSON);
      }}
    />
  );

  return (
    <div className="carInfo">
      {check}
      <h2>{vehicleInfoJSON.price}</h2>
      <h3>Modelo : {vehicleInfoJSON.model}</h3>
      <p> Marca : {vehicleInfoJSON.brand}</p>
      <p> Ano : {vehicleInfoJSON.modelYear}</p>
      <p>Última atualização : {vehicleInfoJSON.referenceMonth}</p>
    </div>
  );
}

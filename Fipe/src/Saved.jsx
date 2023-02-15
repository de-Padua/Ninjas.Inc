import React from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

export default function Saved(props) {
  console.log(props);
  console.log(props.data.length);

  const items = props.data.map((item) => {
    return (
      <div className="item-save">
        <p
          key={item.model}
          onClick={() => {
            props.handleGetItem(item);
          }}
        >
          {item.model}{" "}
        </p>
        <span>
          <HiHeart
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => {
              props.handleSave(item);
            }}
          />
        </span>
      </div>
    );
  });

  return (
    <div className="div-saves">
      {props.data.length === 0 ? "Nenhum item salvo" : items}
    </div>
  );
}

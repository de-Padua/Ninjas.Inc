import React from "react";
import "./index.css";
import { useState } from "react";

export default function Content({ resp, handleClick, handleQuery, query }) {
  const itemsInfo = resp.map((items) => {
    return (
      <p
        className="item"
        key={items.code}
        onClick={() => {
          handleClick(items);
        }}
      >
        {items.name}
      </p>
    );
  });
  return <div className="itemsinfo">{itemsInfo}</div>;
}

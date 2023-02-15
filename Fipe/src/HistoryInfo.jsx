import React from "react";

export default function HistoryInfo(props) {
  const items = props.data.map((item) => {
    return (
      <div
        className="itemsH"
        style={{ cursor: "pointer" }}
        key={item.codeFipe}
        onClick={() => {
          props.hadleStoreQuickInfo(item.codeFipe);
        }}
      >
        <p> {item.model + " " + item.modelYear}</p>
      </div>
    );
  });
  return <div className="container">{items}</div>;
}

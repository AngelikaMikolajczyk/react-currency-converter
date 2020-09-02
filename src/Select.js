import React from "react";
import { Option } from "./Option";

export function Select(props) {
  return (
    <select
      className="Select"
      onChange={props.onChangeHandler}
      name={props.name}
    >
      {Object.entries(props.items).map(([currencyCode, currencyName]) => (
        <Option
          key={currencyCode}
          currencyCode={currencyCode}
          currencyName={currencyName}
        />
      ))}
    </select>
  );
}

import React from "react";

export function Option(props) {
  return (
    <option value={props.currencyCode}>
      {props.currencyCode} - {props.currencyName}
    </option>
  );
}

import React from "react";

import { BoardOptionsItems } from "../index";

import "./BoardOptions.css";

export default function BoardOptions(props) {
  return (
    <div className="BoardOptions">
      <BoardOptionsItems boardTitle={props.boardTitle} />
    </div>
  );
}

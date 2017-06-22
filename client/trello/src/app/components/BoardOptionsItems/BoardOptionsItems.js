import React from "react";

import PropTypes from "prop-types";
import { Link } from 'react-router';

import { BoardOptionsItem } from "../index";

import "./BoardOptionsItems.css";

const propTypes = {
  boardTitle: PropTypes.string.isRequired
};

export default function BoardOptionsItems(props) {
  const renderBoardOptionsItemList = () => {
    return (
      <ul className="BoardOptions-List">
        <Link to={`/${props.boardTitle.toLowerCase()}`}>
          <BoardOptionsItem
            boardName="Boards"
            iconName="columns"
          />
        </Link>
        <BoardOptionsItem boardName="Members" iconName="user" />
        <BoardOptionsItem boardName="Settings" iconName="sun-o" />
      </ul>
    );
  };

  return (
    <div className="BoardOptionsItems">
      {renderBoardOptionsItemList()}
    </div>
  );
}

BoardOptionsItems.propTypes = propTypes;

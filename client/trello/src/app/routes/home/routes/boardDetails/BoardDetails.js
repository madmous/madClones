import React, { Component } from "react";

import PropTypes from "prop-types";

import { BoardDetailsHeader, BoardDetailsMain } from "./components/index";

import "./BoardDetails.css";

export default class BoardDetails extends Component {
  componentDidMount() {
    //document.title = 'BoardView | Trello';
    //this.props.cardActions.getCards(this.props.location.pathname);
  }

  render() {
    return (
      <div className="Board-Details">
        <BoardDetailsHeader />
        <BoardDetailsMain />
      </div>
    );
  }
}

//BoardDetails.propTypes = propTypes;

import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

import { CARD_HEIGHT, CARD_MARGIN, OFFSET_HEIGHT } from './constants.js';

import CardItems from './CardItems';

import './CardItems.css';

function getPlaceholderIndex(y, scrollY) {
  const yPos = y - OFFSET_HEIGHT + scrollY;
  let placeholderIndex;
  
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = -1;
  } else {
    placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
  }
  return placeholderIndex;
}

const specs = {
  drop(props, monitor, component) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) {
      nextY += 1;
    } else if (lastX !== nextX) {
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) {
      return;
    }

    const previousAndNextPositions = {
      lastX, 
      lastY, 
      nextX, 
      nextY
    };

    props.moveCard(previousAndNextPositions);
  },
  hover(props, monitor, component) {
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );

    component.setState({ placeholderIndex });

    const item = monitor.getItem();
    document.getElementById(item.id).style.display = 'none';
  }
};

const collectDragTarget = (connectDragSource, monitor) => {
  return {
    connectDropTarget: connectDragSource.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  };
}

export default DropTarget('card', specs, collectDragTarget)(CardItems)
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

import CardItem from './CardItem';

import './CardItem.css';

const cardSource = {
  beginDrag(props, monitor, component) {
    const { x, y, id } = props;
    const { clientWidth, clientHeight } = findDOMNode(component);

    return { id, x, y, clientWidth, clientHeight };
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
  }
};

const OPTIONS = {
  arePropsEqual: function arePropsEqual(props, otherProps) {
    let isEqual = true;
    if (props.id === otherProps.id &&
        props.x === otherProps.x &&
        props.y === otherProps.y) {

      isEqual = true;
    } else {
      isEqual = false;
    }
    return isEqual;
  }
};

const collectDragSource = (connectDragSource, monitor) => {
  return {
    connectDragSource: connectDragSource.dragSource(),
    connectDragPreview: connectDragSource.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource('card', cardSource, collectDragSource, OPTIONS)(CardItem);
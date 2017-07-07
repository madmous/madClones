import { shallow, mount } from "enzyme";
import { expect, assert } from "chai";
import { Provider } from "react-redux";
import sinon from "sinon";
import React from "react";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

import BoardItemContainer from "./BoardItemContainer";
import BoardItem from "./BoardItem";

const setupShallow = () => {
  let removeBoardStar = sinon.spy();
  let addBoardStar = sinon.spy();
  let addBoard = sinon.spy();

  const props = {
    boardItemClassName: "Boards-Board",
    organizationId: "o1",
    isActiveBoard: true,
    boardItemId: "bi1",
    boardName: "boardName",
    userId: "u1",

    boardActions: {
      addBoard
    },

    starredBoardActions: {
      removeBoardStar,
      addBoardStar
    }
  };

  const wrapper = shallow(<BoardItem {...props} />);

  return {
    removeBoardStar,
    addBoardStar,
    addBoard,

    wrapper
  };
};

describe("<BoardItem />", () => {
  it("should render fontawesome component", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find("FontAwesome")).to.have.length(1);
    expect(wrapper.find("FontAwesome").props().className).to.equal(
      "Boards-Board-Item-Tile-Option"
    );
  });

  it("should render fontawesome component with starred class name", () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ isStarredBoardItem: true });
    expect(wrapper.find("FontAwesome")).to.have.length(1);
    expect(wrapper.find("FontAwesome").props().className).to.equal(
      "Boards-Board-Item-Tile-Option Boards-Board-Item-Tile-Starred"
    );
  });
});

describe("<CreateBoard />", () => {
  it("should render CreateBoard", () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({
      isActiveBoard: false
    });

    expect(wrapper.find("Connect(ReduxForm)")).to.have.length(1);
  });

  describe("onClick event", () => {
    it("should have an onClick defined", () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isActiveBoard: false
      });

      assert.isDefined(wrapper.find("Connect(ReduxForm)").props().onSubmit);
    });

    xit("should call", () => {
      const { addBoard, wrapper } = setupShallow();

      wrapper.find("Connect(ReduxForm)").simulate("submit");

      expect(addBoard.calledOnce).to.be.true;
    });
  });
});

describe(".Boards-Board-Tile", () => {
  describe("onClick event", () => {
    it("should have an onClick defined", () => {
      const { wrapper } = setupShallow();

      assert.isDefined(wrapper.find(".Boards-Board-Item-Tile").props().onClick);
    });
  });

  describe("Boards-Board-Tile-Title-Name", () => {
    xit("should render the boardName", () => {
      const { wrapper } = setupShallow();

      expect(
        wrapper.find(".Boards-Board-Tile-Title-Name").props().boardName
      ).to.equal("boardName");
    });

    xit("should render the boardItemSubName", () => {
      const { wrapper } = setupShallow();

      expect(
        wrapper.find(".Boards-Board-Tile-Title-Name").props().boardName
      ).to.equal("boardName");
    });
  });
});

describe("FontAwesome (regular star)", () => {
  describe("onClick event", () => {
    it("should have an onClick defined", () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: false
      });

      assert.isDefined(wrapper.find(".Boards-Board-Item-Tile-Option").props().onClick);
    });

    it("should call removeBoardStar action", () => {
      const { addBoardStar, wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: false
      });

      wrapper
        .find(".Boards-Board-Item-Tile-Option")
        .simulate("click", { stopPropagation() {} });

      expect(addBoardStar.calledOnce).to.be.true;
    });
  });
});

describe("FontAwesome (yellow star)", () => {
  describe("onClick event", () => {
    it("should have an onClick defined", () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: true
      });

      assert.isDefined(
        wrapper.find(".Boards-Board-Item-Tile-Starred").props().onClick
      );
    });

    it("should call removeBoardStar action", () => {
      const { removeBoardStar, wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: true
      });

      wrapper
        .find(".Boards-Board-Item-Tile-Starred")
        .simulate("click", { stopPropagation() {} });

      expect(removeBoardStar.calledOnce).to.be.true;
    });
  });
});

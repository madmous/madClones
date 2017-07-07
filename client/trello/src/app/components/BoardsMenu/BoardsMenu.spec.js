import { shallow, mount } from "enzyme";
import { expect, assert } from "chai";
import React from "react";
import sinon from "sinon";

import BoardsMenu from "./BoardsMenu";

const setupShallow = () => {
  let focusOnBoardsMenu = sinon.spy();
  let blurOnBoardsMenu = sinon.spy();
  let saveUserInput = sinon.spy();

  const props = {
    boardsMenuActions: {
      focusOnBoardsMenu,
      blurOnBoardsMenu,
      saveUserInput
    }
  };

  const wrapper = shallow(<BoardsMenu {...props} />);

  return {
    focusOnBoardsMenu,
    blurOnBoardsMenu,
    saveUserInput,

    wrapper
  };
};

describe(".BoardsMenu", () => {
  it("should have onBlur defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find(".BoardsMenu").first().props().onFocus);
  });

  it("should call focusOnBoardsMenu", () => {
    const { focusOnBoardsMenu, blurOnBoardsMenu, wrapper } = setupShallow();

    wrapper.find(".BoardsMenu").simulate("focus");

    expect(blurOnBoardsMenu.calledOnce).to.equal(false);
    expect(focusOnBoardsMenu.calledOnce).to.equal(true);
  });

  it("should have onFocus defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find(".BoardsMenu").first().props().onBlur);
  });

  it("should call blurOnBoardsMenu", () => {
    const { focusOnBoardsMenu, blurOnBoardsMenu, wrapper } = setupShallow();

    wrapper.find(".BoardsMenu").simulate("blur");

    expect(blurOnBoardsMenu.calledOnce).to.be.true;
    expect(focusOnBoardsMenu.calledOnce).to.be.false;
  });
});

describe("input", () => {
  it("should have onChange defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find("input").first().props().onChange);
  });

  it("should call saveUserInput", () => {
    const { saveUserInput, wrapper } = setupShallow();

    wrapper.find("input").simulate("change", { target: { value: "T" } });

    expect(saveUserInput.calledOnce).to.be.true;
  });
});

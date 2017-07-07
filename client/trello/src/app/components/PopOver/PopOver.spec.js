import { shallow, mount } from "enzyme";
import { expect, assert } from "chai";
import { Provider } from "react-redux";
import sinon from "sinon";
import React from "react";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

import PopOver from "./PopOver";

const setupShallow = () => {
  let focusOnPopHover = sinon.spy();
  let blurOnPopHover = sinon.spy();
  let hidePopOver = sinon.spy();

  let logoutUser = sinon.spy();

  const props = {
    fullName: "fullName",
    popOverActions: {
      focusOnPopHover,
      blurOnPopHover,
      hidePopOver
    },
    loginActions: { logoutUser }
  };

  const wrapper = shallow(<PopOver {...props} />);

  return {
    focusOnPopHover,
    blurOnPopHover,
    hidePopOver,
    logoutUser,

    wrapper
  };
};

describe("<div />", () => {
  it("should have an onFocus and onBlur defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find(".PopOver").props().onFocus);
    assert.isDefined(wrapper.find(".PopOver").props().onBlur);
  });

  it("should call focusOnPopHover and blurOnPopHover", () => {
    const { focusOnPopHover, blurOnPopHover, wrapper } = setupShallow();

    wrapper.find(".PopOver").simulate("focus");
    expect(focusOnPopHover.calledOnce).to.be.true;

    wrapper.find(".PopOver").simulate("blur");
    expect(blurOnPopHover.calledOnce).to.be.true;
  });
});

describe("<FontAwesome />", () => {
  it(" should have an onClick defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find("FontAwesome").props().onClick);
  });

  it("should call hidePopOver", () => {
    const { hidePopOver, wrapper } = setupShallow();

    wrapper.find("FontAwesome").simulate("click");

    expect(hidePopOver.calledOnce).to.be.true;
  });
});

describe("<p />", () => {
  it(" should have an onClick defined", () => {
    const { wrapper } = setupShallow();

    assert.isDefined(wrapper.find("p").props().onClick);
  });

  it("should call hidePopOver", () => {
    const { logoutUser, wrapper } = setupShallow();

    wrapper.find("p").simulate("click");
    expect(logoutUser.calledOnce).to.be.true;
  });
});

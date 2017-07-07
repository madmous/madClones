import { shallow } from "enzyme";
import { expect } from "chai";
import React from "react";

import BoardDetails from "./BoardDetails";

function setup() {
  return shallow(<BoardDetails />);
}

describe("BoardDetails", () => {
  it("should render BoardDetailsHeader component", () => {
    const wrapper = setup();

    expect(wrapper.find("BoardDetailsHeader")).to.have.length(1);
  });

  it("should render BoardDetailsMain component", () => {
    const wrapper = setup();

    expect(wrapper.find("BoardDetailsMain")).to.have.length(1);
  });
});

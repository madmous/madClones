import { shallow } from "enzyme";
import { expect } from "chai";
import React from "react";

import BoardOptionsItems from "./BoardOptionsItems";

function setupShallow() {
  const props = {
    boardTitle: "boardTitle"
  };

  const wrapper = shallow(<BoardOptionsItems {...props} />);

  return {
    wrapper
  };
}

describe("BoardOptionsItems", () => {
  it("should render BoardOptionsItems component", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find("BoardOptionsItem")).to.have.length(3);
  });
});
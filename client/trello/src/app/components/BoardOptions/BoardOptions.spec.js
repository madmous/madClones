import { shallow } from "enzyme";
import { assert } from "chai";
import React from "react";

import BoardOptions from "./BoardOptions";

function setup() {
  const props = {
    boardTitle: "boardTitle"
  };

  return shallow(<BoardOptions {...props} />);
}

describe("BoardOptions", () => {
  it("should render BoardOptionsItems component", () => {
    const wrapper = setup();

    assert.isDefined(wrapper.find("BoardOptionsItems"));
  });
});

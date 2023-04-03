import { assert } from "chai";
import { assert as sassert, spy, stub } from "sinon";
import { Timeline } from "../src";

describe("Tooltip", () => {

    it("Should create an instance of Timeline using tag name", async () => {
        const instance = document.createElement("aster-timeline");

        assert.instanceOf(instance, Timeline);
    });

});

"use strict";
const cryo_1 = require("../../src/cryo");
describe("Cryo sync", function () {
    let testCryo = new cryo_1.Cryo();
    testCryo.freezeSync({ "id": 0, "name": "joel" }, "test");
    console.log(testCryo);
    describe("state does not exist", () => {
        it("should return false when it does not exist", () => {
            expect(testCryo.existsSync("test2")).toBeFalsy();
        });
    });
    describe("state exist", () => {
        it("should return true when it does exist", () => {
            expect(testCryo.existsSync("test")).toBeTruthy();
        });
    });
});
//# sourceMappingURL=CryoSpec.js.map
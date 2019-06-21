import { BaseRTCStatsReport } from "../../src/standardizers/base.js";

describe("The behaviors of BaseRTCStatsReport", () => {
  const statsDouble = new Map([
    ["DummyStats_1", { id: "DummyStats_1", type: "sender", kind: "video" }],
    ["DummyStats_2", { id: "DummyStats_2", type: "sender", kind: "video" }],
    ["DummyStats_3", { id: "DummyStats_3", type: "sender", kind: "audio" }]
  ]);

  test("It returns an array of stats objects when you access the stats with wrapped stats object reference.", () => {
    // setup
    const report = new BaseRTCStatsReport(statsDouble);

    // excute
    const stats = report.get("RTCAudioSenders");
    const statsArray = [{ id: "DummyStats_3", type: "sender", kind: "audio" }];

    // assert
    expect(stats).toMatchObject(statsArray);
  });

  test("It returns undefined when you access the stats with a reference that not appeared in wrapped ones.", () => {
    // setup
    const statsDouble = new Map();
    const report = new BaseRTCStatsReport(statsDouble);

    // excute
    const stats = report.get("StatsRefNotExists");

    // assert
    expect(stats).toBeUndefined();
  });

  test("A stats attribute that is not implemented should be undefined.", () => {
    // setup
    const report = new BaseRTCStatsReport(statsDouble);

    // excute
    const stats = report.get("RTCAudioSenders");

    // assert
    expect(stats[0].audioLevel).toBeUndefined();
  });

  test("Can check if it has the key.", () => {
    // setup
    const report = new BaseRTCStatsReport(statsDouble);

    // assert
    expect(report.has("RTCAudioSenders")).toBe(true);
  });
});

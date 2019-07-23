import { detect } from "detect-browser";
import { RTCStatsInsight } from "../src/rtcstats-insight";

jest.mock("detect-browser");
jest.useFakeTimers();

describe("RTCStatsInsight", () => {
  let pcMock;

  beforeEach(() => {
    pcMock = { getStats: jest.fn().mockResolvedValue(new Map()) };
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("Start polling with watch().", () => {
    const pollingInterval = 1000;
    const insight = new RTCStatsInsight(pcMock, { interval: pollingInterval });

    insight.watch();

    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      pollingInterval
    );
  });

  test("Stop polling with stop().", () => {
    const insight = new RTCStatsInsight(pcMock);

    insight.watch();
    insight.stop();

    expect(clearInterval).toHaveBeenCalled();
  });

  test("Collect getStats() according to the interval set in `polling-interval`.", () => {
    const insight = new RTCStatsInsight(pcMock);

    insight.watch();
    jest.runOnlyPendingTimers();

    expect(pcMock.getStats).toHaveBeenCalled();
  });
});

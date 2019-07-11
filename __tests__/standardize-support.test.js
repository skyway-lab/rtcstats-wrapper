import { detect } from "detect-browser";
import { getStandardizer } from "../src/standardize-support.js";
import { ChromeRTCStatsReport } from "../src/standardizers/chrome.js";
import { FirefoxRTCStatsReport } from "../src/standardizers/firefox.js";
import { SafariRTCStatsReport } from "../src/standardizers/safari.js";
import { BaseRTCStatsReport } from "../src/standardizers/base.js";

jest.mock("detect-browser");

describe("RTCStatsMoment", () => {
  test("It standardizes Google Chrome's RTCStatsReport", () => {
    // setup
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
    const standardizer = getStandardizer();

    // assert
    expect(standardizer).toBe(ChromeRTCStatsReport);
  });

  test("It standardizes Firefox's RTCStatsReport", () => {
    // setup
    detect.mockReturnValue({
      name: "firefox",
      version: "67.0.4"
    });
    const standardizer = getStandardizer();

    // assert
    expect(standardizer).toBe(FirefoxRTCStatsReport);
  });

  test("It standardizes Safari's RTCStatsReport", () => {
    // setup
    detect.mockReturnValue({
      name: "safari",
      version: "12.1.1"
    });
    const standardizer = getStandardizer();

    // assert
    expect(standardizer).toBe(SafariRTCStatsReport);
  });

  test("It standardizes unknown browser's RTCStatsReport as BaseRTCStatsReport", () => {
    // setup
    detect.mockReturnValue({
      name: "unknown-browser",
      version: "12.1.1"
    });
    const standardizer = getStandardizer();

    // assert
    expect(standardizer).toBe(BaseRTCStatsReport);
  });
});

import { detect } from "detect-browser";
import { ChromeRTCStatsReport } from "./standardizers/chrome.js";
import { FirefoxRTCStatsReport } from "./standardizers/firefox.js";
import { SafariRTCStatsReport } from "./standardizers/safari.js";
import { BaseRTCStatsReport } from "./standardizers/base.js";

export function getStandardizer() {
  const { name, version } = detect();
  const [major, minor, patch] = version.split(".").map(n => parseInt(n));
  const browser = { name, major, minor, patch };

  switch (browser.name) {
    case "chrome":
      return ChromeRTCStatsReport;
    case "firefox":
      return FirefoxRTCStatsReport;
    case "safari":
      return SafariRTCStatsReport;
    default:
      return BaseRTCStatsReport;
  }
}

export function standardizeReport(report) {
  const standardizer = getStandardizer();
  return standardizer(report);
}

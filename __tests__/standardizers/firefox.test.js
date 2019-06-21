import { FirefoxRTCStatsReport } from "../../src/standardizers/firefox.js";
import rawStats from "../_double/firefox-67.0.4.json";

describe("FirefoxRTCStatsReport standardized Firefox's RTCStatsReport", () => {
  let report;

  beforeEach(() => {
    const restoredReport = new Map(rawStats);
    report = new FirefoxRTCStatsReport(restoredReport);
  });

  test("RTCInboundRtpVideoStreams could be retrieved.", () => {
    const statsArray = report.get("RTCInboundRtpVideoStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCInboundRtpAudioStreams could be retrieved.", () => {
    const statsArray = report.get("RTCInboundRtpAudioStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCOutboundRtpVideoStreams could be retrieved.", () => {
    const statsArray = report.get("RTCOutboundRtpVideoStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCOutboundRtpAudioStreams could be retrieved.", () => {
    const statsArray = report.get("RTCOutboundRtpAudioStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCRemoteInboundRtpVideoStreams could be retrieved.", () => {
    const statsArray = report.get("RTCRemoteInboundRtpVideoStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCRemoteInboundRtpAudioStreams could be retrieved.", () => {
    const statsArray = report.get("RTCRemoteInboundRtpAudioStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCRemoteOutboundRtpVideoStreams could be retrieved.", () => {
    const statsArray = report.get("RTCRemoteOutboundRtpVideoStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCRemoteOutboundRtpAudioStreams could be retrieved.", () => {
    const statsArray = report.get("RTCRemoteOutboundRtpAudioStreams");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCVideoSenders could be retrieved.", () => {
    const statsArray = report.get("RTCVideoSenders");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCAudioSenders could be retrieved.", () => {
    const statsArray = report.get("RTCAudioSenders");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCVideoReceivers could be retrieved.", () => {
    const statsArray = report.get("RTCVideoReceivers");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCAudioReceivers could be retrieved.", () => {
    const statsArray = report.get("RTCAudioReceivers");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCIceCandidatePairs could be retrieved.", () => {
    const statsArray = report.get("RTCIceCandidatePairs");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCLocalIceCandidates could be retrieved.", () => {
    const statsArray = report.get("RTCLocalIceCandidates");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCRemoteIceCandidates could be retrieved.", () => {
    const statsArray = report.get("RTCRemoteIceCandidates");
    expect(statsArray).toBeInstanceOf(Array);
  });
});

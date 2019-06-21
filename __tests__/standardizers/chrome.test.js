import { ChromeRTCStatsReport } from "../../src/standardizers/chrome.js";
import rawStats from "../_double/chrome-77.0.3842.0.json";

describe("ChromeRTCStatsReport standardized Google Chrome's RTCStatsReport", () => {
  let report;

  beforeEach(() => {
    const restoredReport = new Map(rawStats);
    report = new ChromeRTCStatsReport(restoredReport);
  });

  test("RTCCodecs could be retrieved.", () => {
    const statsArray = report.get("RTCCodecs");
    expect(statsArray).toBeInstanceOf(Array);
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

  test("RTCVideoSources could be retrieved.", () => {
    const statsArray = report.get("RTCVideoSources");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCAudioSources could be retrieved.", () => {
    const statsArray = report.get("RTCAudioSources");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCPeerConnection could be retrieved.", () => {
    const statsArray = report.get("RTCPeerConnection");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCDataChannels could be retrieved.", () => {
    const statsArray = report.get("RTCDataChannels");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCMediaStreams could be retrieved.", () => {
    const statsArray = report.get("RTCMediaStreams");
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

  test("RTCTransports could be retrieved.", () => {
    const statsArray = report.get("RTCTransports");
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

  test("RTCCertificates could be retrieved.", () => {
    const statsArray = report.get("RTCCertificates");
    expect(statsArray).toBeInstanceOf(Array);
  });
});

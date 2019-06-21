import { SafariRTCStatsReport } from "../../src/standardizers/safari.js";
import rawStats from "../_double/safari-12.1.1.json";

describe("SafariRTCStatsReport standardized Safari's RTCStatsReport", () => {
  let report;

  beforeEach(() => {
    const restoredReport = new Map(rawStats);
    report = new SafariRTCStatsReport(restoredReport);
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

  test("RTCPeerConnection could be retrieved.", () => {
    const statsArray = report.get("RTCPeerConnection");
    expect(statsArray).toBeInstanceOf(Array);
  });

  test("RTCDataChannels could be retrieved.", () => {
    const statsArray = report.get("RTCDataChannels");
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

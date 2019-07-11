import { detect } from "detect-browser";
import { RTCStatsMoment } from "../src/rtcstats-moment";

jest.mock("detect-browser");

describe("send.video", () => {
  beforeEach(() => {
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("It gives instant attributes jitter and RTT.", () => {
    // setup
    const statsDouble = new Map([
      [
        "DummyStats",
        {
          id: "DummyStats",
          type: "remote-inbound-rtp",
          kind: "video",
          jitter: 0.2,
          roundTripTime: 0.3
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(statsDouble);
    const report = moment.report();

    // asert
    expect(report.send.video).toMatchObject({ jitter: 0.2, rtt: 0.3 });
  });

  test("It calculates averageEncodeTime.", () => {
    // setup
    const base = { id: "DummyStats", type: "outbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          totalEncodeTime: 10,
          framesEncoded: 10
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          totalEncodeTime: 20,
          framesEncoded: 12
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.send.video).toMatchObject({ averageEncodeTime: 5 });
  });

  test("It calculates qpValue.", () => {
    // setup
    const base = { id: "DummyStats", type: "outbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          qpSum: 10,
          framesEncoded: 10
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          qpSum: 20,
          framesEncoded: 12
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.send.video).toMatchObject({ qpValue: 5 });
  });

  test("It calculates bitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "outbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.send.video).toMatchObject({ bitrate: 8000 });
  });
});

describe("send.audio", () => {
  beforeEach(() => {
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("It gives instant attributes jitter, RTT and audioLevel.", () => {
    // setup
    const statsDouble = new Map([
      [
        "DummyStats_1",
        {
          id: "DummyStats_1",
          type: "remote-inbound-rtp",
          kind: "audio",
          jitter: 0.2,
          roundTripTime: 0.3
        }
      ],
      [
        "DummyStats_2",
        {
          id: "DummyStats_2",
          type: "sender",
          kind: "audio",
          audioLevel: 0.5
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(statsDouble);
    const report = moment.report();

    // asert
    expect(report.send.audio).toMatchObject({
      jitter: 0.2,
      rtt: 0.3,
      audioLevel: 0.5
    });
  });

  test("It calculates bitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "outbound-rtp", kind: "audio" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.send.audio).toMatchObject({ bitrate: 8000 });
  });
});

describe("receive.video", () => {
  beforeEach(() => {
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("It calculates jitterBufferDelay.", () => {
    // setup
    const base = { id: "DummyStats", type: "receiver", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          jitterBufferDelay: 100,
          jitterBufferEmittedCount: 2
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          jitterBufferDelay: 1100,
          jitterBufferEmittedCount: 12
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.video).toMatchObject({ jitterBufferDelay: 100 });
  });

  test("It calculates fractionLost.", () => {
    // setup
    const base = { id: "DummyStats", type: "inbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          packetsLost: 10,
          packetsReceived: 20
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          packetsLost: 20,
          packetsReceived: 120
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.video).toMatchObject({ fractionLost: 0.1 });
  });

  test("It calculates qpValue.", () => {
    // setup
    const base = { id: "DummyStats", type: "inbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          qpSum: 10,
          framesDecoded: 10
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          qpSum: 20,
          framesDecoded: 12
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.video).toMatchObject({ qpValue: 5 });
  });

  test("It calculates bitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "inbound-rtp", kind: "video" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.video).toMatchObject({ bitrate: 8000 });
  });
});

describe("receive.audio", () => {
  beforeEach(() => {
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("It gives instant attributes audioLevel.", () => {
    // setup
    const statsDouble = new Map([
      [
        "DummyStats",
        {
          id: "DummyStats",
          type: "receiver",
          kind: "audio",
          audioLevel: 0.5
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(statsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.audio).toMatchObject({ audioLevel: 0.5 });
  });

  test("It calculates jitterBufferDelay.", () => {
    // setup
    const base = { id: "DummyStats", type: "receiver", kind: "audio" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          jitterBufferDelay: 100,
          jitterBufferEmittedCount: 2
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          jitterBufferDelay: 1100,
          jitterBufferEmittedCount: 12
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.audio).toMatchObject({ jitterBufferDelay: 100 });
  });

  test("It calculates fractionLost.", () => {
    // setup
    const base = { id: "DummyStats", type: "inbound-rtp", kind: "audio" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          packetsLost: 10,
          packetsReceived: 20
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          packetsLost: 20,
          packetsReceived: 120
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.audio).toMatchObject({ fractionLost: 0.1 });
  });

  test("It calculates bitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "inbound-rtp", kind: "audio" };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.receive.audio).toMatchObject({ bitrate: 8000 });
  });
});

describe("candidatePair", () => {
  beforeEach(() => {
    detect.mockReturnValue({
      name: "chrome",
      version: "77.0.3842.0"
    });
  });

  test("It gives instant attributes RTT.", () => {
    // setup
    const statsDouble = new Map([
      [
        "DummyStats",
        {
          id: "DummyStats",
          type: "candidate-pair",
          nominated: true,
          currentRoundTripTime: 0.3
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(statsDouble);
    const report = moment.report();

    // asert
    expect(report.candidatePair).toMatchObject({ rtt: 0.3 });
  });

  test("It calculates upstreamBitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "candidate-pair", nominated: true };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesSent: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.candidatePair).toMatchObject({ upstreamBitrate: 8000 });
  });

  test("It calculates downstreamBitrate.", () => {
    // setup
    const base = { id: "DummyStats", type: "candidate-pair", nominated: true };
    const previousStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 100,
          timestamp: 0
        }
      ]
    ]);
    const lastStatsDouble = new Map([
      [
        "DummyStats",
        {
          ...base,
          bytesReceived: 1100,
          timestamp: 1000
        }
      ]
    ]);
    const moment = new RTCStatsMoment();

    // execute
    moment.update(previousStatsDouble);
    moment.update(lastStatsDouble);
    const report = moment.report();

    // asert
    expect(report.candidatePair).toMatchObject({ downstreamBitrate: 8000 });
  });
});

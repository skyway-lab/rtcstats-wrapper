import { detect } from "detect-browser";
import { ChromeRTCStatsReport } from "./standardizers/chrome.js";
import { FirefoxRTCStatsReport } from "./standardizers/firefox.js";
import { SafariRTCStatsReport } from "./standardizers/safari.js";
import { BaseRTCStatsReport } from "./standardizers/base.js";
import { RTCStatsReferences } from "./shared/constatnts.js";

function getVideoSenderStats(last, prev) {
  const stats = {};

  if (last.has(RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCRemoteInboundRtpVideoStreamStats = last.get(
      RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key
    )[0];

    stats.jitter = RTCRemoteInboundRtpVideoStreamStats.jitter;
    stats.rtt = RTCRemoteInboundRtpVideoStreamStats.roundTripTime;
  }

  if (
    last.has(RTCStatsReferences.RTCOutboundRtpVideoStreams.key) &&
    prev.has(RTCStatsReferences.RTCOutboundRtpVideoStreams.key)
  ) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCOutboundRtpVideoStreamStats = last.get(
      RTCStatsReferences.RTCOutboundRtpVideoStreams.key
    )[0];
    const previous = {
      RTCOutboundRtpVideoStreamStats: prev.get(
        RTCStatsReferences.RTCOutboundRtpVideoStreams.key
      )[0]
    };

    // calculate averageEncodeTime
    if (
      RTCOutboundRtpVideoStreamStats.totalEncodeTime !== null &&
      RTCOutboundRtpVideoStreamStats.framesEncoded !== null
    ) {
      const encodeTimeDelta =
        RTCOutboundRtpVideoStreamStats.totalEncodeTime -
        previous.RTCOutboundRtpVideoStreamStats.totalEncodeTime;
      const framesEncodedDelta =
        RTCOutboundRtpVideoStreamStats.framesEncoded -
        previous.RTCOutboundRtpVideoStreamStats.framesEncoded;

      stats.averageEncodeTime = encodeTimeDelta / framesEncodedDelta;
    }

    // calculate QP value
    if (
      RTCOutboundRtpVideoStreamStats.qpSum !== null &&
      RTCOutboundRtpVideoStreamStats.framesEncoded !== null
    ) {
      const qpSumDelta =
        RTCOutboundRtpVideoStreamStats.qpSum -
        previous.RTCOutboundRtpVideoStreamStats.qpSum;
      const framesEncodedDelta =
        RTCOutboundRtpVideoStreamStats.framesEncoded -
        previous.RTCOutboundRtpVideoStreamStats.framesEncoded;

      stats.qpValue = qpSumDelta / framesEncodedDelta;
    }

    // calculate bitrate with previous value
    if (RTCOutboundRtpVideoStreamStats.bytesSent !== null) {
      const bytesSentDelta =
        RTCOutboundRtpVideoStreamStats.bytesSent -
        previous.RTCOutboundRtpVideoStreamStats.bytesSent;
      const timeDelta =
        RTCOutboundRtpVideoStreamStats.timestamp -
        previous.RTCOutboundRtpVideoStreamStats.timestamp;

      // convert bytes/ms to bit/sec
      const bytesPerMs = bytesSentDelta / timeDelta;
      stats.bitrate = bytesPerMs * 8 * 1000;
    }
  }

  return stats;
}

function getAudioSenderStats(last, prev) {
  const stats = {};

  if (last.has(RTCStatsReferences.RTCAudioSenders.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCAudioSenderStats = last.get(RTCStatsReferences.RTCAudioSenders.key)[0];
    stats.audioLevel = RTCAudioSenderStats.audioLevel;
  }

  if (last.has(RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCRemoteInboundRtpAudioStreamStats = last.get(
      RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key
    )[0];
    stats.jitter = RTCRemoteInboundRtpAudioStreamStats.jitter;
    stats.rtt = RTCRemoteInboundRtpAudioStreamStats.roundTripTime;
  }

  if (
    last.has(RTCStatsReferences.RTCOutboundRtpAudioStreams.key) &&
    prev.has(RTCStatsReferences.RTCOutboundRtpAudioStreams.key)
  ) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCOutboundRtpAudioStreamStats = last.get(
      RTCStatsReferences.RTCOutboundRtpAudioStreams.key
    )[0];
    const previous = {
      RTCOutboundRtpAudioStreamStats: prev.get(
        RTCStatsReferences.RTCOutboundRtpAudioStreams.key
      )[0]
    };

    // calculate bitrate with previous value
    if (RTCOutboundRtpAudioStreamStats.bytesSent !== null) {
      const bytesSentDelta =
        RTCOutboundRtpAudioStreamStats.bytesSent -
        previous.RTCOutboundRtpAudioStreamStats.bytesSent;
      const timeDelta =
        RTCOutboundRtpAudioStreamStats.timestamp -
        previous.RTCOutboundRtpAudioStreamStats.timestamp;

      // convert bytes/ms to bit/sec
      const bytesPerMs = bytesSentDelta / timeDelta;
      stats.bitrate = bytesPerMs * 8 * 1000;
    }
  }

  return stats;
}

function getVideoReceiverStats(last, prev) {
  const stats = {};

  if (
    last.has(RTCStatsReferences.RTCVideoReceivers.key) &&
    prev.has(RTCStatsReferences.RTCVideoReceivers.key)
  ) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCVideoReceiverStats = last.get(
      RTCStatsReferences.RTCVideoReceivers.key
    )[0];

    if (prev.has(RTCStatsReferences.RTCVideoReceivers.key)) {
      const previous = {
        RTCVideoReceiverStats: prev.get(RTCStatsReferences.RTCVideoReceivers.key)[0]
      };

      if (
        RTCVideoReceiverStats.jitterBufferDelay !== null &&
        RTCVideoReceiverStats.jitterBufferEmittedCount !== null
      ) {
        const jitterBufferDelayDelta =
          RTCVideoReceiverStats.jitterBufferDelay -
          previous.RTCVideoReceiverStats.jitterBufferDelay;
        const jBDEmittedDelta =
          RTCVideoReceiverStats.jitterBufferEmittedCount -
          previous.RTCVideoReceiverStats.jitterBufferEmittedCount;

        stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
      }
    }
  }

  if (last.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCInboundRtpVideoStreamStats = last.get(
      RTCStatsReferences.RTCInboundRtpVideoStreams.key
    )[0];

    if (prev.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
      const previous = {
        RTCInboundRtpVideoStreamStats: prev.get(
          RTCStatsReferences.RTCInboundRtpVideoStreams.key
        )[0]
      };

      // calculate fractionLost
      if (
        RTCInboundRtpVideoStreamStats.packetsLost !== null &&
        RTCInboundRtpVideoStreamStats.packetsReceived !== null
      ) {
        const packetsLostDelta =
          RTCInboundRtpVideoStreamStats.packetsLost -
          previous.RTCInboundRtpVideoStreamStats.packetsLost;
        const packetsReceivedDelta =
          RTCInboundRtpVideoStreamStats.packetsReceived -
          previous.RTCInboundRtpVideoStreamStats.packetsReceived;

        stats.fractionLost = packetsLostDelta / packetsReceivedDelta;
      }

      // calculate QP value
      if (
        RTCInboundRtpVideoStreamStats.qpSum !== null &&
        RTCInboundRtpVideoStreamStats.framesDecoded !== null
      ) {
        const qpSumDelta =
          RTCInboundRtpVideoStreamStats.qpSum -
          previous.RTCInboundRtpVideoStreamStats.qpSum;
        const framesDecodedDelta =
          RTCInboundRtpVideoStreamStats.framesDecoded -
          previous.RTCInboundRtpVideoStreamStats.framesDecoded;

        stats.qpValue = qpSumDelta / framesDecodedDelta;
      }

      // calculate bitrate with previous value
      if (RTCInboundRtpVideoStreamStats.bytesReceived !== null) {
        const bytesReceivedDelta =
          RTCInboundRtpVideoStreamStats.bytesReceived -
          previous.RTCInboundRtpVideoStreamStats.bytesReceived;
        const timeDelta =
          RTCInboundRtpVideoStreamStats.timestamp -
          previous.RTCInboundRtpVideoStreamStats.timestamp;

        // convert bytes/ms to bit/sec
        const bytestPerMs = bytesReceivedDelta / timeDelta;
        stats.bitrate = bytestPerMs * 8 * 1000;
      }
    }
  }

  return stats;
}

function getAudioReceiverStats(last, prev) {
  const stats = {};

  if (last.has(RTCStatsReferences.RTCAudioReceivers.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCAudioReceiverStats = last.get(
      RTCStatsReferences.RTCAudioReceivers.key
    )[0];
    stats.audioLevel = RTCAudioReceiverStats.audioLevel;

    if (prev.has(RTCStatsReferences.RTCAudioReceivers.key)) {
      // While we only support single-track stream, this method only care about 1 transceiver.
      const RTCAudioReceiverStats = last.get(
        RTCStatsReferences.RTCAudioReceivers.key
      )[0];

      if (prev.has(RTCStatsReferences.RTCAudioReceivers.key)) {
        const previous = {
          RTCAudioReceiverStats: prev.get(
            RTCStatsReferences.RTCAudioReceivers.key
          )[0]
        };

        if (
          RTCAudioReceiverStats.jitterBufferDelay !== null &&
          RTCAudioReceiverStats.jitterBufferEmittedCount !== null
        ) {
          const jitterBufferDelayDelta =
            RTCAudioReceiverStats.jitterBufferDelay -
            previous.RTCAudioReceiverStats.jitterBufferDelay;
          const jBDEmittedDelta =
            RTCAudioReceiverStats.jitterBufferEmittedCount -
            previous.RTCAudioReceiverStats.jitterBufferEmittedCount;

          stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
        }
      }
    }
  }

  if (last.has(RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
    // While we only support single-track stream, this method only care about 1 transceiver.
    const RTCInboundRtpAudioStreamStats = last.get(
      RTCStatsReferences.RTCInboundRtpAudioStreams.key
    )[0];
    if (prev.has(RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
      const previous = {
        RTCInboundRtpAudioStreamStats: prev.get(
          RTCStatsReferences.RTCInboundRtpAudioStreams.key
        )[0]
      };

      // calculate fractionLost
      if (
        RTCInboundRtpAudioStreamStats.packetsLost !== null &&
        RTCInboundRtpAudioStreamStats.packetsReceived !== null
      ) {
        const packetsLostDelta =
          RTCInboundRtpAudioStreamStats.packetsLost -
          previous.RTCInboundRtpAudioStreamStats.packetsLost;
        const packetsReceivedDelta =
          RTCInboundRtpAudioStreamStats.packetsReceived -
          previous.RTCInboundRtpAudioStreamStats.packetsReceived;

        stats.fractionLost = packetsLostDelta / packetsReceivedDelta;
      }

      // calculate bitrate with previous value
      if (RTCInboundRtpAudioStreamStats.bytesReceived !== null) {
        const bytesReceivedDelta =
          RTCInboundRtpAudioStreamStats.bytesReceived -
          previous.RTCInboundRtpAudioStreamStats.bytesReceived;
        const timeDelta =
          RTCInboundRtpAudioStreamStats.timestamp -
          previous.RTCInboundRtpAudioStreamStats.timestamp;

        // convert bytes/ms to bit/sec
        const bytestPerMs = bytesReceivedDelta / timeDelta;
        stats.bitrate = bytestPerMs * 8 * 1000;
      }
    }
  }

  return stats;
}

function getCandidatePairStats(last, prev) {
  const stats = {};

  if (
    last.has(RTCStatsReferences.RTCIceCandidatePairs.key) &&
    last
      .get(RTCStatsReferences.RTCIceCandidatePairs.key)
      .some(stat => stat.nominated)
  ) {
    const RTCIceCandidatePairStats = last
      .get(RTCStatsReferences.RTCIceCandidatePairs.key)
      .find(stat => stat.nominated);

    // assign rtt directly
    stats.rtt = RTCIceCandidatePairStats.currentRoundTripTime;

    // check if previous stats also has nominated candidate-pair
    if (
      prev.has(RTCStatsReferences.RTCIceCandidatePairs.key) &&
      prev
        .get(RTCStatsReferences.RTCIceCandidatePairs.key)
        .some(stat => stat.nominated)
    ) {
      const previous = {
        RTCIceCandidatePairStats: prev
          .get(RTCStatsReferences.RTCIceCandidatePairs.key)
          .find(stat => stat.nominated)
      };

      // calculate sending bitrate with previous value
      if (RTCIceCandidatePairStats.bytesSent !== null) {
        const bytesSentDelta =
          RTCIceCandidatePairStats.bytesSent -
          previous.RTCIceCandidatePairStats.bytesSent;
        const timeDelta =
          RTCIceCandidatePairStats.timestamp -
          previous.RTCIceCandidatePairStats.timestamp;

        // convert bytes/ms to bit/sec
        const bytestPerMs = bytesSentDelta / timeDelta;
        stats.upstreamBitrate = bytestPerMs * 8 * 1000;
      }

      // calculate receiving bitrate with previous value
      if (RTCIceCandidatePairStats.bytesReceived !== null) {
        const bytesReceivedDelta =
          RTCIceCandidatePairStats.bytesReceived -
          previous.RTCIceCandidatePairStats.bytesReceived;
        const timeDelta =
          RTCIceCandidatePairStats.timestamp -
          previous.RTCIceCandidatePairStats.timestamp;

        // convert bytes/ms to bit/sec
        const bytestPerMs = bytesReceivedDelta / timeDelta;
        stats.downstreamBitrate = bytestPerMs * 8 * 1000;
      }
    }
  }

  return stats;
}

export class RTCStatsMoment {
  constructor() {
    const { name, version } = detect();
    const [major, minor, patch] = version.split(".").map(n => parseInt(n));
    const browser = { name, major, minor, patch };

    switch (browser.name) {
      case "chrome":
        this.standardizer = ChromeRTCStatsReport;
        break;
      case "firefox":
        this.standardizer = FirefoxRTCStatsReport;
        break;
      case "safari":
        this.standardizer = SafariRTCStatsReport;
        break;
      default:
        this.standardizer = BaseRTCStatsReport;
    }

    this._report = {
      prev: new Map(),
      last: new Map()
    };
  }

  update(report) {
    this._report.prev = this._report.last;
    this._report.last = new this.standardizer(report);
  }

  report() {
    const { last, prev } = this._report;
    return {
      send: {
        video: getVideoSenderStats(last, prev),
        audio: getAudioSenderStats(last, prev)
      },
      receive: {
        video: getVideoReceiverStats(last, prev),
        audio: getAudioReceiverStats(last, prev)
      },
      candidatePair: getCandidatePairStats(last, prev)
    };
  }
}

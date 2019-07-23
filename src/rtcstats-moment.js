import { getStandardizer } from "./standardize-support.js";
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
    const RTCAudioSenderStats = last.get(
      RTCStatsReferences.RTCAudioSenders.key
    )[0];
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
        RTCVideoReceiverStats: prev.get(
          RTCStatsReferences.RTCVideoReceivers.key
        )[0]
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

    // calculate fractionLost
    if (
      RTCInboundRtpVideoStreamStats.packetsLost !== null &&
      RTCInboundRtpVideoStreamStats.packetsReceived !== null
    ) {
      stats.fractionLost =
        RTCInboundRtpVideoStreamStats.packetsLost /
        RTCInboundRtpVideoStreamStats.packetsReceived;
    }

    if (prev.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
      const previous = {
        RTCInboundRtpVideoStreamStats: prev.get(
          RTCStatsReferences.RTCInboundRtpVideoStreams.key
        )[0]
      };

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

    // calculate fractionLost
    if (
      RTCInboundRtpAudioStreamStats.packetsLost !== null &&
      RTCInboundRtpAudioStreamStats.packetsReceived !== null
    ) {
      stats.fractionLost =
        RTCInboundRtpAudioStreamStats.packetsLost /
        RTCInboundRtpAudioStreamStats.packetsReceived;
    }

    if (prev.has(RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
      const previous = {
        RTCInboundRtpAudioStreamStats: prev.get(
          RTCStatsReferences.RTCInboundRtpAudioStreams.key
        )[0]
      };

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

/**
 * @typedef MomentaryReport
 * @property {Number} send.video.jitter - A jitter in seconds given in RR.
 * @property {Number} send.video.rtt - An rtt in seconds given in RR.
 * @property {Number} send.video.averageEncodeTime - Estimated average encode time in milliseconds.
 * @property {Number} send.video.qpValue - Estimated QP(quantize parameter) value.
 * @property {Number} send.video.bitrate - Estimated bit/sec about sending video.
 * @property {Number} send.audio.jitter - A jitter in seconds given in RR.
 * @property {Number} send.audio.rtt - An rtt in seconds given in RR.
 * @property {Number} send.audio.bitrate - Estimated bit/sec about sending audio.
 * @property {Number} receive.video.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
 * @property {Number} receive.video.fractionLost - Estimated Rate of packet loss.
 * @property {Number} receive.video.qpValue - Estimated QP(quantize parameter) value.
 * @property {Number} receive.video.bitrate - Estimated bit/sec about receiving video.
 * @property {Number} receive.audio.audioLevel - The audio level of the receiving track.
 * @property {Number} receive.audio.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
 * @property {Number} receive.audio.fractionLost - Estimated Rate of packet loss.
 * @property {Number} receive.audio.bitrate - Estimated bit/sec about receiving audio.
 * @property {Number} candidatePair.rtt - An round-trip time in seconds computed from STUN connectivity checks.
 * @property {Number} candidatePair.downstreamBitrate - Estimated bit/sec about receiving data.
 * @property {Number} candidatePair.upstreamBitrate - Estimated bit/sec about sending data.
 * @example
 * {
 *   send: {
 *     video: {
 *       jitter: 0.008,
 *       rtt: 0.002,
 *       averageEncodeTime: 0.0026,
 *       qpValue: 5.5,
 *       bitrate: 550092.0485312309
 *     },
 *     audio: {
 *       jitter: 0.0078,
 *       rtt: 0.001,
 *       bitrate: 37708.31230270733
 *     }
 *   },
 *   receive: {
 *     video: {
 *       jitterBufferDelay: 0.12,
 *       fractionLost: 0,
 *       qpValue: 19.8,
 *       bitrate: 814766.8777838446
 *     },
 *     audio: {
 *       audioLevel: 0.0096,
 *       jitterBufferDelay: 0.11183673469387359,
 *       fractionLost: 0,
 *       bitrate: 37136.608229785656
 *     }
 *   },
 *   candidatePair: {
 *     rtt: 0.002,
 *     upstreamBitrate: 606239.8302281727,
 *     downstreamBitrate: 872903.5454809506
 *   }
 * }
 */

/**
 * Class to get the momentary metrics based on the RTCStats.
 *
 * @see example application {@link https://github.com/skyway-lab/connection-status-viewer-example}
 * @example
 * import { RTCStatsMoment } from 'rtcstats-wrapper';
 *
 * const moment = new RTCStatsMoment();
 *
 * const report = await pc.getStats();
 * moment.update(report);
 * moment.report();
 * //=> {
 * //    "send": {
 * //        "video": { ... },
 * //        "audio": { ... },
 * //    },
 * //    "receive": {
 * //        "video": { ... },
 * //        "audio": { ... },
 * //    },
 * //    "candidatePair": { ... }
 * //}
 */
export class RTCStatsMoment {
  /**
   * Create a RTCStatsMoment.
   *
   * @constructs
   */
  constructor() {
    this.standardizer = getStandardizer();

    this._report = {
      prev: new Map(),
      last: new Map()
    };
  }

  /**
   * Update the report.
   *
   * @param {RTCStatsReport} report - original stats report from `(pc|sender|receiver).getStats()`.
   * @example
   * import { RTCStatsMoment } from 'rtcstats-wrapper';
   *
   * const moment = new RTCStatsMoment();
   *
   * const id = setInterval(() => {
   *   const report = await pc.getStats();
   *   moment.update(report);
   * }, INTERVAL);
   */
  update(report) {
    this._report.prev = this._report.last;
    this._report.last = new this.standardizer(report);
  }

  /**
   * Calculate the momentary value based on the updated value.
   * MomentaryReport does not have attribute that can not be obtained.
   *
   * @return {MomentaryReport}
   * @example
   * import { RTCStatsMoment } from 'rtcstats-wrapper';
   *
   * const moment = new RTCStatsMoment();
   *
   * const receiver = pc.getReceivers().find(sender => sender.kind === "video");
   * const report = receiver.getStats();
   * moment.update(report);
   * moment.report();
   * //=> {
   * //    "send": {
   * //        "video": { ... },
   * //    }
   * //}
   */
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

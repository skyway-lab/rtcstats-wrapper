import {
  RTCStatsReferences,
  RTCStatsReferenceMap
} from "../shared/constatnts.js";

/**
 * Base class of browser-independent RTCStatsReport.
 * This class provides to get an array of specific type of RTCStats with {@link RTCStatsReferences}.
 * See the example below.
 *
 * @throws - When given stats has undefined type or kind.
 * @example
 * import {
 *   BaseRTCStatsReport,
 *   RTCStatsReferences
 * } from 'rtcstats-wrapper';
 *
 * const report = new BaseRTCStatsReport(await pc.getStats());
 *
 * // get stats of incoming RTP stream
 * const recvVideoStats = report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key);
 * // get each log of inbound-rtp
 * for (const stats of recvVideoStats) {
 *   logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
 * }
 */
export class BaseRTCStatsReport {
  /**
   * Create a BaseRTCStatsReport.
   *
   * @constructs
   * @param {RTCStatsReport} originalReport - original stats report from `(pc|sender|receiver).getStats()`.
   */
  constructor(originalReport) {
    const report = new Map();

    for (const originalStats of originalReport.values()) {
      const ref = this._getRTCStatsReference(originalStats);
      const stats = {};

      // get the preferred value from original stats.
      for (const attr of RTCStatsReferenceMap.get(ref)) {
        if (originalStats[attr] !== undefined) {
          stats[attr] = originalStats[attr];
        }
      }

      // update the stats object
      if (report.has(ref)) {
        const statsArray = report.get(ref);
        statsArray.push(stats);
        report.set(ref, statsArray);
      } else {
        report.set(ref, [stats]);
      }
    }

    this._report = report;
  }

  /**
   * Get the array of type of stats referred by `key`.
   *
   * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
   * @return {Array<RTCStats>} An array of stats referred by `key`.
   * @example
   * const report = new BaseRTCStatsReport(await pc.getStats());
   *
   * if (report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
   * const stats = report.get(
   *   RTCStatsReferences.RTCInboundRtpVideoStreams.key
   * )[0];
   * logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
   */
  get(key) {
    return this._report.get(key);
  }

  /**
   * Check if the instance has the type of stats referred by `key`.
   *
   * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
   * @return {bool} True if the referred stats exists.
   * @example
   * const report = new BaseRTCStatsReport(await pc.getStats());
   *
   * if (report.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
   *   logger.info("receiving video.");
   * } else {
   *   logger.info("no video streams receiving.");
   * }
   */
  has(key) {
    return this._report.has(key);
  }

  _getRTCStatsReference(stats) {
    switch (stats.type) {
      case "codec":
        return RTCStatsReferences.RTCCodecs.key;
      case "inbound-rtp":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCInboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCInboundRtpAudioStreams.key;
        }
        break;
      case "outbound-rtp":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
        }
        break;
      case "remote-inbound-rtp":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key;
        }
        break;
      case "remote-outbound-rtp":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCRemoteOutboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCRemoteOutboundRtpAudioStreams.key;
        }
        break;
      case "media-source":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCVideoSources.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCAudioSources.key;
        }
        break;
      case "csrc":
        return RTCStatsReferences.RTCRtpContributingSources.key;
      case "peer-connection":
        return RTCStatsReferences.RTCPeerConnection.key;
      case "data-channel":
        return RTCStatsReferences.RTCDataChannels.key;
      case "stream":
        return RTCStatsReferences.RTCMediaStreams.key;
      case "sender":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCVideoSenders.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCAudioSenders.key;
        }
        break;
      case "receiver":
        if (stats.kind === "video") {
          return RTCStatsReferences.RTCVideoReceivers.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCAudioReceivers.key;
        }
        break;
      case "transport":
        return RTCStatsReferences.RTCTransports.key;
      case "candidate-pair":
        return RTCStatsReferences.RTCIceCandidatePairs.key;
      case "local-candidate":
        return RTCStatsReferences.RTCLocalIceCandidates.key;
      case "remote-candidate":
        return RTCStatsReferences.RTCRemoteIceCandidates.key;
      case "certificate":
        return RTCStatsReferences.RTCCertificates.key;
      case "stunserverconnection":
        return RTCStatsReferences.RTCStunServerConnections.key;
      default:
        throw new Error(
          `Received an unknown stats-type string: ${stats.type}.`
        );
    }
    throw new Error(
      `Received an unknown kind of ${stats.type}: ${stats.kind}.`
    );
  }
}

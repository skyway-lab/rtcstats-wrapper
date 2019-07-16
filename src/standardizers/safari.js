import { BaseRTCStatsReport } from "./base.js";
import { RTCStatsReferences } from "../shared/constatnts.js";

/**
 * Wrapped RTCStatsReport class for Safari.
 *
 * @extends BaseRTCStatsReport
 */
export class SafariRTCStatsReport extends BaseRTCStatsReport {
  _getRTCStatsReference(stats) {
    switch (stats.type) {
      case "track":
        if (stats.remoteSource && stats.hasOwnProperty("frameHeight")) {
          return RTCStatsReferences.RTCVideoReceivers.key;
        } else if (stats.remoteSource && stats.hasOwnProperty("audioLevel")) {
          return RTCStatsReferences.RTCAudioReceivers.key;
        } else if (stats.hasOwnProperty("frameHeight")) {
          return RTCStatsReferences.RTCVideoSenders.key;
        } else if (stats.hasOwnProperty("audioLevel")) {
          return RTCStatsReferences.RTCAudioSenders.key;
        }
        break;
      case "inbound-rtp":
        if (stats.mediaType === "video") {
          return RTCStatsReferences.RTCInboundRtpVideoStreams.key;
        } else if (stats.mediaType === "audio") {
          return RTCStatsReferences.RTCInboundRtpAudioStreams.key;
        }
        break;
      case "outbound-rtp":
        if (stats.mediaType === "video") {
          return RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
        } else if (stats.mediaType === "audio") {
          return RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
        }
        break;
    }
    return super._getRTCStatsReference(stats);
  }
}

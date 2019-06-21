import { BaseRTCStatsReport } from "./base.js";
import { StasReferences } from "../shared/constatnts.js";

export class SafariRTCStatsReport extends BaseRTCStatsReport {
  _getStatsReference(stats) {
    switch (stats.type) {
      case "track":
        if (stats.remoteSource && stats.hasOwnProperty("frameHeight")) {
          return StasReferences.RTCVideoReceivers.key;
        } else if (stats.remoteSource && stats.hasOwnProperty("audioLevel")) {
          return StasReferences.RTCAudioReceivers.key;
        } else if (stats.hasOwnProperty("frameHeight")) {
          return StasReferences.RTCVideoSenders.key;
        } else if (stats.hasOwnProperty("audioLevel")) {
          return StasReferences.RTCAudioSenders.key;
        }
        break;
      case "inbound-rtp":
        if (stats.mediaType === "video") {
          return StasReferences.RTCInboundRtpVideoStreams.key;
        } else if (stats.mediaType === "audio") {
          return StasReferences.RTCInboundRtpAudioStreams.key;
        }
        break;
      case "outbound-rtp":
        if (stats.mediaType === "video") {
          return StasReferences.RTCOutboundRtpVideoStreams.key;
        } else if (stats.mediaType === "audio") {
          return StasReferences.RTCOutboundRtpAudioStreams.key;
        }
        break;
    }
    return super._getStatsReference(stats);
  }
}

import { BaseRTCStatsReport } from "./base.js";
import { StasReferences } from "../shared/constatnts.js";

export class ChromeRTCStatsReport extends BaseRTCStatsReport {
  _getStatsReference(stats) {
    switch (stats.type) {
      case "track":
        if (stats.remoteSource && stats.kind === "video") {
          return StasReferences.RTCVideoReceivers.key;
        } else if (stats.remoteSource && stats.kind === "audio") {
          return StasReferences.RTCAudioReceivers.key;
        } else if (stats.kind === "video") {
          return StasReferences.RTCVideoSenders.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCAudioSenders.key;
        }
    }
    return super._getStatsReference(stats);
  }
}

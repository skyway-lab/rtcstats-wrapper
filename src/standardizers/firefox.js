import { BaseRTCStatsReport } from "./base.js";
import {
  RTCStatsReferences,
  RTCStatsReferenceMap
} from "../shared/constatnts.js";

/**
 * Get "<in|out>bound-rtp" stats since Firefox under v69 does not use stats-type
 * "track" but "<in|out>bound-rtp" stats includes the values that can be
 * considered as "track".
 *
 * @private
 */
function getTrackStatsOfFirefox(stats) {
  switch (stats.type) {
    case "inbound-rtp":
      if (stats.kind === "video") {
        return RTCStatsReferences.RTCVideoReceivers.key;
      } else if (stats.kind === "audio") {
        return RTCStatsReferences.RTCAudioReceivers.key;
      }
      break;
    case "outbound-rtp":
      if (stats.kind === "video") {
        return RTCStatsReferences.RTCVideoSenders.key;
      } else if (stats.kind === "audio") {
        return RTCStatsReferences.RTCAudioSenders.key;
      }
      break;
    default:
      throw new Error(`Received an unknown stats-type string: ${stats.type}.`);
  }
}

/**
 * Wrapped RTCStatsReport class for Firefox.
 *
 * @extends BaseRTCStatsReport
 */
export class FirefoxRTCStatsReport extends BaseRTCStatsReport {
  constructor(originalReport) {
    super(originalReport);

    // retrieve receiver/sender stats
    const statsRefs = [...originalReport.keys()];
    const rtpRefs = statsRefs.filter(ref => /(in|out)bound_rtp_.*/.test(ref));

    for (const originalRef of rtpRefs) {
      const originalStats = originalReport.get(originalRef);
      const ref = getTrackStatsOfFirefox(originalStats);
      const stats = {};

      // get the preferred value from original stats.
      for (const attr of RTCStatsReferenceMap.get(ref)) {
        if (originalStats[attr] !== undefined) {
          stats[attr] = originalStats[attr];
        }
      }

      // update the stats object
      if (this._report.has(ref)) {
        const statsArray = this._report.get(ref);
        statsArray.push(stats);
        this._report.set(ref, statsArray);
      } else {
        this._report.set(ref, [stats]);
      }
    }
  }
}

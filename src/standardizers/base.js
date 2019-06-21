import { StasReferences, StatsReferenceMap } from "../shared/constatnts.js";

export class BaseRTCStatsReport {
  constructor(originalReport) {
    const report = new Map();

    for (const originalStats of originalReport.values()) {
      const ref = this._getStatsReference(originalStats);
      const stats = {};

      // get the preferred value from original stats.
      for (const attr of StatsReferenceMap.get(ref)) {
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

  has(key) {
    return this._report.has(key);
  }

  get(key) {
    return this._report.get(key);
  }

  _getStatsReference(stats) {
    switch (stats.type) {
      case "codec":
        return StasReferences.RTCCodecs.key;
      case "inbound-rtp":
        if (stats.kind === "video") {
          return StasReferences.RTCInboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCInboundRtpAudioStreams.key;
        }
        break;
      case "outbound-rtp":
        if (stats.kind === "video") {
          return StasReferences.RTCOutboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCOutboundRtpAudioStreams.key;
        }
        break;
      case "remote-inbound-rtp":
        if (stats.kind === "video") {
          return StasReferences.RTCRemoteInboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCRemoteInboundRtpAudioStreams.key;
        }
        break;
      case "remote-outbound-rtp":
        if (stats.kind === "video") {
          return StasReferences.RTCRemoteOutboundRtpVideoStreams.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCRemoteOutboundRtpAudioStreams.key;
        }
        break;
      case "media-source":
        if (stats.kind === "video") {
          return StasReferences.RTCVideoSources.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCAudioSources.key;
        }
        break;
      case "csrc":
        return StasReferences.RTCRtpContributingSources.key;
      case "peer-connection":
        return StasReferences.RTCPeerConnection.key;
      case "data-channel":
        return StasReferences.RTCDataChannels.key;
      case "stream":
        return StasReferences.RTCMediaStreams.key;
      case "sender":
        if (stats.kind === "video") {
          return StasReferences.RTCVideoSenders.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCAudioSenders.key;
        }
        break;
      case "receiver":
        if (stats.kind === "video") {
          return StasReferences.RTCVideoReceivers.key;
        } else if (stats.kind === "audio") {
          return StasReferences.RTCAudioReceivers.key;
        }
        break;
      case "transport":
        return StasReferences.RTCTransports.key;
      case "candidate-pair":
        return StasReferences.RTCIceCandidatePairs.key;
      case "local-candidate":
        return StasReferences.RTCLocalIceCandidates.key;
      case "remote-candidate":
        return StasReferences.RTCRemoteIceCandidates.key;
      case "certificate":
        return StasReferences.RTCCertificates.key;
      case "stunserverconnection":
        return StasReferences.RTCStunServerConnections.key;
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

import Enum from "enum";
import { RTCStatsMoment } from "../src/rtcstats-moment";
import { EventEmitter } from "events";

/**
 * Enum for event references of RTCStatsInsight
 *
 * @readonly
 * @property {EnumItem} audio-rtt - RTT of sending audio.
 * @property {EnumItem} video-rtt - RTT of sending audio.
 * @property {EnumItem} audio-jitter - Jitter about sending audio.
 * @property {EnumItem} video-jitter - Jitter about sending video.
 * @property {EnumItem} audio-fractionLost - Packet loss rate of receiving audio stream.
 * @property {EnumItem} video-fractionLost - Packet loss rate of receiving video stream.
 * @property {EnumItem} audio-jitterBufferDelay - Local jitter buffer delay about receiving audio.
 * @property {EnumItem} video-jitterBufferDelay - Local jitter buffer delay about receiving video.
 * @property {EnumItem} rtt - Current RTT for ICE transport.
 * @example
 * import {
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const insight = new RTCStatsInsight(sender);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   console.log(event.level);
 * });
 *
 * insight.watch()
 */
export const RTCStatsInsightEvents = new Enum([
  "audio-rtt",
  "video-rtt",
  "audio-jitter",
  "video-jitter",
  "audio-fractionLost",
  "video-fractionLost",
  "audio-jitterBufferDelay",
  "video-jitterBufferDelay",
  "rtt"
]);

/**
 * Enum for levels of RTCStatsInsightEvents.
 *
 * @readonly
 * @property {EnumItem} stable - The call is stable.
 * @property {EnumItem} unstable - The call is unstable and may communicated in low quality.
 * @property {EnumItem} critical - Highly affected on call quality.
 * @property {EnumItem} unknown - This level is for unmonitored metrics.
 * @example
 * import {
 *   StatusLevels,
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const insight = new RTCStatsInsight(sender);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   if (event.level === StatusLevels.stable.key) {
 *     console.log("Now back to stable!");
 *   }
 * });
 *
 * insight.watch()
 */
export const StatusLevels = new Enum([
  "stable",
  "unstable",
  "critical",
  "unknown"
]);

/**
 * A set of thresholds for emitting each events used in the constructor of RTCStatsInsight.
 * Use the event name for the thresholds object's key and use this object for the value.
 * Please see example for usage.
 *
 * @typedef {Object} Thresholds
 * @property {Number} unstable - When the value used in thresholds object's key goes greater than this value, the `unstable` level event is fired.
 * @property {Number} critical - When the value used in thresholds object's key goes greater than this value, the `critical` level event is fired.
 * @example
 * const thresholds = {
 *     "audio-rtt": {
 *       unstable: 0.1
 *     },
 *     "audio-fractionLost": {
 *       unstable: 0.03,
 *       critical: 0.08,
 *     }
 *   }
 * }
 *
 * const insight = new RTCStatsInsight(pc, { thresholds });
 * insight.on(RTCStatsInsightEvents["audio-fractionLost"].key, events => {
 *   // fired when `fractionLost` of receiving audio goes up to 0.03
 *   // ...
 * }
 */
const DEFAULT_THRESHOLDS = {
  "audio-rtt": { unstable: 0.4, critical: 0.8 },
  "video-rtt": { unstable: 0.4, critical: 0.8 },
  "audio-jitter": { unstable: 0.05, critical: 0.1 },
  "video-jitter": { unstable: 0.03, critical: 0.1 },
  "audio-fractionLost": { unstable: 0.08, critical: 0.15 },
  "video-fractionLost": { unstable: 0.08, critical: 0.15 },
  "audio-jitterBufferDelay": { unstable: 0.5, critical: 1 },
  "video-jitterBufferDelay": { unstable: 0.05, critical: 0.1 },
  rtt: { unstable: 0.5, critical: 1 }
};

class ConnectionStatus {
  constructor(options) {
    options = options || {};
    this._options = {
      failCount: 3,
      within: 5,
      ...options
    };
    this._store = {
      unstable: new Array(this._options.within).fill(null),
      critical: new Array(this._options.within).fill(null)
    };
    this._level = StatusLevels.unknown.key;
  }

  get level() {
    if (this._store.critical.some(x => x === null)) {
      return StatusLevels.unknown.key;
    }

    const criticalCount = this._store.critical.filter(Boolean).length;
    if (criticalCount > this._options.failCount) {
      return StatusLevels.critical.key;
    }

    const unstableCount = this._store.critical.filter(Boolean).length;
    if (unstableCount > this._options.failCount) {
      return StatusLevels.unstable.key;
    }

    return StatusLevels.stable.key;
  }

  check(value, threshold) {
    this._store.critical.unshift(value > threshold.critical);
    this._store.critical.pop();
    this._store.unstable.unshift(value > threshold.unstable);
    this._store.unstable.pop();
  }
}

/**
 * EventEmitter class that polls getStats() to monitor connection status.
 *
 * @example
 * import {
 *   StatusLevels,
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const options = {
 *   interval: 3000,
 *   thresholds: {
 *     "audio-rtt": {
 *       unstable: 0.1
 *     },
 *     "audio-fractionLost": {
 *       unstable: 0.03,
 *       critical: 0.08,
 *     },
 *   },
 *   triggerCondition: {
 *     failCount: 2,
 *     within: 3
 *   }
 * }
 *
 * const insight = new RTCStatsInsight(sender, options);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   if (event.level === StatusLevels.stable.key) {
 *     console.log("Now back to stable!");
 *   }
 * });
 *
 * insight.watch()
 */
export class RTCStatsInsight extends EventEmitter {
  /**
   * Create a RTCStatsInsight.
   *
   * @constructs
   * @param {RTCPeerConnection|RTCRtpReceiver|RTCRtpSender} statsSrc - getStats() method of this object is called in RTCStatsInsight.
   * @param {Object} options
   * @param {Number} options.interval - The polling interval in milliseconds. default 1000ms.
   * @param {Thresholds} options.thresholds - A set of thresholds for emitting each events.
   * @param {Object} options.triggerCondition - The trigger condition which defines how much failures makes this to fire an event. `${triggerCondition.failCount}` failures within `${triggerCondition.within}` attemption causes trigger of events.
   */
  constructor(statsSrc, options) {
    super();

    options = options || {};
    this._statsSrc = statsSrc;
    this._interval = options.interval || 1000;
    this._thresholds = { ...DEFAULT_THRESHOLDS, ...options.thresholds };
    this._moment = new RTCStatsMoment();
    this._status = RTCStatsInsightEvents.enums.reduce(
      (acc, cur) =>
        Object.assign(acc, {
          [cur]: new ConnectionStatus(options.triggerCondition)
        }),
      {}
    );
  }

  /**
   * Start polling getStats().
   *
   * @fires RTCStatsInsight#audio-rtt
   * @fires RTCStatsInsight#video-rtt
   * @fires RTCStatsInsight#audio-jitter
   * @fires RTCStatsInsight#video-jitter
   * @fires RTCStatsInsight#audio-fractionLost
   * @fires RTCStatsInsight#video-fractionLost
   * @fires RTCStatsInsight#audio-jitterBufferDelay
   * @fires RTCStatsInsight#video-jitterBufferDelay
   * @fires RTCStatsInsight#rtt
   * @see {RTCStatsInsightEvents}
   */
  watch() {
    /**
     * Fires when an RTT of sending audio stream has been changed.
     * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
     *
     * @event RTCStatsInsight#audio-rtt
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when an RTT of sending video stream has been changed.
     * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
     *
     * @event RTCStatsInsight#video-rtt
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when a jitter of sending audio stream has been changed.
     * By default, `unstable` fires on jitter > 50ms and `critical` fires on jitter > 100ms.
     *
     * @event RTCStatsInsight#audio-jitter
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when a jitter of sending video stream has been changed.
     * By default, `unstable` fires on jitter > 30ms and `critical` fires on jitter > 100ms.
     *
     * @event RTCStatsInsight#video-jitter
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when the packet loss rate of receiving audio stream has been changed.
     * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
     *
     * @event RTCStatsInsight#audio-fractionLost
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when the packet loss rate of receiving video stream has been changed.
     * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
     *
     * @event RTCStatsInsight#video-fractionLost
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when the jitter buffer delay of receiving audio stream has been changed.
     * By default, `unstable` fires on jitter buffer delay > 500ms and `critical` fires on jitter buffer delay > 1000ms.
     *
     * @event RTCStatsInsight#audio-jitterBufferDelay
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when the jitter buffer delay of receiving video stream has been changed.
     * By default, `unstable` fires on jitter buffer delay > 50ms and `critical` fires on jitter buffer delay > 100ms.
     *
     * @event RTCStatsInsight#video-jitterBufferDelay
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    /**
     * Fires when the rtt of ICE connection has been changed.
     * The difference with media RTT is that media RTT uses the value of RTCP packet, and this RTT uses ICE connectivity checks timestamp.
     * By default, `unstable` fires on rtt > 500ms and `critical` fires on rtt > 1000ms.
     *
     * @event RTCStatsInsight#rtt
     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
     * @property {string} threshold - Threshold for this event to fire.
     * @property {string} value - Last measured value when this event fires.
     */

    this._intervalID = setInterval(async () => {
      const report = await this._statsSrc.getStats();
      this._moment.update(report);

      const momentum = this._moment.report();
      this._checkStatus(momentum);
    }, this._interval);
  }

  /**
   * Stop polling getStats().
   */
  stop() {
    clearInterval(this._intervalID);
  }

  get status() {
    return this._status;
  }
  _checkStatus(moment) {
    const metrics = [
      { direction: "send", kind: "audio", key: "rtt" },
      { direction: "send", kind: "video", key: "rtt" },
      { direction: "send", kind: "audio", key: "jitter" },
      { direction: "send", kind: "video", key: "jitter" },
      { direction: "receive", kind: "audio", key: "fractionLost" },
      { direction: "receive", kind: "video", key: "fractionLost" },
      { direction: "receive", kind: "audio", key: "jitterBufferDelay" },
      { direction: "receive", kind: "video", key: "jitterBufferDelay" },
      { direction: "candidatePair", key: "rtt" }
    ];

    for (const { direction, kind, key } of metrics) {
      const stats =
        direction === "candidatePair"
          ? moment[direction]
          : moment[direction][kind];
      const eventKey = direction === "candidatePair" ? key : `${kind}-${key}`;

      if (stats.hasOwnProperty(key)) {
        // Update the value and emit when the the level has been changed.
        const currentLevel = this._status[eventKey].level;
        this._status[eventKey].check(stats[key], this._thresholds[eventKey]);

        const updatedLevel = this._status[eventKey].level;
        if (updatedLevel !== currentLevel) {
          if (currentLevel === "unknown" && updatedLevel === "stable") continue;

          this.emit(eventKey, {
            level: updatedLevel,
            event: eventKey,
            threshold: this._thresholds[eventKey][updatedLevel],
            value: stats[key]
          });
        }
      }
    }
  }
}

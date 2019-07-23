# rtcstats-wrapper
A wrapper of RTCStats for standardization and calculation of momentary values.

#### features

- Standardize a result of [getStats()](https://w3c.github.io/webrtc-stats/) which is different between each browsers.
- Calculate momentary status (such as `jitterBufferDelay` at one moment) from a result of getStats().

## Getting Started
### Installation
```bash
npm install https://github.com/skyway-lab/rtcstats-wrapper.git
```

### Usage
#### RTCStats standardizers
Since the implementation of getStats varies between each browsers, you need a shim to standardize them when you use RTCStats in your cross-browser application.
`rtcstats-wrapper` gives it and supports Google Chrome, Firefox and Safari.

see [reference](https://skyway-lab.github.io/rtcstats-wrapper/global.html#standardizeReport)

```javascript
import { standardizeReport, RTCStatsReferences } from 'rtcstats-wrapper';

const pc = new RTCPeerConnection();
//  ...

const report = standardizeReport(await pc.getStats());
const receiverStats = report.get(RTCStatsReferences.RTCVideoReceivers.key);
const framesDecoded = receiverStats[0].framesDecoded;
// ...
```

#### RTCStatsMoment
Since RTCStats shows statical information, most of its attributes mean total number of each metrics.
Therefore, you need a little calculation to get how network or media pipeline perform at that moment, so we provide the API to get the momentary metrics based on the RTCStats.
After established the connection with `RTCPeerConnection`, then like

see [reference](https://skyway-lab.github.io/rtcstats-wrapper/RTCStatsMoment.html)

```javascript
import { RTCStatsMoment } from 'rtcstats-wrapper';

const pc = new RTCPeerConnection();
const moment = new RTCStatsMoment();
// establish a conneciton ...

const report = await pc.getStats();
moment.update(report);
moment.report();
//=> {
//    "send": {
//        "video": { ... },
//        "audio": { ... },
//    },
//    "receive": {
//        "video": { ... },
//        "audio": { ... },
//    },
//    "candidatePair": { ... }
//}
```

#### RTCStatsInsight
As one simple use case of RTCStatsMoment I know, is to calculate an momentary value periodically and take some action when a certain threshold is exceeded.
For example, collect occurrences of events to analyze user's network environment information, or give some feedback to the UI to reduce stress caused by call quality felt by users.
RTCStatsInsight is a simple way to do this, and provides an EventEmitter interface as follows:

see [reference](https://skyway-lab.github.io/rtcstats-wrapper/RTCStatsInsight.html)

```javascript
import {
  StatusLevels,
  RTCStatsInsightEvents,
  RTCStatsInsight
} from 'rtcstats-wrapper';

const options = {
  interval: 3000,
  thresholds: {
    "audio-rtt": {
      unstable: 0.1
    },
    "audio-fractionLost": {
      unstable: 0.03,
      critical: 0.08,
    },
  },
  triggerCondition: {
    failCount: 2,
    within: 3
  }
}

const insight = new RTCStatsInsight(sender, options);

insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
  if (event.level === StatusLevels.stable.key) {
    console.log("Now back to stable!");
  }
});

insight.watch()
```

## API Reference
see [GitHub Pages](http://skyway-lab.github.io/rtcstats-wrapper/).

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

## API Reference
wip.

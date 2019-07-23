const Peer = window.Peer;
const RTCStatsInsight = window.RTCStatsWrapper.RTCStatsInsight;
const RTCStatsInsightEvents = window.RTCStatsWrapper.RTCStatsInsightEvents;

(async function main() {
  const localVideo = document.getElementById("js-local-stream");
  const localId = document.getElementById("js-local-id");
  const callTrigger = document.getElementById("js-call-trigger");
  const closeTrigger = document.getElementById("js-close-trigger");
  const remoteVideo = document.getElementById("js-remote-stream");
  const remoteId = document.getElementById("js-remote-id");
  let insight;

  async function handleMediaConnection(mediaConnection) {
    mediaConnection.on("stream", async stream => {
      // Render remote stream for caller
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);

      const pc = mediaConnection.getPeerConnection();
      insight = new RTCStatsInsight(pc);

      for (const eventKey of RTCStatsInsightEvents.enums) {
        insight.on(eventKey, event => {
          console.log(event);
        });
      }

      insight.watch();
    });

    mediaConnection.once("close", () => {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      insight.stop();
    });

    closeTrigger.addEventListener("click", () => mediaConnection.close(true));
  }

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(console.error);

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  const peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3
  });

  // Register caller handler
  callTrigger.addEventListener("click", () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const mediaConnection = peer.call(remoteId.value, localStream);
    handleMediaConnection(mediaConnection);
  });

  peer.once("open", id => (localId.textContent = id));

  // Register callee handler
  peer.on("call", mediaConnection => {
    mediaConnection.answer(localStream);
    handleMediaConnection(mediaConnection);
  });

  peer.on("error", console.error);
})();

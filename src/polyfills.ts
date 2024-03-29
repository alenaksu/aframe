import isIOSOlderThan10 from './utils/isIOSOlderThan10';
import WebVRPolyfill from 'webvr-polyfill';

// WebVR polyfill
// Check before the polyfill runs.
window.hasNativeWebVRImplementation =
  !!window.navigator.getVRDisplays || !!window.navigator.getVRDevices;
window.hasNativeWebXRImplementation = navigator.xr !== undefined;

// If native WebXR or WebVR are defined WebVRPolyfill does not initialize.
if (!window.hasNativeWebXRImplementation && !window.hasNativeWebVRImplementation) {
  // Workaround for iOS Safari canvas sizing issues in stereo (webvr-polyfill/issues/102).
  // Only for iOS on versions older than 10.
  const bufferScale = isIOSOlderThan10(window.navigator.userAgent)
    ? 1 / window.devicePixelRatio
    : 1;
  const polyfillConfig = {
    BUFFER_SCALE: bufferScale,
    CARDBOARD_UI_DISABLED: true,
    ROTATE_INSTRUCTIONS_DISABLED: true,
    MOBILE_WAKE_LOCK: !!window.cordova,
  };
  window.webvrpolyfill = new WebVRPolyfill(polyfillConfig);
}

declare module '*.css';

interface Window {
  hasNativeWebVRImplementation: boolean;
  debug: boolean;
  cordova?: unknown;
  AFRAME_ASYNC?: boolean;
  AFRAME: unknown;
  THREE: unknown;
}

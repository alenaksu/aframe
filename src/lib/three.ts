import * as SUPER_THREE from 'super-three';
import { DRACOLoader } from 'super-three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'super-three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'super-three/examples/jsm/loaders/KTX2Loader.js';
import { OBB } from 'super-three/addons/math/OBB.js';
import { OBJLoader } from 'super-three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'super-three/examples/jsm/loaders/MTLLoader.js';
import * as BufferGeometryUtils from 'super-three/examples/jsm/utils/BufferGeometryUtils.js';
import { LightProbeGenerator } from 'super-three/examples/jsm/lights/LightProbeGenerator.js';

export type * from 'three';

// TODO: Eventually include these only if they are needed by a component.
import '../../vendor/DeviceOrientationControls'; // THREE.DeviceOrientationControls


const THREE: typeof import('three') = {
  ...SUPER_THREE,
  DRACOLoader,
  GLTFLoader,
  KTX2Loader,
  OBB,
  OBJLoader,
  MTLLoader,
  BufferGeometryUtils,
  LightProbeGenerator,
};

// In-memory caching for XHRs (for images, audio files, textures, etc.).
if (THREE.Cache) {
  THREE.Cache.enabled = true;
}

window.THREE = THREE;

export default THREE;

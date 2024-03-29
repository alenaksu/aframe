import { registerComponent } from '../../core/component.js';
import THREE, { Object3D, Vector3, WebGLRenderer } from '../../lib/three.js';

const arrowURL =
  'data:image/webp;base64,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';

const CAM_LAYER = 21;

const applyPose = (() => {
  const tempQuaternion = new THREE.Quaternion();
  const tempVec3 = new THREE.Vector3();
  const applyPose = (pose, object3D, offset) => {
    object3D.position.copy(pose.transform.position);
    object3D.quaternion.copy(pose.transform.orientation);

    tempVec3.copy(offset);
    tempQuaternion.copy(pose.transform.orientation);
    tempVec3.applyQuaternion(tempQuaternion);
    object3D.position.sub(tempVec3);
  };

  applyPose.tempFakePose = {
    transform: {
      orientation: new THREE.Quaternion(),
      position: new THREE.Vector3(),
    },
  };

  return applyPose;
})();

/**
 * Class to handle hit-test from a single source
 *
 * For a normal space provide it as a space option
 * new HitTest(renderer, {
 *   space: viewerSpace
 * });
 *
 * this is also useful for the targetRaySpace of an XRInputSource
 *
 * It can also describe a transient input source like so:
 *
 * const profileToSupport = 'generic-touchscreen';
 * const transientHitTest = new HitTest(renderer, {
 *   profile: profileToSupport
 * });
 *
 * Where the profile matches an item in a type of controller, profiles matching 'generic-touchscreen'
 * will always be a transient input and as of 08/2021 all transient inputs are 'generic-touchscreen'
 *
 */
class HitTest {
  previousFrameAnchors = new Set();
  anchorToObject3D = new Map();
  renderer!: WebGLRenderer;
  xrHitTestSource: any;
  session: XRSession;
  transient = false;
  lastHitTest: any;

  /**
   *
   * @param {WebGLRenderer} renderer THREE.JS Renderer
   * @param {} hitTestSourceDetails The source information either as the information for a transient hit-test or a regular hit-test
   */
  constructor(renderer: WebGLRenderer, hitTestSourceDetails) {
    this.renderer = renderer;
    this.xrHitTestSource = null;

    renderer.xr.addEventListener('sessionend', () => {
      this.xrHitTestSource = null;
    });

    renderer.xr.addEventListener('sessionstart', () => {
      this.sessionStart(hitTestSourceDetails);
    });

    if (renderer.xr.isPresenting) {
      this.sessionStart(hitTestSourceDetails);
    }
  }

  async sessionStart(hitTestSourceDetails) {
    this.session = this.renderer.xr.getSession();
    if (!('requestHitTestSource' in this.session)) {
      warnAboutHitTest({ message: 'No requestHitTestSource on the session.' });
      return;
    }

    try {
      if (hitTestSourceDetails.space) {
        this.xrHitTestSource = await this.session.requestHitTestSource(hitTestSourceDetails);
      } else if (hitTestSourceDetails.profile) {
        this.xrHitTestSource = await this.session.requestHitTestSourceForTransientInput(
          hitTestSourceDetails,
        );
        this.transient = true;
      }
    } catch (e) {
      warnAboutHitTest(e);
    }
  }

  /**
   * Turns the last hit test into an anchor, the provided Object3D will have it's
   * position update to track the anchor.
   *
   * @param {Object3D} object3D object to track
   * @param {Vector3} offset offset of the object from the origin that gets subtracted
   * @returns
   */
  async anchorFromLastHitTestResult(object3D: Object3D, offset: Vector3) {
    const hitTest = this.lastHitTest;

    if (!hitTest) {
      return;
    }

    const object3DOptions = {
      object3D,
      offset,
    };

    for (const entry of this.anchorToObject3D.entries()) {
      const entryObject = entry[1].object3D;
      const anchor = entry[0];
      if (entryObject === object3D) {
        this.anchorToObject3D.delete(anchor);
        anchor.delete();
      }
    }

    if (hitTest.createAnchor) {
      try {
        const anchor = await hitTest.createAnchor();
        this.anchorToObject3D.set(anchor, object3DOptions);
      } catch (e) {
        console.warn(e.message);
        console.warn(
          'Cannot create anchor, are you missing: webxr="optionalFeatures: anchors;" from <a-scene>?',
        );
      }
    }
  }

  doHit(frame) {
    if (!this.renderer.xr.isPresenting) {
      return;
    }

    const refSpace = this.renderer.xr.getReferenceSpace();
    const xrViewerPose = frame.getViewerPose(refSpace);

    if (this.xrHitTestSource && xrViewerPose) {
      if (this.transient) {
        const hitTestResults = frame.getHitTestResultsForTransientInput(this.xrHitTestSource);
        if (hitTestResults.length > 0) {
          const results = hitTestResults[0].results;
          if (results.length > 0) {
            this.lastHitTest = results[0];
            return results[0].getPose(refSpace);
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        const hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
        if (hitTestResults.length > 0) {
          this.lastHitTest = hitTestResults[0];
          return hitTestResults[0].getPose(refSpace);
        } else {
          return false;
        }
      }
    }
  }

  static updateAnchorPoses(frame, refSpace) {
    // If tracked anchors isn't defined because it's not supported then just use the empty set
    const trackedAnchors = frame.trackedAnchors || HitTest.prototype.previousFrameAnchors;

    HitTest.prototype.previousFrameAnchors.forEach(function (anchor) {
      // Handle anchor tracking loss - `anchor` was present
      // in the present frame but is no longer tracked.
      if (!trackedAnchors.has(anchor)) {
        HitTest.prototype.anchorToObject3D.delete(anchor);
      }
    });

    for (const anchor of trackedAnchors) {
      let anchorPose;
      try {
        // Query most recent pose of the anchor relative to some reference space:
        anchorPose = frame.getPose(anchor.anchorSpace, refSpace);
      } catch (e) {
        // This will fail if the anchor has been deleted that frame
      }

      if (anchorPose) {
        const object3DOptions = HitTest.prototype.anchorToObject3D.get(anchor);
        if (!object3DOptions) {
          return;
        }
        const { offset, object3D } = object3DOptions.offset;

        applyPose(anchorPose, object3D, offset);
      }
    }
  }
}

function warnAboutHitTest(e) {
  console.warn(e.message);
  console.warn(
    'Cannot requestHitTestSource Are you missing: webxr="optionalFeatures: hit-test;" from <a-scene>?',
  );
}

const hitTestCache = new Map();
export const Component = registerComponent('ar-hit-test', {
  schema: {
    target: { type: 'selector' },
    enabled: { default: true },
    src: {
      default: arrowURL,
      type: 'map',
    },
    type: {
      default: 'footprint',
      oneOf: ['footprint', 'map'],
    },
    footprintDepth: {
      default: 0.1,
    },
    mapSize: {
      type: 'vec2',
      default: {
        x: 0.5,
        y: 0.5,
      },
    },
  },

  sceneOnly: true,

  init() {
    this.hitTest = null;
    this.imageDataArray = new Uint8ClampedArray(512 * 512 * 4);
    this.imageData = new ImageData(this.imageDataArray, 512, 512);

    this.textureCache = new Map();

    this.orthoCam = new THREE.OrthographicCamera();
    this.orthoCam.layers.set(CAM_LAYER);
    this.textureTarget = new THREE.WebGLRenderTarget(512, 512, {});
    this.basicMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.canvasTexture = new THREE.CanvasTexture(this.canvas, {
      alpha: true,
    });
    this.canvasTexture.flipY = false;

    // Update WebXR to support hit-test and anchors
    const webxrData = this.el.getAttribute('webxr');
    const optionalFeaturesArray = webxrData.optionalFeatures;
    if (!optionalFeaturesArray.includes('hit-test') || !optionalFeaturesArray.includes('anchors')) {
      optionalFeaturesArray.push('hit-test');
      optionalFeaturesArray.push('anchors');
      this.el.setAttribute('webxr', webxrData);
    }

    this.el.sceneEl.renderer.xr.addEventListener(
      'sessionend',
      () => {
        this.hitTest = null;
      },
    );

    this.el.sceneEl.renderer.xr.addEventListener(
      'sessionstart',
       () => {
        // Don't request Hit Test unless AR (breaks WebXR Emulator)
        if (!this.el.is('ar-mode')) {
          return;
        }

        const renderer = this.el.sceneEl.renderer;
        const session = (this.session = renderer.xr.getSession());
        this.hasPosedOnce = false;
        this.bboxMesh.visible = false;

        // Default to selecting through the face
        session.requestReferenceSpace('viewer').then(
          (viewerSpace) => {
            this.hitTest = new HitTest(renderer, {
              space: viewerSpace,
            });

            hitTestCache.set(viewerSpace, this.hitTest);

            this.el.emit('ar-hit-test-start');
          },
        );

        // These are transient inputs so need to be handled separately
        const profileToSupport = 'generic-touchscreen';
        const transientHitTest = new HitTest(renderer, {
          profile: profileToSupport,
        });

        session.addEventListener(
          'selectstart',
          function (e) {
            if (this.data.enabled !== true) {
              return;
            }

            const inputSource = e.inputSource;

            this.bboxMesh.visible = true;

            if (this.hasPosedOnce === true) {
              this.el.emit('ar-hit-test-select-start', {
                inputSource: inputSource,
                position: this.bboxMesh.position,
                orientation: this.bboxMesh.quaternion,
              });

              if (inputSource.profiles[0] === profileToSupport) {
                this.hitTest = transientHitTest;
              } else {
                this.hitTest =
                  hitTestCache.get(inputSource) ||
                  new HitTest(renderer, {
                    space: inputSource.targetRaySpace,
                  });
                hitTestCache.set(inputSource, this.hitTest);
              }
            }
          },
        );

        session.addEventListener(
          'selectend',
           (e) => {
            if (!this.hitTest || this.data.enabled !== true) {
              this.hitTest = null;
              return;
            }

            const inputSource = e.inputSource;

            if (this.hasPosedOnce === true) {
              this.bboxMesh.visible = false;

              // if we have a target with a 3D object then automatically generate an anchor for it.
              if (this.data.target) {
                const object = this.data.target.object3D;

                if (object) {
                  applyPose.tempFakePose.transform.position.copy(this.bboxMesh.position);
                  applyPose.tempFakePose.transform.orientation.copy(this.bboxMesh.quaternion);
                  applyPose(applyPose.tempFakePose, object, this.bboxOffset);
                  object.visible = true;

                  // create an anchor attached to the object
                  this.hitTest.anchorFromLastHitTestResult(object, this.bboxOffset);
                }
              }

              this.el.emit('ar-hit-test-select', {
                inputSource: inputSource,
                position: this.bboxMesh.position,
                orientation: this.bboxMesh.quaternion,
              });
            }

            this.hitTest = null;
          },
        );
      },
    );

    this.bboxOffset = new THREE.Vector3();
    this.update = this.update.bind(this);
    this.makeBBox();
  },

  update() {
    // If it is disabled it's cleaned up
    if (this.data.enabled === false) {
      this.hitTest = null;
      this.bboxMesh.visible = false;
    }
    if (this.data.target) {
      if (this.data.target.object3D) {
        this.data.target.addEventListener('model-loaded', this.update);
        this.data.target.object3D.layers.enable(CAM_LAYER);
        this.data.target.object3D.traverse(function (child) {
          child.layers.enable(CAM_LAYER);
        });
      } else {
        this.data.target.addEventListener('loaded', this.update, { once: true });
      }
    }
    this.bboxNeedsUpdate = true;
  },

  makeBBox() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      color: 0xffffff,
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.rotateY(-Math.PI / 2);
    this.bbox = new THREE.Box3();
    this.bboxMesh = new THREE.Mesh(geometry, material);
    this.el.setObject3D('ar-hit-test', this.bboxMesh);
    this.bboxMesh.visible = false;
  },

  updateFootprint() {
    const renderer = this.el.sceneEl.renderer;
    const isXREnabled = renderer.xr.enabled;

    this.bboxMesh.material.map = this.canvasTexture;
    this.bboxMesh.material.needsUpdate = true;
    this.orthoCam.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
    this.orthoCam.position.copy(this.bboxMesh.position);
    this.orthoCam.position.y -= this.bboxMesh.scale.y / 2;
    this.orthoCam.near = 0.1;
    this.orthoCam.far = this.orthoCam.near + this.data.footprintDepth * this.bboxMesh.scale.y;
    this.orthoCam.position.y += this.orthoCam.far;
    this.orthoCam.right = this.bboxMesh.scale.z / 2;
    this.orthoCam.left = -this.bboxMesh.scale.z / 2;
    this.orthoCam.top = this.bboxMesh.scale.x / 2;
    this.orthoCam.bottom = -this.bboxMesh.scale.x / 2;
    this.orthoCam.updateProjectionMatrix();

    const oldRenderTarget = renderer.getRenderTarget();
    renderer.setRenderTarget(this.textureTarget);
    renderer.xr.enabled = false;

    const oldBackground = this.el.object3D.background;
    this.el.object3D.overrideMaterial = this.basicMaterial;
    this.el.object3D.background = null;
    renderer.render(this.el.object3D, this.orthoCam);
    this.el.object3D.background = oldBackground;
    this.el.object3D.overrideMaterial = null;
    renderer.xr.enabled = isXREnabled;
    renderer.setRenderTarget(oldRenderTarget);
    renderer.readRenderTargetPixels(this.textureTarget, 0, 0, 512, 512, this.imageDataArray);

    this.context.putImageData(this.imageData, 0, 0);
    this.context.shadowColor = 'white';
    this.context.shadowBlur = 10;
    this.context.drawImage(this.canvas, 0, 0);
    const tempImageData = this.context.getImageData(0, 0, 512, 512);
    for (let i = 0; i < 512 * 512; i++) {
      // if it's a little bit transparent but not opaque make it middle transparent
      if (tempImageData.data[i * 4 + 3] !== 0 && tempImageData.data[i * 4 + 3] !== 255) {
        tempImageData.data[i * 4 + 3] = 128;
      }
    }
    this.context.putImageData(tempImageData, 0, 0);
    this.canvasTexture.needsUpdate = true;
  },
  tick() {
    const frame = this.el.sceneEl.frame;
    const renderer = this.el.sceneEl.renderer;

    if (frame) {
      // if we are in XR then update the positions of the objects attached to anchors
      HitTest.updateAnchorPoses(frame, renderer.xr.getReferenceSpace());
    }
    if (this.bboxNeedsUpdate) {
      this.bboxNeedsUpdate = false;

      if (!this.data.target || this.data.type === 'map') {
        let texture;
        if (this.textureCache.has(this.data.src)) {
          texture = this.textureCache.get(this.data.src);
        } else {
          texture = new THREE.TextureLoader().load(this.data.src);
          this.textureCache.set(this.data.src, texture);
        }
        this.bboxMesh.material.map = texture;
        this.bboxMesh.material.needsUpdate = true;
      }

      if (this.data.target && this.data.target.object3D) {
        this.bbox.setFromObject(this.data.target.object3D);
        this.bbox.getCenter(this.bboxMesh.position);
        this.bbox.getSize(this.bboxMesh.scale);

        if (this.data.type === 'footprint') {
          // Add a little buffer for the footprint border
          this.bboxMesh.scale.x *= 1.04;
          this.bboxMesh.scale.z *= 1.04;
          this.updateFootprint();
        }

        this.bboxMesh.position.y -= this.bboxMesh.scale.y / 2;
        this.bboxOffset.copy(this.bboxMesh.position);
        this.bboxOffset.sub(this.data.target.object3D.position);
      } else {
        this.bboxMesh.scale.set(this.data.mapSize.x, 1, this.data.mapSize.y);
      }
    }

    if (this.hitTest) {
      const pose = this.hitTest.doHit(frame);
      if (pose) {
        if (this.hasPosedOnce !== true) {
          this.hasPosedOnce = true;
          this.el.emit('ar-hit-test-achieved');
        }
        this.bboxMesh.visible = true;
        this.bboxMesh.position.copy(pose.transform.position);
        this.bboxMesh.quaternion.copy(pose.transform.orientation);
      }
    }
  },
});

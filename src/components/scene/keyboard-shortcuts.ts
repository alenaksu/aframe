import { registerComponent } from '../../core/component.js';
import { shouldCaptureKeyEvent } from '../../utils/index.js';

export const Component = registerComponent('keyboard-shortcuts', {
  schema: {
    enterVR: { default: true },
    exitVR: { default: true },
  },

  sceneOnly: true,

  init() {
    this.onKeyup = this.onKeyup.bind(this);
  },

  update(oldData) {
    const data = this.data;
    this.enterVREnabled = data.enterVR;
  },

  play() {
    window.addEventListener('keyup', this.onKeyup, false);
  },

  pause() {
    window.removeEventListener('keyup', this.onKeyup);
  },

  onKeyup(evt: KeyboardEvent) {
    const scene = this.el;
    if (!shouldCaptureKeyEvent(evt)) {
      return;
    }
    if (this.enterVREnabled && evt.key === 'f') {
      scene.enterVR();
    }
    if (this.enterVREnabled && evt.key === 'escape') {
      scene.exitVR();
    }
  },
});

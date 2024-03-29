import { registerComponent } from '../../core/component.js';
import THREE from '../../lib/three.js';

export const Component = registerComponent('background', {
  schema: {
    color: { type: 'color', default: 'black' },
    transparent: { default: false },
  },
  sceneOnly: true,
  update() {
    const data = this.data;
    const object3D = this.el.object3D;

    if (data.transparent) {
      object3D.background = null;
    } else {
      object3D.background = new THREE.Color(data.color);
    }
  },

  remove() {
    const object3D = this.el.object3D;
    object3D.background = null;
  },
});

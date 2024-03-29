import { registerComponent } from '../../core/component.js';
import THREE from '../../lib/three.js';
import debug from '../../utils/debug.js';

const warn = debug('components:fog:warn');

/**
 * Fog component.
 * Applies only to the scene entity.
 */
export const Component = registerComponent('fog', {
  schema: {
    color: { type: 'color', default: '#000' },
    density: { default: 0.00025 },
    far: { default: 1000, min: 0 },
    near: { default: 1, min: 0 },
    type: { default: 'linear', oneOf: ['linear', 'exponential'] }
  },

  sceneOnly: true,

  update() {
    const data = this.data;
    const el = this.el;
    const fog = this.el.object3D.fog;

    // (Re)create fog if fog doesn't exist or fog type changed.
    if (!fog || data.type !== fog.name) {
      el.object3D.fog = getFog(data);
      return;
    }

    // Fog data changed. Update fog.
    for (const key of Object.keys(this.schema)) {
      const value = key === 'color' ? new THREE.Color(data[key]) : data[key];

      fog[key] = value;
    }
  },

  /**
   * Remove fog on remove (callback).
   */
  remove() {
    const el = this.el;
    const fog = this.el.object3D.fog;
    if (!fog) { return; }

    el.object3D.fog = null;
  }
});

/**
 * Creates a fog object. Sets fog.name to be able to detect fog type changes.
 *
 * @param {object} data - Fog data.
 * @returns {object} fog
 */
function getFog(data) {
  let fog;
  if (data.type === 'exponential') {
    fog = new THREE.FogExp2(data.color, data.density);
  } else {
    fog = new THREE.Fog(data.color, data.near, data.far);
  }
  fog.name = data.type;
  return fog;
}

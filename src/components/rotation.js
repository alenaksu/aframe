var degToRad = require('../lib/three').MathUtils.degToRad;
var registerComponent = require('../core/component').registerComponent;

export const Component = registerComponent('rotation', {
  schema: {type: 'vec3'},

  /**
   * Updates object3D rotation.
   */
  update() {
    var data = this.data;
    var object3D = this.el.object3D;
    object3D.rotation.set(degToRad(data.x), degToRad(data.y), degToRad(data.z));
    object3D.rotation.order = 'YXZ';
  },

  remove() {
    // Pretty much for mixins.
    this.el.object3D.rotation.set(0, 0, 0);
  }
});

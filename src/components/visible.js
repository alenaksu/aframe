var registerComponent = require('../core/component').registerComponent;

/**
 * Visibility component.
 */
export const Component = registerComponent('visible', {
  schema: {default: true},

  update() {
    this.el.object3D.visible = this.data;
  }
});

var registerComponent = require('../core/component').registerComponent;

registerComponent('grabbable', {
  init() {
    this.el.setAttribute('obb-collider', 'centerModel: true');
  }
});

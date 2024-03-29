import { registerComponent } from '../../core/component.js';
var RStats = require('../../../vendor/rStats');
var utils = require('../../utils');
require('../../../vendor/rStats.extras');
require('../../lib/rStatsAframe');

var AFrameStats = window.aframeStats;
var HIDDEN_CLASS = 'a-hidden';
var ThreeStats = window.threeStats;

/**
 * Stats appended to document.body by RStats.
 */
export const Component = registerComponent('stats', {
  schema: {default: true},

  sceneOnly: true,

  init() {
    var scene = this.el;

    if (utils.getUrlParameter('stats') === 'false') { return; }

    this.stats = createStats(scene);
    this.statsEl = document.querySelector('.rs-base');

    this.hideBound = this.hide.bind(this);
    this.showBound = this.show.bind(this);

    scene.addEventListener('enter-vr', this.hideBound);
    scene.addEventListener('exit-vr', this.showBound);
  },

  update() {
    if (!this.stats) { return; }
    return (!this.data) ? this.hide() : this.show();
  },

  remove() {
    this.el.removeEventListener('enter-vr', this.hideBound);
    this.el.removeEventListener('exit-vr', this.showBound);
    if (!this.statsEl) { return; }  // Scene detached.
    this.statsEl.parentNode.removeChild(this.statsEl);
  },

  tick: function () {
    var stats = this.stats;

    if (!stats) { return; }

    stats('rAF').tick();
    stats('FPS').frame();
    stats().update();
  },

  hide: function () {
    this.statsEl.classList.add(HIDDEN_CLASS);
  },

  show: function () {
    this.statsEl.classList.remove(HIDDEN_CLASS);
  }
});

function createStats (scene) {
  var threeStats = new ThreeStats(scene.renderer);
  var aframeStats = new AFrameStats(scene);
  var plugins = scene.isMobile ? [] : [threeStats, aframeStats];
  return new RStats({
    css: [],  // Our stylesheet is injected from `src/index.js`.
    values: {
      fps: {caption: 'fps', below: 30}
    },
    groups: [
      {caption: 'Framerate', values: ['fps', 'raf']}
    ],
    plugins: plugins
  });
}

import { registerComponent } from '../../core/component.js';

export const Component = registerComponent('debug', {
  schema: { default: true },
  sceneOnly: true
});

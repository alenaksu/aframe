/* global AFRAME */
import { AFRAME_INJECTED } from '../../constants/index.js';
import pkg from '../../../package.json';
import { registerComponent } from '../../core/component.js';
import utils from '../../utils/index.js';

/**
 * 0.4.2 to 0.4.x
 * Will need to update this when A-Frame goes to 1.x.x.
 */
function getFuzzyPatchVersion(version) {
  const split = version.split('.');
  split[2] = 'x';
  return split.join('.');
}

const INSPECTOR_DEV_URL = 'https://aframe.io/aframe-inspector/dist/aframe-inspector.js';
const INSPECTOR_RELEASE_URL =
  'https://unpkg.com/aframe-inspector@' +
  getFuzzyPatchVersion(pkg.version) +
  '/dist/aframe-inspector.min.js';
const INSPECTOR_URL =
  process.env.INSPECTOR_VERSION === 'dev' ? INSPECTOR_DEV_URL : INSPECTOR_RELEASE_URL;
const LOADING_MESSAGE = 'Loading Inspector';
const LOADING_ERROR_MESSAGE = 'Error loading Inspector';

export const Component = registerComponent('inspector', {
  schema: {
    url: { default: INSPECTOR_URL },
  },

  sceneOnly: true,

  init() {
    this.firstPlay = true;
    this.onKeydown = this.onKeydown.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.initOverlay();
    window.addEventListener('keydown', this.onKeydown);
    window.addEventListener('message', this.onMessage);
  },

  play() {
    if (!this.firstPlay) {
      return;
    }
    const urlParam = utils.getUrlParameter('inspector');
    if (urlParam !== 'false' && !!urlParam) {
      this.openInspector();
      this.firstPlay = false;
    }
  },

  initOverlay() {
    const dotsHTML = '<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    this.loadingMessageEl = document.createElement('div');
    this.loadingMessageEl.classList.add('a-inspector-loader');
    this.loadingMessageEl.innerHTML = LOADING_MESSAGE + dotsHTML;
  },

  remove() {
    this.removeEventListeners();
  },

  /**
   * <ctrl> + <alt> + i keyboard shortcut.
   */
  onKeydown(evt: KeyboardEvent) {
    const shortcutPressed =
      evt.key === 'i' && ((evt.ctrlKey && evt.altKey) || evt.getModifierState('AltGraph'));
    if (!shortcutPressed) {
      return;
    }
    this.openInspector();
  },

  showLoader() {
    document.body.appendChild(this.loadingMessageEl);
  },

  hideLoader() {
    document.body.removeChild(this.loadingMessageEl);
  },

  /**
   * postMessage. aframe.io uses this to create a button on examples to open Inspector.
   */
  onMessage(evt: MessageEvent) {
    if (evt.data === 'INJECT_AFRAME_INSPECTOR') {
      this.openInspector();
    }
  },

  openInspector(focusEl) {
    // Already injected. Open.
    if (AFRAME.INSPECTOR || AFRAME.inspectorInjected) {
      AFRAME.INSPECTOR.open(focusEl);
      return;
    }

    this.showLoader();

    // Inject.
    const script = document.createElement('script');
    script.src = this.data.url;
    script.setAttribute('data-name', 'aframe-inspector');
    script.setAttribute(AFRAME_INJECTED, '');
    script.onload = () => {
      AFRAME.INSPECTOR.open(focusEl);
      this.hideLoader();
      this.removeEventListeners();
    };
    script.onerror = () => {
      this.loadingMessageEl.innerHTML = LOADING_ERROR_MESSAGE;
    };
    document.head.appendChild(script);
    AFRAME.inspectorInjected = true;
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('message', this.onMessage);
  },
});

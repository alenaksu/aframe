import { registerComponent } from '../../core/component.js';
import constants from '../../constants/index.js';

const MODAL_CLASS = 'a-modal';
const DIALOG_CLASS = 'a-dialog';
const DIALOG_TEXT_CLASS = 'a-dialog-text';
const DIALOG_TEXT_CONTAINER_CLASS = 'a-dialog-text-container';
const DIALOG_BUTTONS_CONTAINER_CLASS = 'a-dialog-buttons-container';
const DIALOG_BUTTON_CLASS = 'a-dialog-button';
const DIALOG_ALLOW_BUTTON_CLASS = 'a-dialog-allow-button';
const DIALOG_DENY_BUTTON_CLASS = 'a-dialog-deny-button';
const DIALOG_OK_BUTTON_CLASS = 'a-dialog-ok-button';

/**
 * UI for enabling device motion permission
 */
export const Component = registerComponent('device-orientation-permission-ui', {
  schema: {
    enabled: { default: true },
    deviceMotionMessage: {
      default: 'This immersive website requires access to your device motion sensors.',
    },
    httpsMessage: {
      default:
        'Access this site over HTTPS to enter VR mode and grant access to the device sensors.',
    },
    denyButtonText: { default: 'Deny' },
    allowButtonText: { default: 'Allow' },
    cancelButtonText: { default: 'Cancel' },
  },

  sceneOnly: true,

  init() {
    if (!this.data.enabled) {
      return;
    }

    if (!window.isSecureContext) {
      this.showHTTPAlert();
    }

    // Browser doesn't support or doesn't require permission to DeviceOrientationEvent API.
    if (
      typeof DeviceOrientationEvent === 'undefined' ||
      // TODO(alenaksu): remove cast when requestPermission is added to the type definition.
      !(DeviceOrientationEvent as any).requestPermission
    ) {
      this.permissionGranted = true;
      return;
    }

    this.onDeviceMotionDialogAllowClicked = this.onDeviceMotionDialogAllowClicked.bind(this);
    this.onDeviceMotionDialogDenyClicked = this.onDeviceMotionDialogDenyClicked.bind(this);
    // Show dialog only if permission has not yet been granted.
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then(() => {
        this.el.emit('deviceorientationpermissiongranted');
        this.permissionGranted = true;
      })
      .catch(() => {
        this.devicePermissionDialogEl = createPermissionDialog(
          this.data.denyButtonText,
          this.data.allowButtonText,
          this.data.deviceMotionMessage,
          this.onDeviceMotionDialogAllowClicked,
          this.onDeviceMotionDialogDenyClicked,
        );
        this.el.appendChild(this.devicePermissionDialogEl);
      });
  },

  remove() {
    // This removes the modal screen
    if (this.devicePermissionDialogEl) {
      this.el.removeChild(this.devicePermissionDialogEl);
    }
  },

  onDeviceMotionDialogDenyClicked() {
    this.remove();
  },

  showHTTPAlert() {
    const httpAlertEl = createAlertDialog(
      this.data.cancelButtonText,
      this.data.httpsMessage,
      () => {
        this.el.removeChild(httpAlertEl);
      },
    );
    this.el.appendChild(httpAlertEl);
  },

  /**
   * Enable device motion permission when clicked.
   */
  onDeviceMotionDialogAllowClicked() {
    this.el.emit('deviceorientationpermissionrequested');
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((response: PermissionState) => {
        if (response === 'granted') {
          this.el.emit('deviceorientationpermissiongranted');
          this.permissionGranted = true;
        } else {
          this.el.emit('deviceorientationpermissionrejected');
        }
        this.remove();
      })
      .catch(console.error);
  },
});

/**
 * Create a modal dialog that request users permission to access the Device Motion API.
 *
 * @param {function} onAllowClicked - click event handler
 * @param {function} onDenyClicked - click event handler
 *
 * @returns {Element} Wrapper <div>.
 */
function createPermissionDialog(denyText, allowText, dialogText, onAllowClicked, onDenyClicked) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add(DIALOG_BUTTONS_CONTAINER_CLASS);

  // Buttons
  const denyButton = document.createElement('button');
  denyButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_DENY_BUTTON_CLASS);
  denyButton.setAttribute(constants.AFRAME_INJECTED, '');
  denyButton.innerHTML = denyText;
  buttonsContainer.appendChild(denyButton);

  const acceptButton = document.createElement('button');
  acceptButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_ALLOW_BUTTON_CLASS);
  acceptButton.setAttribute(constants.AFRAME_INJECTED, '');
  acceptButton.innerHTML = allowText;
  buttonsContainer.appendChild(acceptButton);

  // Ask for sensor events to be used
  acceptButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onAllowClicked();
  });

  denyButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onDenyClicked();
  });

  return createDialog(dialogText, buttonsContainer);
}

function createAlertDialog(closeText, dialogText, onOkClicked) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add(DIALOG_BUTTONS_CONTAINER_CLASS);

  // Buttons
  const okButton = document.createElement('button');
  okButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_OK_BUTTON_CLASS);
  okButton.setAttribute(constants.AFRAME_INJECTED, '');
  okButton.innerHTML = closeText;
  buttonsContainer.appendChild(okButton);

  // Ask for sensor events to be used
  okButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onOkClicked();
  });

  return createDialog(dialogText, buttonsContainer);
}

function createDialog(text, buttonsContainerEl) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add(MODAL_CLASS);
  modalContainer.setAttribute(constants.AFRAME_INJECTED, '');

  const dialog = document.createElement('div');
  dialog.className = DIALOG_CLASS;
  dialog.setAttribute(constants.AFRAME_INJECTED, '');
  modalContainer.appendChild(dialog);

  const dialogTextContainer = document.createElement('div');
  dialogTextContainer.classList.add(DIALOG_TEXT_CONTAINER_CLASS);
  dialog.appendChild(dialogTextContainer);

  const dialogText = document.createElement('div');
  dialogText.classList.add(DIALOG_TEXT_CLASS);
  dialogText.innerHTML = text;
  dialogTextContainer.appendChild(dialogText);

  dialog.appendChild(buttonsContainerEl);

  return modalContainer;
}

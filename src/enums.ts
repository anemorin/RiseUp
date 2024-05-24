import arroy from './assets/ic_arroy.svg';
import plus from './assets/ic_plus.svg';
import trashbin from './assets/ic_delete.svg';
import close from './assets/ic_close.svg';
import closeEye from './assets/ic_eye_off.svg';
import openEye from './assets/ic_eye_on.svg';
import edit from './assets/ic_edit.svg';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#D9D9D9',
};

export const icons = {
  arroy,
  plus,
  trashbin,
  close,
  closeEye,
  openEye,
  edit,
};

export enum Status {
  Error,
  Success,
  Fetching,
  Initial,
}

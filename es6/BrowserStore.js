/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/19.
 */

import {Store} from 'airloy/es6';

let storage = window.localStorage || window.sessionStorage;

export default class BrowserStore extends Store {

  getItem(key) {
    return storage.getItem(key);
  }

  setItem(key, value) {
    storage.setItem(key, value);
  }

  removeItem(key) {
    storage.removeItem(key);
  }
}

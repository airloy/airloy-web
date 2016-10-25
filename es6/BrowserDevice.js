/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */
import {Device} from 'airloy';

export default class BrowserDevice extends Device {

  constructor(args) {
    super(args);
    this.init(args.airloy);
  }

  async init(airloy) {
    let id = await airloy.store.getItem('airloy.device.id');
    if (id) {
      this._identifier = id;
    } else {
      id = window.navigator.userAgent + '^' + this.createGuid();
      this._identifier = id;
      airloy.store.setItem('airloy.device.id', id);
    }
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getIdentifier() {
    return this._identifier;
  }
}

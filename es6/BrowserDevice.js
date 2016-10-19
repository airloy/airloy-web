/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */
import {Device} from 'airloy';
import Fingerprint2 from 'fingerprintjs2';

export default class BrowserDevice extends Device {

  constructor(args) {
    super(args);
    this._identifier = '';
    let that = this;
    new Fingerprint2().get(function(result, components) {
      components.forEach(component => {
        if(component.key === 'user_agent') {
          that._identifier = component.value + '^'
        }
      });
      that._identifier += result;
    });
  }

  getIdentifier() {
    return this._identifier;
  }
}

/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/19.
 */

import BrowserDevice from './BrowserDevice';
import BrowserEvent from './BrowserEvent';
import BrowserStore from './BrowserStore';

let plugin = {
  install(airloy) {
    airloy.store = new BrowserStore();
    airloy.device = new BrowserDevice({airloy});
    airloy.event = new BrowserEvent();
  }
};

export default plugin;

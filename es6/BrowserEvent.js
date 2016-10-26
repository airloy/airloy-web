/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/19.
 */

import {Event} from 'airloy/es6';

if (typeof window.CustomEvent !== "function") {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}

export default class BrowserEvent extends Event {

  constructor() {
    super();
    this._events = [];
  }

  on(event, handler) {
    this._events[event] = this._events[event] || [];
    let listener = (e) => {
      handler(...e.detail);
    };
    this._events[event].push(listener);
    document.body.addEventListener(event, listener, false);
  }

  once(event, handler) {
    this._off(event);
    let listener = (e) => {
      handler(...e.detail);
      this._off(event);
    };
    this._events[event] = [listener];
    document.body.addEventListener(event, listener, false);
  }

  _off(event) {
    if ( this._events[event] ) {
      this._events[event].forEach(old => {
        document.body.removeEventListener(event, old, false);
      });
      this._events[event] = null;
    }
  }

  emit(event, ...data) {
    var myEvent = new CustomEvent(event, {detail: data});
    document.body.dispatchEvent(myEvent);
  }

}

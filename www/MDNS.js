var exec = require('cordova/exec');

var merge = function(source, target, force){
    force = force || false;
    Object.getOwnPropertyNames(source).forEach(function(attr) {

      // If the attribute already exists,
      // it will not be recreated, unless force is true.
      if (target.hasOwnProperty(attr)){
        if (force)
          delete target[attr];
      }

      if (!target.hasOwnProperty(attr))
        Object.defineProperty(target, attr, Object.getOwnPropertyDescriptor(source, attr));

    });
    return target;
  };


var MDNS = function(){
  var me = this;
  exec(function(result) {
    alert('BLUNT FORCE TEST: '+result);
    me.emit('evt',result);
  }, function(e){
    me.emit('error',e);
  }, "MDNS", "monitor", []);
};

// Add event emitter capabilities to MDNS
merge(MDNS,EventEmitter.prototype);

module.exports = MDNS;

//  Object.defineProperty(this,{
//    events: {
//      enumerable: false,
//      writable: true,
//      configurable: false,
//      value: {}
//    },
//    listen: {
//      enumerable: true,
//      get: function(){
//        var me = this;
//        return exec(function(result) {
//          alert('BLUNT FORCE TEST: '+result);
//          me.emit('evt',result);
//        }, this.fail, "MDNS", "monitor", [type]);
//      }
//    },
//    fail: {
//      enumerable: false,
//      writable: false,
//      configurable: false,
//      value: function(e){
//        throw new Error(e);
//      }
//    },
//    on: function(evt,fn){
//      this.events[evt] = this.events[evt] || [];
//      this.events[evt]
//    }
//  });
//
//  this.listen();

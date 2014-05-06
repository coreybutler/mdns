 var exec = require('cordova/exec');

module.exports = function(){

  alert(Object.keys(EventEmitter));

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
};

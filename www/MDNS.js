var exec = require('cordova/exec');

var MDNS = function(type){

  Object.defineProperties(this,{
//    handlers:{
//      enumerable: false,
//      writable: true,
//      configurable: true,
//      value: {}
//    },
//    oncehandlers:{
//      enumerable: false,
//      writable: true,
//      configurable: true,
//      value: {}
//    },
    on: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(eventName,fn){
//        this.handlers[eventName] this.handlers[eventName] || [];
//        this.handlers[eventName].push(fn);
      }
    },
//    once: {
//      enumerable: true,
//      writable: false,
//      configurable: false,
//      value: function(eventName,fn){
//        this.oncehandlers[eventName] this.oncehandlers[eventName] || [];
//        this.oncehandlers[eventName].push(fn);
//      }
//    },
    handleEvent: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function(data){
//        (this.handlers[data.action]||[]).forEach(function(handler){
//          handler.apply(me,[data]);
//        });
//        (this.oncehandlers[data.action]||[]).forEach(function(handler){
//          handler.apply(me,[data]);
//        });
//        this.oncehandlers.hasOwnProperty(data.action) && delete this.oncehandlers[data.action];
        alert('handleEvent');
      }
    },
    listen: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(type){
        var me = this;
        return exec(function(result) {
          var data = typeof result === 'object' ? result : {
            action: 'unknown',
          };

          if (type){
            me.handleEvent(data);
            return;
          }
          me.handleEvent(data);
        }, function(e){
          throw e;
        }, "MDNS", "monitor", []);
      }
    }
  });

  this.listen(type);
};

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

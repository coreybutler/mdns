var exec = require('cordova/exec');

var MDNS = function(_type){

  Object.defineProperties(this,{
    handlers:{
      enumerable: false,
      writable: true,
      configurable: true,
      value: {}
    },
    oncehandlers:{
      enumerable: false,
      writable: true,
      configurable: true,
      value: {}
    },
    on: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(eventName,fn){
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push(fn);
      }
    },
    once: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(eventName,fn){
        this.oncehandlers[eventName] = this.oncehandlers[eventName] || [];
        this.oncehandlers[eventName].push(fn);
      }
    },
    handleEvent: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function(data){
        (this.handlers[data.action]||[]).forEach(function(handler){
          alert(data);
          handler.apply(me,[data]);
        });
        (this.oncehandlers[data.action]||[]).forEach(function(handler){
          handler.apply(me,[data]);
        });
        this.oncehandlers.hasOwnProperty(data.action) && delete this.oncehandlers[data.action];
      }
    },
    listen: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(type){
        type = type || null;
        var me = this;

        return exec(function(result) {
          var data = typeof result === 'object' ? result : {
            action: 'unknown',
          };
          if (type !== null){
            data.action === type && me.handleEvent(data);
            return;
          } else {
            me.handleEvent(data);
          }
        }, function(e){
          throw e;
        }, "MDNS", "monitor", []);
      }
    }
  });

  this.listen(_type);
};

module.exports = MDNS;

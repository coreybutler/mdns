var MDNS = {
  test: function(callback){
    alert('Running cordova exec');
    cordova.exec(
        callback, // success callback function
        callback, // error callback function
        'MDNS', // mapped to our native Java class called "Calendar"
        "testAction",
        ["firstArgument", "secondArgument", 42, false]
    );
  }
}
module.exports = MDNS;

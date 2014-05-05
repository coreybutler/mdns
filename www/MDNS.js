/**
 * MDNS plugin for Cordova/Phonegap
 *
 * Modified from:
 * Copyright (c) 2013 Vlad Stirbu <vlad.stirbu@ieee.org> Converted to Cordova 3.0 format
 * MIT license
 *
 * @author Matt Kane
 * Copyright (c) Triggertrap Ltd. 2012. All Rights Reserved.
 * Available under the terms of the MIT License.
 *
 */

/*global module, console, require*/
/*jshint -W097 */
'use strict';
var exec = require('cordova/exec');

var MDNS = {
  watch: function (type, callback) {
    return exec(function (result) {
      callback && callback(result);
    }, MDNS.fail, "MDNS", "watch", [type]);
  },
  unwatch: function (type) {
    return exec(null, MDNS.fail, "MDNS", "unwatch", [type]);
  },
  close: function () {
    return exec(null, MDNS.fail, "MDNS", "close", []);
  },
  register: function (type, name, port, text) {
    if (!type) {
      console.error("'type' is a required field");
      return;
    }
    return exec(null, MDNS.fail, "MDNS", "register", [type, name, port, text]);
  },
  unregister: function () {
    return exec(null, MDNS.fail, "MDNS", "unregister", []);
  },
  fail: function (o) {
    console.error("Error " + JSON.stringify(o));
  }
};

module.exports = MDNS;

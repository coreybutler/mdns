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
  test: function (type, callback) {
    return exec(function (result) {
      callback && callback(result);
    }, MDNS.fail, "MDNS", "whatever", [type]);
  },
  fail: function (o) {
    console.error("Error " + JSON.stringify(o));
  }
};

module.exports = MDNS;

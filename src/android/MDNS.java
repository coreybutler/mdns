package com.ecor.ngn;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

import android.net.nsd.NsdManager.DiscoveryListener;

public class MDNS extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
    callbackContext.success("test");
    return true;
  }
}

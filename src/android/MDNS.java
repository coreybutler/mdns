package com.ecor.ngn;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.net.nsd.NsdManager;
import android.content.Context;

public class MDNS extends CordovaPlugin {

  public static final String TAG = "MDNS";

  NsdManager mNsdManager;
    NsdManager.ResolveListener mResolveListener;
    NsdManager.DiscoveryListener mDiscoveryListener;
    NsdManager.RegistrationListener mRegistrationListener;
    Context mContext;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {

    Log.d(TAG,"Initializing");

    // Setup webview
    super.initialize(cordova, webView);

    mContext = webView.getContext();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {

    // Handle commands
    if (action.equals("monitor")){
      callbackContext.success("monitor");
    } else {
      callbackContext.error("Invalid Action: "+action);
    }

    return true;
  }
}

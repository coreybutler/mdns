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
import android.net.nsd.NsdServiceInfo;
import android.content.Context;

public class MDNS extends CordovaPlugin {

  public static final String TAG = "MDNS";

  NsdManager mNsdManager;
  NsdManager.ResolveListener mResolveListener;
  NsdManager.DiscoveryListener mDiscoveryListener;
  NsdManager.RegistrationListener mRegistrationListener;
  Context mContext;
  NsdServiceInfo mService;

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
      Log.d(TAG,"Monitoring started");
      initializeDiscoveryListener(callbackContext);
    } else {
      callbackContext.error("Invalid Action: "+action);
    }

    return true;
  }

  public void initializeDiscoveryListener(CallbackContext callback) {
    final CallbackContext cb = callback;
    mDiscoveryListener = new NsdManager.DiscoveryListener() {

      @Override
      public void onDiscoveryStarted(String regType) {
        Log.d(TAG, "Service discovery started");
      }

      @Override
      public void onServiceFound(NsdServiceInfo service) {
        JSONObject json = new JSONObject();
        try {
          json.put("type",service.getServiceType());
          json.put("host", service.getHost());
          json.put("name", service.getServiceName());
          json.put("port", service.getPort());

          Log.d(TAG, "Service Discovered: " + service);

          cb.success(json);
        } catch (JSONException e) {
          e.printStackTrace();
          cb.error();
        }
      }

      @Override
      public void onServiceLost(NsdServiceInfo service) {
        Log.e(TAG, "service lost" + service);
        if (mService == service) {
            mService = null;
        }
      }

      @Override
      public void onDiscoveryStopped(String serviceType) {
        Log.i(TAG, "Discovery stopped: " + serviceType);
      }

      @Override
      public void onStartDiscoveryFailed(String serviceType, int errorCode) {
        Log.e(TAG, "Discovery failed: Error code:" + errorCode);
        mNsdManager.stopServiceDiscovery(this);
      }

      @Override
      public void onStopDiscoveryFailed(String serviceType, int errorCode) {
        Log.e(TAG, "Discovery failed: Error code:" + errorCode);
        mNsdManager.stopServiceDiscovery(this);
      }
    };
  }
}

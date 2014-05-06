package com.ecor.ngn;

import java.net.InetAddress;

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
import android.net.wifi.WifiManager;
import android.net.DhcpInfo;

public class MDNS extends CordovaPlugin {

  public static final String TAG = "MDNS";

  NsdManager mNsdManager;
  NsdManager.ResolveListener mResolveListener;
  NsdManager.DiscoveryListener mDiscoveryListener;
  NsdManager.RegistrationListener mRegistrationListener;
  Context mContext;

  InetAddress getBroadcastAddress() throws Exception {
    WifiManager wifi = (WifiManager) mContext.getSystemService(Context.WIFI_SERVICE);
    DhcpInfo dhcp = wifi.getDhcpInfo();
    // handle null somehow

    int broadcast = (dhcp.ipAddress & dhcp.netmask) | ~dhcp.netmask;
    byte[] quads = new byte[4];
    for (int k = 0; k < 4; k++)
      quads[k] = (byte) ((broadcast >> k * 8) & 0xFF);
    InetAddress addr = InetAddress.getByAddress(quads);

    Log.d(TAG, "Got broadcast addr:" + addr);
    return addr;
  }

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
      callbackContext.success(action);
    } else {
      callbackContext.error("Invalid Action: "+action);
    }

    return true;
  }

//  public void initializeDiscoveryListener() {
//      mDiscoveryListener = new NsdManager.DiscoveryListener() {
//
//          @Override
//          public void onDiscoveryStarted(String regType) {
//              Log.d(TAG, "Service discovery started");
//          }
//
//          @Override
//          public void onServiceFound(NsdServiceInfo service) {
//              Log.d(TAG, "Service discovery success" + service);
//
//          }
//
//          @Override
//          public void onServiceLost(NsdServiceInfo service) {
//              Log.e(TAG, "service lost" + service);
//              if (mService == service) {
//                  mService = null;
//              }
//          }
//
//          @Override
//          public void onDiscoveryStopped(String serviceType) {
//              Log.i(TAG, "Discovery stopped: " + serviceType);
//          }
//
//          @Override
//          public void onStartDiscoveryFailed(String serviceType, int errorCode) {
//              Log.e(TAG, "Discovery failed: Error code:" + errorCode);
//              mNsdManager.stopServiceDiscovery(this);
//          }
//
//          @Override
//          public void onStopDiscoveryFailed(String serviceType, int errorCode) {
//              Log.e(TAG, "Discovery failed: Error code:" + errorCode);
//              mNsdManager.stopServiceDiscovery(this);
//          }
//      };
//  }
}

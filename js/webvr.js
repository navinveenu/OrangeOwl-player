(function(global) {
  'use strict';

  var webVR = {
    initWebVR: function() {
      if (navigator.getVRDevices) {
        navigator.getVRDevices().then(webVR.vrDeviceCallback);
        return 1;
      }
      else {
        return 0;
      }
    },
    vrDeviceCallback: function(vrdevs) {
      for (var i = 0; i < vrdevs.length; ++i) {
        if (vrdevs[i] instanceof HMDVRDevice) {
          vrHMD = vrdevs[i];
          break;
        }
      }
      if (!vrHMD)
        return 0;
      // Then, find that HMD's position sensor
      for (i = 0; i < vrdevs.length; ++i) {
        if (vrdevs[i] instanceof PositionSensorVRDevice &&
            vrdevs[i].hardwareUnitId == vrHMD.hardwareUnitId)
        {
          vrSensor = vrdevs[i];
          break;
        }
      }
      if (!vrSensor) {
        alert("Found an HMD, but didn't find its orientation sensor?");
      }
    }
  };
  global.webVR = webVR;
})(window);

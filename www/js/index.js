document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    await window.stepper.disableBatteryOptimizations();
    await initBackgroundFetch();
}

async function initBackgroundFetch() {
    console.log("[BackgroundFetch] Init");
    const status = await window.BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        requiredNetworkType: window.BackgroundFetch.NETWORK_TYPE_ANY,
      },
      async (taskId) => {
        console.log("[BackgroundFetch] Starting", taskId);
        console.log("[BackgroundFetch] Completing", taskId);
        window.BackgroundFetch.finish(taskId);
      },
      async (taskId) => {
        console.error("[BackgroundFetch] TIMEOUT: ", taskId);
        window.BackgroundFetch.finish(taskId);
      }
    );
    if (status === window.BackgroundFetch.STATUS_DENIED) {
      console.error("[BackgroundFetch] DENIED", status);
    } else {
      console.log("[BackgroundFetch] STARTS: ", status);
    }
  }
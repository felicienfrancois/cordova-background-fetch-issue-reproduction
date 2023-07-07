# cordova-background-fetch-issue-reproduction

Requires an android device in debug mode

1. Run app
```
cordova run android
```

2. Accept pedometer permissions to start pedometer background task

3. Watch for logs
```
adb logcat -s TSBackgroundFetch
```

4. Kill app

5. Trigger background fetch
```
adb shell cmd jobscheduler run -f com.example.hello 999
```
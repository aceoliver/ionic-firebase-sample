# Ionic + Firebase Sample App

## To Setup
```
npm install
bower install
```

## To Run

### Browser
```
npm install grunt-cli -g
grunt serve
```

### On an Android Device

Make sure an Android device or emulator is connected or running.

```
npm install ionic cordova -g
mkdir www # if it does not exist yet
mkdir plugins # if it does not exist yet
cordova platform add android
grunt build
grunt run
```
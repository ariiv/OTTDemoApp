# 🎬 Expo TV Streaming App

A React Native app built with [Expo](https://expo.dev/) that showcases a simple React Native streaming app, designed for **Android TV**.  
It features a home screen, details screen, video player, and a few sample unit + integration tests with Jest.
The app was created under a limited timeframe, so some known limitations and TODOs remain.

## Setup

1. Clone the repo
git clone https://github.com/ariiv/OTTDemoApp.git

2. Install dependencies 
npm install

3. Start an Android TV emulator in Android Studio
Open Android Studio → Device Manager → Create Device → TV → Android TV (720p or 1080p).
Start the emulator

4. Run the app
npx expo start --android

## Libraries used

### Core framework
react-native: Base UI framework.
expo: Provides the managed workflow with prebuilt native modules.
expo-router: File-based routing system (used for navigation).

### Styling and media
expo-linear-gradient: For gradient overlays on hero/banner images.
@expo/vector-icons: Used Ionicons in player and in details.
expo-av: Used for video playback.

### Tests
jest: Test runner.

## How to run tests
Run tests with 'npm test'.

Currently:
* 3 unit tests and 1 integration test are included.
* Tests do not run successfully due to a React Native import error.
* Based on community discussions, this appears to be a React Native + Jest config issue. In the given timeframe, I couldn't find solution to this problem.
* Resolving it remains as TODO.

## Known limitations and TODOs
In the given timeframe functioning app was created, but it has its' known limitations:
* Tests fail to run due to React Native import issue.
* Styling and functionality is basic

Future TODOs:
* Fix Jest + React Native import issue.
* Improve app styling and enhance functionality.
* Clean code
